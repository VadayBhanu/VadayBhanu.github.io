/* Bhanu Pratap Yadav — portfolio interactions (v3) */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- Theme toggle (persisted) ---------- */
  var themeToggle = document.getElementById("themeToggle");
  try {
    var saved = localStorage.getItem("bhanu-theme");
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (e) { /* storage unavailable */ }
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("bhanu-theme", next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById("menuBtn");
  var mobileMenu = document.getElementById("mobileMenu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () {
      var open = mobileMenu.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileMenu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* ---------- Reveal on scroll ----------
     CSS only hides .reveal when <html> has .js (added inline in <head>),
     so content stays visible if this script fails. A safety timer reveals
     everything after 3s in case IntersectionObserver never fires. */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  function revealAll() {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }
  if ("IntersectionObserver" in window && revealEls.length) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); ro.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -32px 0px" });
    revealEls.forEach(function (el) { ro.observe(el); });
    setTimeout(revealAll, 3000);
  } else {
    revealAll();
  }

  /* ---------- Animated stat counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    if (isNaN(target)) return;
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { el.textContent = target.toFixed(decimals) + suffix; return; }
    var dur = 1300, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(tick);
  }
  var stats = document.querySelectorAll(".stat-num");
  if ("IntersectionObserver" in window && stats.length) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); so.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    stats.forEach(function (s) { so.observe(s); });
  } else {
    stats.forEach(animateCount);
  }

  /* ---------- Copy email ---------- */
  var copyBtn = document.getElementById("copyEmail");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var email = "bpy4362@mavs.uta.edu";
      var original = copyBtn.textContent;
      function done(ok) {
        copyBtn.textContent = ok ? "Copied to clipboard" : email;
        setTimeout(function () { copyBtn.textContent = original; }, 1800);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () { done(true); }, function () { done(false); });
      } else {
        var ta = document.createElement("textarea");
        ta.value = email;
        ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        try { done(document.execCommand("copy")); } catch (e) { done(false); }
        document.body.removeChild(ta);
      }
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  var sections = ["about", "experience", "work", "skills", "contact"];
  var navLinks = document.querySelectorAll(".nav-links a");
  var ticking = false;
  function setActive() {
    ticking = false;
    var current = "";
    sections.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && window.scrollY >= el.getBoundingClientRect().top + window.scrollY - 160) current = id;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(setActive); }
  }, { passive: true });
  setActive();

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
