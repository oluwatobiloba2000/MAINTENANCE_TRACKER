const nav = document.querySelector('.right_nav');
const nav1 = document.querySelector('.nav-1');
const nav2 = document.querySelector('.nav-2');


document.querySelector('#bars-icon').addEventListener('click', (e)=>{
    nav.classList.toggle('open-nav');
    nav1.classList.toggle('open-nav');
    nav2.classList.toggle('open-nav');
})