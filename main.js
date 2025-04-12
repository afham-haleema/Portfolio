AOS.init();


AOS.init({
  // Global settings:

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 900, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

const navlinks=document.querySelectorAll('.abt-info .nav-link[data-target]');
const sections=document.querySelectorAll('.tab-section');
navlinks.forEach((link=>{
    link.addEventListener('click',(e)=>{
        e.preventDefault();

        navlinks.forEach((nav)=>nav.classList.remove('active'));

        link.classList.add('active');

        sections.forEach((section)=>section.classList.add('d-none'));

        const targetId=link.getAttribute('data-target');
        document.getElementById(targetId).classList.remove('d-none')
    })
}))