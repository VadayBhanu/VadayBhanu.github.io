/* Bhanu Pratap Yadav — portfolio interactions */
(function () {
  "use strict";

  /* ---------- Theme toggle (persisted) ---------- */
  var root = document.documentElement;
  var themeToggle = document.getElementById("themeToggle");
  try {
    var saved = localStorage.getItem("bhanu-theme");
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (e) { /* storage unavailable */ }
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("bhanu-theme", next); } catch (e) {}
    });
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById("menuBtn");
  var mobileMenu = document.getElementById("mobileMenu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("open");
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { mobileMenu.classList.remove("open"); });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); ro.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Animated stat counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1400, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var stats = document.querySelectorAll(".stat-num");
  if ("IntersectionObserver" in window && stats.length) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); so.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    stats.forEach(function (s) { so.observe(s); });
  }

  /* ---------- Copy email ---------- */
  var copyBtn = document.getElementById("copyEmail");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var email = "bpy4362@mavs.uta.edu";
      function done() {
        var old = copyBtn.textContent;
        copyBtn.textContent = "Copied ✓";
        setTimeout(function () { copyBtn.textContent = old; }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done).catch(done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = email; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta); done();
      }
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  var sections = ["story", "work", "experience", "skills", "contact"];
  var navLinks = document.querySelectorAll(".nav-links a");
  function setActive() {
    var current = "";
    sections.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 140) current = id;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }
  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  /* ---------- Footer year ---------- */
  var foot = document.querySelector(".footer-inner p");
  if (foot) foot.innerHTML = foot.innerHTML.replace("2026", new Date().getFullYear());
})();
