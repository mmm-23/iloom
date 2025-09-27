gsap.registerPlugin(ScrollTrigger);

// 전역 변수
let leadershipTimeline = null;

// 메인 초기화 함수
document.addEventListener('DOMContentLoaded', function () {
  initHeader();
  initHeroSection();
  initSwiper();
  initTextInteraction();
  initServicesSection();
  initLeadershipSection();
  initCareersSection();
  initFooterSection();
});

// === 헤더 초기화 ===
function initHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  gsap.set(header, {
    y: '0%'
  });

  function showHeader(isTop = false) {
    gsap.to(header, {
      y: '0%',
      backgroundColor: isTop ? 'transparent' : 'rgba(255,255,255,0.4)',
      backdropFilter: isTop ? 'none' : 'blur(10px)',
      webkitBackdropFilter: isTop ? 'none' : 'blur(10px)',
      duration: 0.35,
      ease: 'power3.out'
    });
  }

  function hideHeader() {
    gsap.to(header, {
      y: '-100%',
      duration: 0.35,
      ease: 'power3.out'
    });
  }

  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const s = self.scroll();
      if (s <= 0) {
        showHeader(true);
      } else if (self.direction === 1 && s > 50) {
        hideHeader();
      } else if (self.direction === -1) {
        showHeader(false);
      }
    }
  });
}

// === Hero 섹션 (cover) 초기화 ===
function initHeroSection() {
  // 모바일 기준
  const mobileBreakpoint = 768;

  // 현재 창의 너비가 모바일 기준보다 작으면 함수를 즉시 종료
  if (window.innerWidth < mobileBreakpoint) {

    const coverImage = document.querySelector('.cover-image');
    if (coverImage) {
      gsap.set(coverImage, {
        top: '400px',
        width: '100%',
        height: '60%', // 모바일 높이에 맞게 조정
        xPercent: -50,
        filter: "brightness(0.7)"
      });
    }
    // 애니메이션 관련 요소 숨김 처리
    const textWhite = document.querySelector('.text.white');
    if(textWhite) {
      textWhite.style.display = 'none';
    }
    return; // GSAP 타임라인 실행 방지
  }

  // --- 이하 코드는 데스크톱 환경에서만 실행됩니다 ---

  const coverImage = document.querySelector('.cover-image');
  const coverClip = document.querySelector('.cover-clip');
  const textWhite = document.querySelector('.text.white');

  const newWidth = window.innerWidth - 146;

  if (!coverImage || !coverClip || !textWhite) return;

  gsap.timeline({
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: '+=800',
      scrub: true,
      pin: true,
      anticipatePin: 1,
    }
  })
    .set(coverImage, { xPercent: -50 })
    .fromTo(coverImage, {
      width: newWidth,
      height: '70%',
      xPercent: -50,
      filter: "brightness(1)"
    }, {
      width: '100%',
      height: '70%',
      xPercent: -50,
      transformOrigin: 'center top',
      filter: "brightness(0.7)",
      ease: 'power3.in'
    }, 0)
    .fromTo(coverClip, {
      clipPath: 'inset(46% 0 0 0)'
    }, {
      clipPath: 'inset(0% 0 0 0)',
      ease: 'none'
    }, 0)
    .fromTo(textWhite, {
      clipPath: 'inset(100% 0 0 0)',
      y: 0,
    }, {
      clipPath: 'inset(0% 0 0 0)',
      y: 0,
      ease: 'none'
    }, 0)
}

// === Swiper 초기화 ===
function initSwiper() {
  new Swiper(".swiper", {
    slidesPerView: 'auto',
    // spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        spaceBetween: 16
      },
      768: {
        spaceBetween: 20
      },
      1200: {
        spaceBetween: 30
      }
    }
  });
}

