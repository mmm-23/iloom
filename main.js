gsap.registerPlugin(ScrollTrigger);

gsap.to('.cover', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    pin: true,
    anticipatePin: 1,
    pinSpacing: false
  },
  scale: 1.5,
  // width: '100vh',   // 가로 → 100vh
  // height: '100vh',// 확대
  transformOrigin: 'center bottom', // 아래쪽 기준으로 커짐
  ease: 'none'
});

gsap.to('.text', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
  color: '#fff',
  ease: 'none',
  zIndex: 1 
});


document.addEventListener('DOMContentLoaded', () => {
  const spans = document.querySelectorAll('.text-interaction span');

  spans.forEach((span, i) => {
    const wTarget = 420; // 최종 너비(디자인값에 맞게 조절)

    gsap.fromTo(span,
      { width: 0, opacity: 0, x: -100 },
      {
        width: wTarget,
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: i * 0.2, // 순차 등장
        scrollTrigger: {
          trigger: span,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
});


gsap.registerPlugin(ScrollTrigger);

const careersBg = document.querySelector('.careers .background');
const careersContent = document.querySelector('.careers .content');
const careersBtn = document.querySelector('.careers .more-black');

gsap.timeline({
  scrollTrigger: {
    trigger: '.careers',
    start: 'top 80%',         // 화면 80%에 닿으면 시작
    end: 'bottom 20%',        // 화면 20%쯤에서 끝
    scrub: true
  }
})
.to(careersBg, {
  width: '100%',              // 최종 화면 꽉 채우기
  height: '100%',             // 섹션 전체 높이
  top: '50%',
  left: '50%',
  xPercent: -50,
  yPercent: -50,
  ease: 'none'
})
.to(careersContent, {
  opacity: 1,
  y: 0,
  duration: 1,
  ease: 'power3.out'
}, "-=0.5")  // 배경 애니메이션과 살짝 겹치게 등장
.to(careersBtn, {
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: 'power3.out'
}, "-=0.3"); // 텍스트 뒤를 이어 버튼 등장




