
const hamburger=document.querySelector('.navbar .hamburger');
const navlinks=document.querySelector('.nav-items');

hamburger.addEventListener('click',()=>{
    if(navlinks.classList.contains('active')){
        navlinks.classList.remove('active')
    }
   else{
    navlinks.classList.add('active')
   }
})

AOS.init();

