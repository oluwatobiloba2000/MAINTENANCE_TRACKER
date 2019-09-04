document.getElementById('log-out').addEventListener('click' , ()=>{
    window.localStorage.removeItem('user-token');
    window.location.href = '../signin.html';
})