(() => {
  const viewer = document.getElementById("vehicle-viewer");
  const panel = viewer.closest(".hero-art");
  const reset = document.getElementById("vehicle-reset");
  const status = document.querySelector(".vehicle-status");
  let failed = false;
  function showFallback(message) {
    failed = true;
    panel.dataset.vehicleState = "fallback";
    status.hidden = false;
    status.textContent = message;
    reset.disabled = true;
  }
  let checking = false;
  async function hasRenderedCar() {
    const blob = await viewer.toBlob({ mimeType: "image/png" });
    const bitmap = await createImageBitmap(blob);
    const sample = document.createElement("canvas");
    sample.width = sample.height = 48;
    const context = sample.getContext("2d", { willReadFrequently: true });
    context.drawImage(bitmap, 0, 0, 48, 48);
    bitmap.close();
    const pixels = context.getImageData(0, 0, 48, 48).data;
    let visible = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] > 32) visible++;
    }
    return visible > 12;
  }
  async function ready() {
    if (failed || checking) return;
    checking = true;
    const fittedRadius = viewer.getCameraOrbit().radius;
    if (!Number.isFinite(fittedRadius) || fittedRadius <= 0) {
      showFallback("3D unavailable — showing the vehicle render.");
      return;
    }
    viewer.minCameraOrbit = `auto 5deg ${fittedRadius * 0.85}m`;
    viewer.maxCameraOrbit = `auto 175deg ${fittedRadius * 1.5}m`;
    // A load event alone does not prove that this browser drew the model.
    // Keep the independent image until the canvas contains actual pixels.
    for (let attempt = 0; attempt < 20 && !failed; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 250));
      try {
        if (!(await hasRenderedCar())) continue;
        if (failed) return;
        panel.dataset.vehicleState = "ready";
        status.hidden = true;
        reset.disabled = false;
        return;
      } catch {
        // A GPU or capture failure must leave the independent image visible.
      }
    }
    if (!failed)
      showFallback("3D could not render — showing the vehicle image.");
  }
  viewer.addEventListener("load", ready);
  viewer.addEventListener("error", () => {
    showFallback("3D unavailable — showing the vehicle render.");
  });
  // A cached model may finish before this script attaches its load listener.
  if (viewer.loaded) ready();
  // Keep the image usable even if the component module cannot initialize.
  setTimeout(() => {
    if (panel.dataset.vehicleState === "loading") {
      status.textContent = "Vehicle render · 3D is still loading";
    }
  }, 15000);
  reset.addEventListener("click", () => {
    viewer.cameraOrbit = "139deg 67deg 105%";
    viewer.cameraTarget = "auto auto auto";
    viewer.fieldOfView = "35deg";
    viewer.jumpCameraToGoal();
  });
})();
