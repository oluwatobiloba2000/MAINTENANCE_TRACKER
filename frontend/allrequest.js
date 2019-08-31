let loader;
let errorDisplay = document.querySelector('.errormodal');
let backgroundLoader = document.querySelector('.loader-back');

function load(){
    loader = setTimeout(showPage, 1000);
}


function showPage() {
    backgroundLoader.classList.remove('background-loader');
  document.getElementById("loader").style.display = "none";
}

const checkToken = ()=>{
  const token = window.localStorage.getItem('user-token')
  if(token){
    return token;
  }
  window.location.href = '../HTML/signin.html';
};