// === 텍스트 인터랙션 초기화 ===
function initTextInteraction() {
  const spans = document.querySelectorAll('.text-interaction span');
  spans.forEach((span, i) => {
    const wTarget = 337;
    gsap.fromTo(span, {
      width: 0,
      opacity: 0,
      x: -100
    }, {
      width: wTarget,
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: i * 0.2,
      scrollTrigger: {
        trigger: span,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}

// === Services 섹션 초기화 ===
function initServicesSection() {
  const servicesSwiper = new Swiper(".my-services-swiper", {
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    speed: 600,
  });

  const tabLinks = document.querySelectorAll('.tabnav li');
  const tabContents = document.querySelectorAll('.tab-content > div');

  tabLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      document.querySelector('.tabnav .active')?.classList.remove('active');
      link.classList.add('active');

      tabContents.forEach((content) => {
        content.classList.remove('active');
      });

      const targetId = link.querySelector('a')?.getAttribute('href');
      if (targetId) {
        document.querySelector(targetId)?.classList.add('active');
      }

      servicesSwiper.slideTo(index);
    });
  });
}

// === Leadership 섹션 초기화 ===
function initLeadershipSection() {
  const allImages = document.querySelectorAll(".leadership .bg-item img");
  if (!allImages.length) return;

  // 기존 타임라인 정리
  if (leadershipTimeline) {
    leadershipTimeline.kill();
    leadershipTimeline = null;
  }

  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.vars && (trigger.vars.trigger === ".leadership" || trigger.vars.pin === ".sticky-holder")) {
      trigger.kill();
    }
  });

  leadershipTimeline = gsap.timeline({
    scrollTrigger: {
      id: "leadership",
      trigger: ".leadership",
      start: "top top",
      end: "+=2000",
      scrub: true,
      pin: ".sticky-holder",
      pinSpacing: true
    }
  });

  // 위쪽 이미지들 (1~3)
  leadershipTimeline.fromTo(
    ".leadership .bg-item:not(:nth-last-child(-n+2)) img", {
    yPercent: 80,
    opacity: 1,
    x: (i) => i === 0 ? -150 : 150
  }, {
    yPercent: -90,
    opacity: 1,
    stagger: 0.3,
    ease: "none"
  }
  );

  // 마지막 이미지들 (4, 5)
  leadershipTimeline.fromTo(
    ".leadership .bg-item:nth-last-child(-n+2) img", {
    yPercent: 150,
    opacity: 1,
    x: (i) => i === 0 ? -150 : 150
  }, {
    y: (i, el) => {
      if (i === 0) return window.innerHeight * 0.1;
      else return window.innerHeight - el.offsetHeight;
    },
    opacity: 1,
    ease: "none",
    stagger: 0.5
  },
    "<"
  );

  // 텍스트 & 버튼
  leadershipTimeline.fromTo(".leadership .align-warp h3", {
    y: 30,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    ease: "back.out(1.5)"
  }, 0.5);

  leadershipTimeline.fromTo(".leadership .align-warp h2", {
    y: 30,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    ease: "back.out(1.5)"
  }, 0.5);

  leadershipTimeline.fromTo(".leadership .align-warp .more-black", {
    y: 20,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    ease: "back.out(1.5)"
  }, 0.5);
}

// === Careers 섹션 초기화 ===
function initCareersSection() {
  const careersInner = document.querySelector('.careers-inner');
  const careersContent = document.querySelector('.careers-content');
  const careersBtn = document.querySelector('.careers .more-black');

  if (!careersInner || !careersContent || !careersBtn) return;

  gsap.timeline({
    scrollTrigger: {
      trigger: '.careers',
      start: 'top top',
      end: '+=1000',
      scrub: true,
      pin: true,
      pinSpacing: true
    }
  })
    .to(careersInner, {
      width: '100vw',
      height: '100vh',
      ease: 'none'
    }, 0)
    .fromTo(careersContent, {
      y: 50
    }, {
      y: 0,
      ease: 'back.out(1.7)'
    }, 0)
    .fromTo(careersBtn, {
      y: 50
    }, {
      y: 0,
      ease: 'back.out(1.7)'
    }, 0.2)
    .fromTo(careersContent, { // 수정: careersContent의 opacity 애니메이션 추가
      opacity: 0
    }, {
      opacity: 1,
      duration: 0.8, // 수정: opacity 애니메이션을 더 길게
      ease: 'none'
    }, 0)
    .fromTo(careersBtn, { // 수정: careersBtn의 opacity 애니메이션 추가
      opacity: 0
    }, {
      opacity: 1,
      duration: 0.8, // 수정: opacity 애니메이션을 더 길게
      ease: 'none'
    }, 0.2); // 수정: 시작 시점은 기존과 동일
}

// === Footer 섹션 초기화 ===
function initFooterSection() {
  const footerBgEl = document.querySelector('.footer-bg');
  const ftWrapperEl = document.querySelector('.ft-wrapper');

  // 푸터 이미지 아래에서 위로
  if (footerBgEl) {
    gsap.fromTo(footerBgEl, {
      y: '100%',
      opacity: 0
    }, {
      y: '0%',
      opacity: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.footer',
        start: 'bottom bottom',
        end: 'top bottom',
        scrub: true
      }
    });
  }

  // 푸터 컨텐츠
  if (ftWrapperEl) {
    gsap.fromTo(ftWrapperEl, {
      y: 50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.footer',
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });
  }
}

// === 외부에서 호출할 수 있는 함수들 ===
window.initLeadershipTimeline = initLeadershipSection;