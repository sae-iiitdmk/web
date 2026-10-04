(() => {
  const viewer = document.getElementById("vehicle-viewer");
  const reset = document.getElementById("vehicle-reset");
  const status = document.querySelector(".vehicle-status");
  viewer.addEventListener("load", () => {
    status.hidden = true;
    reset.disabled = false;
  });
  viewer.addEventListener("error", () => {
    status.textContent = "3D unavailable — showing the vehicle render.";
  });
  reset.addEventListener("click", () => {
    viewer.cameraOrbit = "139deg 67deg 105%";
    viewer.cameraTarget = "auto auto auto";
    viewer.fieldOfView = "35deg";
    viewer.jumpCameraToGoal();
  });
})();
