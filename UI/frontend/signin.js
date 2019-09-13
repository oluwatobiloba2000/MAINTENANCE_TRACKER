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

// let path = `https://maintenance-tracky-api.herokuapp.com`;
let path = `http://localhost:3000`;

document.getElementById('sign_in_button').addEventListener('click' , async (e)=>{
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const signinBody = {username: username, password: password}
    const response = await fetch(`${path}/auth/login`, {
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
        errorDisplay.classList.add('user-red');
    }else if(response === 'incorrect username or password'){
        errorDisplay.innerHTML = `<p><i class="fas fa-exclamation-triangle"></i> Incorrect username or password</p>`
        errorDisplay.classList.add('user-red');
    }else if(response === 'username does not exist on our server'){
        errorDisplay.innerHTML = `<p><i class="fas fa-exclamation-triangle"></i> Username does not exist</p>`
        errorDisplay.classList.add('user-red');
    }
    else if(response["message"] === 'sign in user success'){
        errorDisplay.innerHTML = `<p>Login success, please wait you will be redirected in few seconds ......</p>`
        errorDisplay.classList.add('user-green');
        window.localStorage.setItem('user-token' , response["usertoken"]);
        window.localStorage.setItem('userId', response["userId"]);
        window.localStorage.setItem('user-name', response["user"])
         setTimeout(()=>{
          window.location.href = "../HTML/user/user-index.html";
            errorDisplay.classList.remove('user-green');
              }, 1000)
    }else if(response["message"] === 'sign in admin success'){
      errorDisplay.innerHTML = `<p>Login success, welcome Admin</p>`
        errorDisplay.classList.add('user-green');
        window.localStorage.setItem('admin-token' , response["admintoken"]);
          window.location.href = "../HTML/admin/admin-index.html";
    }else{
      errorDisplay.innerHTML = `<p>something unexpected happened</p>`
      errorDisplay.classList.add('user-red');
    }})