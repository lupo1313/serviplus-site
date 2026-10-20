/* =========================================================
   Groupe SERVIPLUS - Interactions (vanilla JS)
   ========================================================= */
(function () {
  "use strict";

  const header = document.querySelector(".header");
  const nav = document.getElementById("menu");
  const burger = document.querySelector("[data-open-menu]");
  const overlay = document.querySelector(".nav-overlay");
  const closeEls = document.querySelectorAll("[data-close-menu]");
  const navLinks = Array.from(document.querySelectorAll(".nav__link"));
  const toTop = document.querySelector("[data-to-top]");

  /* ---------- Menu mobile ---------- */
  function openMenu() {
    nav.classList.add("is-open");
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add("is-open"));
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    const first = nav.querySelector("a, button");
    if (first) first.focus();
  }
  function closeMenu() {
    nav.classList.remove("is-open");
    overlay.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    setTimeout(() => { overlay.hidden = true; }, 300);
  }
  if (burger) burger.addEventListener("click", openMenu);
  closeEls.forEach((el) => el.addEventListener("click", closeMenu));
  navLinks.forEach((l) => l.addEventListener("click", () => {
    if (nav.classList.contains("is-open")) closeMenu();
  }));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      burger.focus();
    }
  });

  /* ---------- Header sticky (ombre au scroll) ---------- */
  function onScroll() {
    header.classList.toggle("is-stuck", window.scrollY > 10);
    if (toTop) toTop.classList.toggle("is-visible", window.scrollY > 600);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Retour en haut ---------- */
  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Apparition au scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- Accordéon footer (mobile) ---------- */
  document.querySelectorAll(".footer__acc-head").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (window.matchMedia("(min-width: 768px)").matches) return;
      const col = btn.closest(".footer__acc");
      const open = col.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* ---------- Scroll-spy : lien actif dans la nav ---------- */
  const sections = navLinks
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = "#" + entry.target.id;
          navLinks.forEach((l) =>
            l.classList.toggle("is-active", l.getAttribute("href") === id)
          );
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach((s) => spy.observe(s));
  }
})();
