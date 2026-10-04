import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const panel = document.querySelector(".hero-art");
const host = document.getElementById("vehicle-viewer");
const status = document.querySelector(".vehicle-status");
const reset = document.getElementById("vehicle-reset");
const guidance = document.querySelector(".vehicle-guidance");
let renderer,
  controls,
  model,
  initialDistance,
  contextLost = false;
let inView = true;
let running = false,
  frame = 0,
  width = 0,
  height = 0;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 100);
const center = new THREE.Vector3();
const start = new THREE.Spherical(
  1,
  THREE.MathUtils.degToRad(67),
  THREE.MathUtils.degToRad(139),
);

function fallback(message, graphicsUnavailable = false) {
  guidance.hidden = !graphicsUnavailable;
  panel.dataset.vehicleState = "fallback";
  status.hidden = false;
  status.textContent = message;
  reset.disabled = true;
  document.getElementById("vehicle-help").textContent =
    "Static preview · 3D unavailable";
}
function resetView() {
  camera.position.setFromSpherical(
    new THREE.Spherical(initialDistance, start.phi, start.theta),
  );
  controls.target.copy(center);
  camera.lookAt(center);
  controls.update();
}
function resize() {
  const bounds = host.getBoundingClientRect();
  width = Math.round(bounds.width);
  height = Math.round(bounds.height);
  if (!width || !height) return;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  if (model) {
    const size = new THREE.Box3()
      .setFromObject(model)
      .getSize(new THREE.Vector3());
    const radius = size.length() / 2;
    const vertical = THREE.MathUtils.degToRad(camera.fov / 2);
    const angle = Math.min(
      vertical,
      Math.atan(Math.tan(vertical) * camera.aspect),
    );
    initialDistance = (radius / Math.sin(angle)) * 1.05;
    controls.minDistance = initialDistance * 0.85;
    controls.maxDistance = initialDistance * 1.5;
    camera.near = Math.max(radius / 100, 0.001);
    camera.far = initialDistance * 10;
    camera.updateProjectionMatrix();
    resetView();
  }
}
function containsCarPixels() {
  // Inspect the actual framebuffer immediately after drawing; no capture/reveal race.
  const gl = renderer.getContext();
  const w = renderer.domElement.width,
    h = renderer.domElement.height;
  const pixel = new Uint8Array(4);
  for (let y = 1; y < 16; y++) {
    for (let x = 1; x < 16; x++) {
      gl.readPixels(
        Math.floor((w * x) / 16),
        Math.floor((h * y) / 16),
        1,
        1,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        pixel,
      );
      if (pixel[3] > 32) return true;
    }
  }
  return false;
}
function draw() {
  frame = 0;
  if (!running || !inView || document.hidden || contextLost || !model) return;
  try {
    controls.update();
    renderer.render(scene, camera);
    if (panel.dataset.vehicleState !== "ready") {
      if (!containsCarPixels()) {
        fallback("3D unavailable — showing the vehicle render.");
        running = false;
        return;
      }
      panel.dataset.vehicleState = "ready";
      status.hidden = false;
      status.textContent = "Interactive 3D";
      guidance.hidden = true;
      document.getElementById("vehicle-help").textContent =
        "Drag to rotate · Scroll to zoom";
      reset.disabled = false;
    }
  } catch {
    fallback("3D unavailable — showing the vehicle render.");
    running = false;
    return;
  }
  frame = requestAnimationFrame(draw);
}
function resume() {
  if (running && inView && !frame && !document.hidden && !contextLost)
    frame = requestAnimationFrame(draw);
}
try {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const canvas = renderer.domElement;
  canvas.tabIndex = 0;
  canvas.setAttribute("role", "img");
  canvas.setAttribute(
    "aria-label",
    "Interactive vehicle assembly. Drag or use arrow keys to rotate. Scroll, pinch, or use plus and minus to zoom. Home resets the view.",
  );
  canvas.setAttribute("aria-describedby", "vehicle-help");
  host.append(canvas);
  controls = new OrbitControls(camera, canvas);
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.minPolarAngle = THREE.MathUtils.degToRad(5);
  controls.maxPolarAngle = THREE.MathUtils.degToRad(175);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x75644d, 2.2));
  for (const [x, y, z, intensity] of [
    [-3, 4, 6, 3],
    [4, 2, -3, 1.8],
  ]) {
    const light = new THREE.DirectionalLight(0xffffff, intensity);
    light.position.set(x, y, z);
    scene.add(light);
  }
  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    contextLost = true;
    cancelAnimationFrame(frame);
    frame = 0;
    fallback("3D paused — showing the vehicle render.");
  });
  canvas.addEventListener("webglcontextrestored", () => {
    contextLost = false;
    panel.dataset.vehicleState = "loading";
    running = !!model;
    resize();
    resume();
  });
  canvas.addEventListener("keydown", (event) => {
    if (!model) return;
    const keys = [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "+",
      "=",
      "-",
      "Home",
    ];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") {
      resetView();
      return;
    }
    const spherical = new THREE.Spherical().setFromVector3(camera.position);
    if (event.key === "ArrowLeft") spherical.theta += 0.12;
    if (event.key === "ArrowRight") spherical.theta -= 0.12;
    if (event.key === "ArrowUp") spherical.phi -= 0.12;
    if (event.key === "ArrowDown") spherical.phi += 0.12;
    if (event.key === "+" || event.key === "=") spherical.radius *= 0.9;
    if (event.key === "-") spherical.radius *= 1.1;
    spherical.phi = THREE.MathUtils.clamp(
      spherical.phi,
      controls.minPolarAngle,
      controls.maxPolarAngle,
    );
    spherical.radius = THREE.MathUtils.clamp(
      spherical.radius,
      controls.minDistance,
      controls.maxDistance,
    );
    camera.position.setFromSpherical(spherical);
    controls.update();
  });
  reset.addEventListener("click", resetView);
  new ResizeObserver(resize).observe(host);
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (!inView) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else resume();
  }).observe(host);
  document.addEventListener("visibilitychange", resume);
  new GLTFLoader().load(
    new URL("../assets/vehicle.glb?v=3", import.meta.url).href,
    (gltf) => {
      model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      model.position.sub(box.getCenter(new THREE.Vector3()));
      scene.add(model);
      resize();
      running = true;
      resume();
    },
    undefined,
    () => fallback("3D could not load — showing the vehicle render."),
  );
} catch (error) {
  const graphicsUnavailable = /WebGL|context/i.test(error.message);
  fallback(
    "3D unavailable — showing the vehicle preview.",
    graphicsUnavailable,
  );
}
