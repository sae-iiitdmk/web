(() => {
  const root = document.documentElement;
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.getElementById("mobile-nav");
  const themeButton = document.querySelector(".theme-toggle");
  const preferredDark = window.matchMedia("(prefers-color-scheme: dark)");
  let savedTheme;
  try {
    savedTheme = localStorage.getItem("sae-theme");
  } catch {
    /* Storage can be unavailable. */
  }
  function applyTheme(theme) {
    root.dataset.theme = theme;
    themeButton.setAttribute("aria-pressed", String(theme === "dark"));
    themeButton.setAttribute(
      "aria-label",
      `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
    );
    themeButton.querySelector("img").src =
      `assets/icons/${theme === "dark" ? "sun" : "moon"}.svg`;
    document.querySelector('meta[name="theme-color"]').content =
      theme === "dark" ? "#121212" : "#f5efe1";
  }
  applyTheme(savedTheme || (preferredDark.matches ? "dark" : "light"));
  themeButton.addEventListener("click", () => {
    savedTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(savedTheme);
    try {
      localStorage.setItem("sae-theme", savedTheme);
    } catch {
      /* Keep this session's theme. */
    }
  });
  preferredDark.addEventListener("change", (event) => {
    if (!savedTheme) applyTheme(event.matches ? "dark" : "light");
  });
  function closeMenu() {
    menu.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.querySelector("span").textContent = "Menu";
    menuButton.querySelector("img").src = "assets/icons/menu-2.svg";
  }
  menuButton.addEventListener("click", () => {
    const opening = menu.hidden;
    menu.hidden = !opening;
    menuButton.setAttribute("aria-expanded", String(opening));
    menuButton.querySelector("span").textContent = opening ? "Close" : "Menu";
    menuButton.querySelector("img").src =
      `assets/icons/${opening ? "x" : "menu-2"}.svg`;
  });
  menu
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      closeMenu();
      menuButton.focus();
    }
  });
  window
    .matchMedia("(min-width: 768px)")
    .addEventListener("change", (event) => {
      if (event.matches) closeMenu();
    });
  const clock = document.getElementById("local-time");
  function updateClock() {
    clock.textContent =
      new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date()) + " KURNOOL";
  }
  updateClock();
  window.setInterval(updateClock, 60000);
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
  const dialog = document.querySelector(".lightbox");
  if (dialog) {
    document.querySelectorAll("[data-lightbox]").forEach((button) =>
      button.addEventListener("click", () => {
        const image = dialog.querySelector(".lightbox-image");
        image.src = button.dataset.lightbox;
        image.alt = button.dataset.caption;
        dialog.querySelector(".lightbox-caption").textContent =
          button.dataset.caption;
        dialog.showModal();
      }),
    );
    dialog
      .querySelector(".lightbox-close")
      .addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        const r = dialog.getBoundingClientRect();
        if (
          event.clientX < r.left ||
          event.clientX > r.right ||
          event.clientY < r.top ||
          event.clientY > r.bottom
        )
          dialog.close();
      }
    });
  }
  // A static, dotted wheel field, drawn once per size rather than on every frame.
  const canvas = document.querySelector(".wheel-field");
  if (canvas) {
    const context = canvas.getContext("2d");
    function drawField() {
      if (!context) return;
      const width = canvas.clientWidth,
        height = canvas.clientHeight;
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * scale;
      canvas.height = height * scale;
      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.clearRect(0, 0, width, height);
      const cx = width * 0.58,
        cy = height * 0.5,
        radius = Math.min(width, height) * 0.64;
      context.fillStyle = "#b49355";
      for (let y = 0; y < height; y += 6)
        for (let x = 0; x < width; x += 6) {
          const distance = Math.hypot(x - cx, y - cy) / radius;
          const angle = Math.atan2(y - cy, x - cx);
          const ring = Math.sin(distance * 28 + angle * 3);
          const r = distance < 1.25 ? Math.max(0.35, (ring + 1.3) * 0.7) : 0.3;
          context.beginPath();
          context.arc(x, y, r, 0, Math.PI * 2);
          context.fill();
        }
    }
    new ResizeObserver(drawField).observe(canvas);
  }
})();
