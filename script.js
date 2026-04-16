/**
 * INVEST QUEST — script.js
 * 기능: 스무스 스크롤, 섹션 등장 애니메이션 (Intersection Observer)
 */

// ── 1. "앱 데모 보기" 버튼 → 데모 섹션으로 스무스 스크롤 ──
document.addEventListener('DOMContentLoaded', () => {

  const demoBtn = document.getElementById('demo-btn');
  if (demoBtn) {
    demoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('demo');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // 헤더 내 모든 앵커도 스무스 스크롤 적용
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── 2. Intersection Observer: 섹션 등장 효과 ──
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // 한 번 등장 후 재관찰 불필요
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,    // 요소의 12%가 보이면 트리거
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));

  // ── 3. 헤더 스크롤 시 그림자 강조 ──
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  }, { passive: true });

});
