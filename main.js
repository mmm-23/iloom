gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
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
      webkitBackdropFilter: isTop ? 'none' : 'blur(10px)', // Safari 대응
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

  // ScrollTrigger를 한 번만 생성 — 방향과 최상단(투명) 체크 포함
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const s = self.scroll();
      if (s <= 0) {
        // 맨 위: 투명 배경으로
        showHeader(true);
      } else if (self.direction === 1 && s > 50) {
        // 아래로 스크롤: 숨김
        hideHeader();
      } else if (self.direction === -1) {
        // 위로 스크롤: 보임(배경/그림자 적용)
        showHeader(false);
      }
    }
  });

});





// --- cover 섹션 ---

document.addEventListener('DOMContentLoaded', function () {

  const coverImage = document.querySelector('.cover-image');
  const coverClip = document.querySelector('.cover-clip');
  const textWhite = document.querySelector('.text.white');

  // CSS clip-path
  gsap.timeline({
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '+=800',
        scrub: true,
        pin: true,
        anticipatePin: 1,
        pinSpacing: true,
        // markers: true,
      }
    })
    .to(coverImage, {
      width: '100%',
      height: '100%',
      left: 0,
      transformOrigin: 'center bottom',
      ease: 'none'
    }, 0)
    .fromTo(coverClip, {
      clipPath: 'inset(47% 0 0 0)' // 위쪽 완전 숨김 (아래에서 위로 올라옴)
    }, {
      clipPath: 'inset(0% 0 0 0)', // 완전 표시
      ease: 'none'
    }, 0)
    .fromTo(textWhite, {
      clipPath: 'inset(100% 0 0 0)' // 위쪽 완전 숨김  
    }, {
      clipPath: 'inset(0% 0 0 0)', // 완전 표시
      ease: 'none'
    }, 0);
});






// --- swiper 섹션 ---
var swiper = new Swiper(".swiper", {
  slidesPerView: 'auto',
  spaceBetween: 38,
  // loop: true,
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
      spaceBetween: 40
    }
  }
});





// --- text-interaction 섹션 ---
document.addEventListener('DOMContentLoaded', () => {
  const spans = document.querySelectorAll('.text-interaction span');
  spans.forEach((span, i) => {
    const wTarget = 420;
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
        // markers: true,
        trigger: span,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  });
});



// --- services 섹션 --- 

const servicesSwiper = new Swiper(".my-services-swiper", {
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  speed: 600,
});

const tabLinks = document.querySelectorAll('.tabnav li');
const tabContents = document.querySelectorAll('.tab-content > div');

tabLinks.forEach((link, index) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    document.querySelector('.tabnav .active').classList.remove('active');
    link.classList.add('active');
    tabContents.forEach((content) => {
      content.classList.remove('active');
    });
    const targetId = link.querySelector('a').getAttribute('href');
    document.querySelector(targetId).classList.add('active');

    servicesSwiper.slideTo(index);
  });
});





// --- Leadership Section ---
function initLeadershipTimeline() {
  const allImages = document.querySelectorAll(".leadership .bg-item img");
  // 위쪽 이미지 1~3
  const topImages = Array.from(allImages).slice(0, 3);
  // 아래쪽 이미지 4~5
  const bottomImages = Array.from(allImages).slice(3, 5);

  const oldTrigger = ScrollTrigger.getById("leadership");
  if (oldTrigger) oldTrigger.kill();

  let tl = gsap.timeline({
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
  tl.fromTo(
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
  tl.fromTo(
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
  tl.fromTo(".leadership .align-warp h3", {
    y: 30,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    ease: "back.out(1.5)"
  }, 0.5);

  tl.fromTo(".leadership .align-warp h2", {
    y: 30,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    ease: "back.out(1.5)"
  }, 0.5);

  tl.fromTo(".leadership .align-warp .more-black", {
    y: 20,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    ease: "back.out(1.5)"
  }, 0.5);
}

initLeadershipTimeline();





// --- careers 섹션 ---
const careersInner = document.querySelector('.careers-inner');
const careersContent = document.querySelector('.careers-content');
const careersBtn = document.querySelector('.careers .more-black');

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
    y: 50,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    ease: 'back.out(1.7)'
  })
  .to(careersBtn, {
    opacity: 1,
    y: 0,
    ease: 'back.out(1.7)'
  }, 0.2);





// --- footer 섹션 --- 

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

// 푸터 컨텐츠 이미지가 올라온 후
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