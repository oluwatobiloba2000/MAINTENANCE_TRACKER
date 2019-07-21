const nav = document.querySelector('.right_nav');
const nav1 = document.querySelector('.nav-1');
const nav2 = document.querySelector('.nav-2');


document.querySelector('#bars-icon').addEventListener('click', (e)=>{
    nav.classList.toggle('open-nav');
    nav1.classList.toggle('open-nav');
    nav2.classList.toggle('open-nav');
})

document.getElementById('top-scroll-btn').addEventListener('click' , ()=>{
    document.documentElement.scrollTop = 0;
});

window.onscroll = ()=>{
    if(document.documentElement.scrollTop > 50){
        document.getElementById('top-scroll-btn').style.display = 'block';
    }else{
        document.getElementById('top-scroll-btn').style.display = 'none';
    }
}