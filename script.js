/* =============================================
   JavaScript - 우준서 개인 소개 웹사이트
   ============================================= */

// ---- 파티클 시스템 ----
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 2 + 0.5;
    this.alpha = Math.random() * 0.6 + 0.1;
    this.color = Math.random() > 0.5 ? '0, 212, 255' : '0, 102, 255';
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
    ctx.fill();
  }
}

const particles = Array.from({ length: 120 }, () => new Particle());

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        const alpha = (1 - dist / 100) * 0.15;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}

animateParticles();

// ---- 네비게이션 ----
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// 모바일 메뉴 닫기
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ---- 숫자 카운트업 애니메이션 ----
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

// ---- 스크롤 관찰자 ----
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // 숫자 카운터
      if (entry.target.classList.contains('stat-num')) {
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    }
  });
}, observerOptions);

// 애니메이션 요소들에 클래스 추가
document.addEventListener('DOMContentLoaded', () => {
  // 스탯 숫자
  document.querySelectorAll('.stat-num').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // 소개 카드
  document.querySelectorAll('.about-card').forEach((card, i) => {
    card.classList.add('reveal');
    card.style.transitionDelay = `${i * 0.1}s`;
    observer.observe(card);
  });

  // 원소 카드
  document.querySelectorAll('.element-card').forEach((card, i) => {
    card.classList.add('reveal');
    card.style.transitionDelay = `${i * 0.08}s`;
    observer.observe(card);
  });

  // 취미 카드
  document.querySelectorAll('.hobby-card').forEach((card, i) => {
    card.classList.add('reveal');
    card.style.transitionDelay = `${i * 0.15}s`;
    observer.observe(card);
  });

  // MBTI 글자
  document.querySelectorAll('.mbti-letter').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.1}s`;
    observer.observe(el);
  });

  // MBTI 특성
  document.querySelectorAll('.trait-item').forEach((el, i) => {
    const cls = i % 2 === 0 ? 'reveal-left' : 'reveal-right';
    el.classList.add(cls);
    el.style.transitionDelay = `${i * 0.1}s`;
    observer.observe(el);
  });

  // 꿈 섹션
  const dreamVisual = document.querySelector('.dream-visual');
  if (dreamVisual) {
    dreamVisual.classList.add('reveal-left');
    observer.observe(dreamVisual);
  }

  const dreamText = document.querySelector('.dream-text');
  if (dreamText) {
    dreamText.classList.add('reveal-right');
    observer.observe(dreamText);
  }

  // 커리어 카드
  document.querySelectorAll('.career-card').forEach((card, i) => {
    card.classList.add('reveal');
    card.style.transitionDelay = `${i * 0.12}s`;
    observer.observe(card);
  });

  // 섹션 헤더
  document.querySelectorAll('.section-header').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
});

// ---- 원소 카드 호버 파티클 효과 ----
document.querySelectorAll('.element-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.5)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '';
  });
});

// ---- 부드러운 페이지 진입 ----
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';

  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// ---- 마우스 파티클 효과 ----
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // 마우스 근처 파티클 반응
  particles.forEach(p => {
    const dx = p.x - mouseX;
    const dy = p.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 100) {
      const force = (100 - dist) / 100;
      p.vx += (dx / dist) * force * 0.5;
      p.vy += (dy / dist) * force * 0.5;

      // 속도 제한
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 3) {
        p.vx = (p.vx / speed) * 3;
        p.vy = (p.vy / speed) * 3;
      }
    }
  });
});

// ---- 타이핑 효과 (히어로 설명) ----
const heroDesc = document.querySelector('.hero-desc');
if (heroDesc) {
  const originalText = heroDesc.textContent;
  heroDesc.textContent = '';
  heroDesc.style.opacity = '1';

  let charIndex = 0;
  const typeInterval = setInterval(() => {
    if (charIndex < originalText.length) {
      heroDesc.textContent += originalText[charIndex];
      charIndex++;
    } else {
      clearInterval(typeInterval);
    }
  }, 40);
}

console.log(`
  ██╗    ██╗     ██╗███████╗
  ██║    ██║     ██║██╔════╝
  ██║ █╗ ██║     ██║███████╗
  ██║███╗██║██   ██║╚════██║
  ╚███╔███╔╝╚█████╔╝███████║
   ╚══╝╚══╝  ╚════╝ ╚══════╝
  우준서의 포트폴리오 웹사이트 ✨
  화학을 꿈꾸는 학생 | INFP
`);
