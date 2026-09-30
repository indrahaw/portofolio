// =========================================================
// script.js — fungsionalitas dasar homepage portofolio
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // 1. Toggle menu mobile ---------------------------------
  function setMenu(open) {
    navMenu.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  }

  navToggle.addEventListener("click", () => {
    setMenu(!navMenu.classList.contains("is-open"));
  });

  // Tutup menu setelah link diklik
  navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  // Tutup menu dengan tombol Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  // 2. Bayangan navbar saat di-scroll ---------------------
  function onScroll() {
    navbar.classList.toggle("is-scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // 3. Tandai link navbar aktif sesuai section ------------
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.toggle(
                "is-active",
                link.getAttribute("href") === `#${entry.target.id}`
              );
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((section) => sectionObserver.observe(section));

    // 4. Animasi muncul saat scroll ------------------------
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback untuk browser lama: tampilkan semua konten
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  }

  // 5. Tahun otomatis di footer ---------------------------
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});