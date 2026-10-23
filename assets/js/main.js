/* =========================================================
   Groupe SERVIPLUS - Interactions (vanilla JS)
   ========================================================= */
(function () {
  "use strict";

  const nav = document.getElementById("menu");
  const burger = document.querySelector("[data-open-menu]");
  const overlay = document.querySelector(".nav-overlay");
  const closeEls = document.querySelectorAll("[data-close-menu]");
  const navLinks = Array.from(document.querySelectorAll(".nav__link"));
  const header = document.querySelector(".header");
  const toTop = document.querySelector("[data-to-top]");

  /* ---------- Menu mobile ---------- */
  function openMenu() {
    nav.classList.add("is-open");
    if (overlay) { overlay.hidden = false; requestAnimationFrame(() => overlay.classList.add("is-open")); }
    burger.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
    document.body.style.overflow = "hidden";
    const first = nav.querySelector("a, button");
    if (first) first.focus();
  }
  function closeMenu() {
    nav.classList.remove("is-open");
    if (overlay) { overlay.classList.remove("is-open"); setTimeout(() => { overlay.hidden = true; }, 300); }
    burger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
    document.body.style.overflow = "";
  }
  if (burger) burger.addEventListener("click", openMenu);
  closeEls.forEach((el) => el.addEventListener("click", closeMenu));
  navLinks.forEach((l) => l.addEventListener("click", () => {
    if (nav.classList.contains("is-open")) closeMenu();
  }));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { closeMenu(); burger.focus(); }
  });

  /* ---------- Header (ombre au scroll) + retour haut ---------- */
  function onScroll() {
    if (header) header.classList.toggle("is-stuck", window.scrollY > 10);
    if (toTop) toTop.classList.toggle("is-visible", window.scrollY > 600);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Apparition discrète au scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
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

  /* ---------- Compteurs animés (chiffres clés) ---------- */
  const nums = document.querySelectorAll(".stat__num[data-count]");
  if (nums.length) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = (el) => {
      const target = parseInt(el.dataset.count, 10) || 0;
      const suffix = el.dataset.suffix || "";
      if (reduce) { el.textContent = target + suffix; return; }
      const duration = 1500;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(step);
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { run(entry.target); io.unobserve(entry.target); }
        });
      }, { threshold: 0.4 });
      nums.forEach((n) => io.observe(n));
    } else {
      nums.forEach(run);
    }
  }

  /* ---------- Formulaire "Devenir client" ---------- */
  const form = document.getElementById("contact-form");
  if (form) {
    const status = document.getElementById("form-status");
    const showStatus = (msg, ok) => {
      status.hidden = false;
      status.textContent = msg;
      status.classList.toggle("is-ok", ok);
      status.classList.toggle("is-err", !ok);
    };
    const validate = () => {
      let valid = true;
      form.querySelectorAll("[required]").forEach((el) => {
        const ok = el.type === "checkbox" ? el.checked : el.value.trim() !== "";
        const field = el.closest(".field") || el.closest(".check--consent");
        if (field) field.classList.toggle("field--invalid", !ok);
        const errId = el.getAttribute("aria-describedby");
        if (errId) { const err = document.getElementById(errId); if (err) err.hidden = ok; }
        if (!ok) valid = false;
      });
      return valid;
    };
    form.addEventListener("submit", async (e) => {
      if (!validate()) { e.preventDefault(); const bad = form.querySelector(".field--invalid input, .field--invalid select"); if (bad) bad.focus(); return; }
      if (form.querySelector("[name=botcheck]").checked) { e.preventDefault(); return; }
      if (!window.fetch || !window.FormData) { return; } // fallback : POST natif
      e.preventDefault();
      const btn = form.querySelector("[type=submit]");
      const label = btn.textContent;
      btn.disabled = true; btn.textContent = "Envoi…";
      try {
        const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.success !== false) {
          form.reset();
          showStatus("Merci, votre demande a bien été envoyée. On vous recontacte rapidement.", true);
        } else {
          showStatus("Une erreur est survenue. Vous pouvez nous appeler au 04 42 10 94 10.", false);
        }
      } catch (err) {
        showStatus("Envoi impossible pour le moment. Appelez-nous au 04 42 10 94 10.", false);
      } finally {
        btn.disabled = false; btn.textContent = label;
      }
    });
  }
})();
