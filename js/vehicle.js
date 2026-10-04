(() => {
  const viewer = document.getElementById("vehicle-viewer");
  const reset = document.getElementById("vehicle-reset");
  const status = document.querySelector(".vehicle-status");
  viewer.addEventListener("load", () => {
    const fittedRadius = viewer.getCameraOrbit().radius;
    viewer.minCameraOrbit = `auto 5deg ${fittedRadius * 0.85}m`;
    viewer.maxCameraOrbit = `auto 175deg ${fittedRadius * 1.5}m`;
    status.hidden = true;
    reset.disabled = false;
  });
  viewer.addEventListener("error", () => {
    status.hidden = false;
    status.textContent = "3D unavailable — showing the vehicle render.";
    reset.disabled = true;
    viewer.showPoster?.();
  });
  reset.addEventListener("click", () => {
    viewer.cameraOrbit = "139deg 67deg 105%";
    viewer.cameraTarget = "auto auto auto";
    viewer.fieldOfView = "35deg";
    viewer.jumpCameraToGoal();
  });
})();
