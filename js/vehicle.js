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
  function ready() {
    if (failed) return;
    const fittedRadius = viewer.getCameraOrbit().radius;
    if (!Number.isFinite(fittedRadius) || fittedRadius <= 0) {
      showFallback("3D unavailable — showing the vehicle render.");
      return;
    }
    viewer.minCameraOrbit = `auto 5deg ${fittedRadius * 0.85}m`;
    viewer.maxCameraOrbit = `auto 175deg ${fittedRadius * 1.5}m`;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (failed) return;
        panel.dataset.vehicleState = "ready";
        status.hidden = true;
        reset.disabled = false;
      }),
    );
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
