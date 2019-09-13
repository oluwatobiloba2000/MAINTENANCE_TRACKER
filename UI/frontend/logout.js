document.getElementById('log-out').addEventListener('click' , ()=>{
    window.localStorage.removeItem('user-token');
    window.localStorage.removeItem('userId')
    window.localStorage.removeItem('user-name')
    window.location.href = '../signin.html';
})