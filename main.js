gsap.registerPlugin(ScrollTrigger);

gsap.to('.cover', {
  scrollTrigger: {
    // markers: true,
    trigger: '.hero',
    start: 'top top',
    // start: ()=>window.innerHeight,
    end: 'bottom bottom',
    // end: '+=1000',
    scrub: true,
    pin: true,
    anticipatePin: 1,
    pinSpacing: false
  },
  scale: 1.5,
  transformOrigin: 'center bottom',
  ease: 'none'
});

gsap.to('.text', {
  scrollTrigger: {
    markers: true,
    trigger: '.hero',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    pin: true,
  },
  // display: 'block',
  color: '#fff',
  ease: 'none',
  zIndex: 10 
});


var swiper = new Swiper(".swiper", {
  slidesPerView : 'auto',
  spaceBetween: 38,
  // loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
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
          // markers: true,
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
    // markers: true,
    trigger: '.careers',
    start: 'top 80%',
    end: 'bottom 20%',
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




const tabLinks = document.querySelectorAll('.tabnav ul li');
const tabContents = document.querySelectorAll('.tab-content > div');

tabLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // 기존 active 클래스 제거
        document.querySelector('.tabnav .active').classList.remove('active');
        
        // 클릭된 탭에 active 클래스 추가
        link.classList.add('active');

        // 모든 탭 콘텐츠 숨기기
        tabContents.forEach((content) => {
            content.classList.remove('active');
        });

        // 클릭된 탭의 href와 일치하는 콘텐츠 보이기
        const targetId = link.querySelector('a').getAttribute('href');
        document.querySelector(targetId).classList.add('active');
    });
});





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
.to('.careers-inner', {
  width: '100vw',
  height: '100vh',
  ease: 'none'
}, 0)
.fromTo('.careers .tit-w', 
  { y: 50, opacity: 0 }, 
  { y: 0, opacity: 1, ease: 'back.out(1.7)' }, 
  0.5 // 수정: 텍스트 애니메이션 시작 시간을 0.5초로 설정
)
.fromTo('.careers .more-black',
  { y: 50, opacity: 0 },
  { y: 0, opacity: 1, ease: 'back.out(1.7)' },
  0.8 // 수정: 버튼 애니메이션 시작 시간을 0.8초로 설정 (텍스트보다 늦게)
);