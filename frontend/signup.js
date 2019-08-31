// document.getElementById('body').addEventListener('load', ()=>{
//     console.log('connected')
//     document.getElementById("loader").style.display = "block"
//        setTimeout(document.getElementById("loader").style.display = "none", console.log('time out'), 3000);

// })

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
const signupBtn = document.getElementById("sign_up_button").addEventListener('click' , async (e)=>{
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    const signupBody = {
        username : username,
        password : password
    };
    const response  = await fetch(`http:localhost:3000/auth/signup` , {
        method: "POST",
        body: JSON.stringify(signupBody),
        headers:{
            "content-type": "application/json"
      }
    })
        .then(res => res.json())
        .then(response => response)
        .catch(e => e);

        if(response === 'Username and password required'){
                 errorDisplay.innerHTML = `<p>Username and password required</p>`
          errorDisplay.classList.add('user-error-open');
         return  setTimeout(()=>{
              errorDisplay.classList.remove('user-error-open');
                }, 2000)
        }else if(response === 'username has been taken'){
            errorDisplay.innerHTML = `<p>Username has been taken, try another one</p>`
            errorDisplay.classList.add('user-green');
           return  setTimeout(()=>{
                errorDisplay.classList.remove('user-green');
                  }, 2000)
        }else if(response['message'] === 'sign up success'){
            errorDisplay.innerHTML = `<p>success</p>`
            errorDisplay.classList.add('user-green');
            window.localStorage.setItem('user-token' , response["usertoken"]);
           return  setTimeout(()=>{
                errorDisplay.classList.remove('user-green');
                window.location.href = '../HTML/user/user-index.html'
                  }, 2000)
        }else{
            errorDisplay.innerHTML = `<p>something unexpected happened</p>`
            errorDisplay.classList.add('user-error-open');
           return  setTimeout(()=>{
                errorDisplay.classList.remove('user-error-open');
                  }, 2000)
        }
});