const show_password = document.getElementById("show_password");
show_password.addEventListener('click', () => {
  const passwordValue = document.getElementById('password');
  // checking if the input type is password
  if (passwordValue.type === "password") {
    // if it is password , change it to text
    passwordValue.type = "text";
    // change the text content of the show_password to "HIDE"
    show_password.innerHTML = `<i class="fas fa-eye-slash"></i>`;
  } else {
    // else change it back to password
    passwordValue.type = "password";
    // change the text content of the show_password to SHOW
    show_password.innerHTML = `<i class="fas fa-eye"></i>`;
  }
});

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

document.getElementById('sign_in_button').addEventListener('click' , async (e)=>{
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const signinBody = {
        username: username,
        password: password
    }
    const response = await fetch(`http:localhost:3000/auth/login`, {
        method: "POST",
        body: JSON.stringify(signinBody),
        headers:{
            "content-type" : "application/json"
        }
    })
    .then(res => res.json())
    .then(response => response)
    .catch(e => e);

    if(response === "Username and password are required"){
        errorDisplay.innerHTML = `<p>Username and password required</p>`
        errorDisplay.classList.add('user-error-open');
       return  setTimeout(()=>{
            errorDisplay.classList.remove('user-error-open');
              }, 2000)
    }else if(response === 'incorrect username or password' || response === 'username does not exist on our server'){
        errorDisplay.innerHTML = `<p>Incorrect username or password</p>`
        errorDisplay.classList.add('user-red');
       return  setTimeout(()=>{
            errorDisplay.classList.remove('user-red');
              }, 2000)
    }else if(response["message"] === 'sign in user success'){
        errorDisplay.innerHTML = `<p>Login success, please wait you will be redirected in few seconds ......</p>`
        errorDisplay.classList.add('user-green');
        window.localStorage.setItem('user-token' , response["usertoken"]);
        return  setTimeout(()=>{
          window.location.href = "../HTML/user/user-index.html";
            errorDisplay.classList.remove('user-green');
              }, 1000)
    }else if(response["message"] === 'sign in admin success'){
      errorDisplay.innerHTML = `<p>Login success, welcome Admin</p>`
        errorDisplay.classList.add('user-green');
        window.localStorage.setItem('admin-token' , response["admintoken"]);
        return  setTimeout(()=>{
          window.location.href = "../HTML/admin/admin-index.html";
            errorDisplay.classList.remove('user-green');
              }, 1000)
    }else{
      errorDisplay.innerHTML = `<p>something unexpected happened</p>`
      errorDisplay.classList.add('user-red');
     return  setTimeout(()=>{
          errorDisplay.classList.remove('user-red');
            }, 2000)
    }
})