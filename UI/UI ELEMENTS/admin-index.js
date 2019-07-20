const navbarMobile = document.querySelector('.close-nav-mobile');

document.querySelector('#bars-icon').addEventListener('click' , ()=>{
  navbarMobile.classList.toggle('open-nav');
});