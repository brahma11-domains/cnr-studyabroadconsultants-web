/**
 * includes.js — CNR Study Abroad
 * Injects shared HTML components (topbar, header, footer)
 * Works from both root (/) and /pages/* via absolute fetch paths
 */

async function loadInclude(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load ${url}`);
    el.innerHTML = await res.text();
    // Re-run any scripts inside the injected HTML
    el.querySelectorAll('script').forEach(s => {
      const ns = document.createElement('script');
      ns.textContent = s.textContent;
      s.parentNode.replaceChild(ns, s);
    });
  } catch (e) {
    console.warn('Include error:', e);
  }
}

async function initIncludes() {
  await Promise.all([
    loadInclude('#topbar-placeholder', '/includes/topbar.html'),
    loadInclude('#header-placeholder', '/includes/header.html'),
    loadInclude('#footer-placeholder', '/includes/footer.html'),
  ]);
  initNav();
  initReveal();
}

function initNav() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
  });

  // Mark active nav link
  const path = window.location.pathname;
  document.querySelectorAll('.main-nav a').forEach(a => {
    if (a.getAttribute('href') === path || (path !== '/' && a.getAttribute('href')?.includes(path.split('/').pop()))) {
      a.classList.add('active');
    }
  });
}

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
}

document.addEventListener('DOMContentLoaded', initIncludes);
