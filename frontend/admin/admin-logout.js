document.getElementById('log-out').addEventListener('click' , ()=>{
    window.localStorage.removeItem('admin-token');
})