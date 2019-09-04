let loader;
let errorDisplay = document.querySelector('.errormodal');
let backgroundLoader = document.querySelector('.loader-back');
const errorInputModalGreen = document.querySelector('.modal-error-content-green');

function load(){
    loader = setTimeout(showPage, 1000);
}


function showPage() {
    backgroundLoader.classList.remove('background-loader');
  document.getElementById("loader").style.display = "none";
}

const checkToken = ()=>{
    const token = window.localStorage.getItem('admin-token')
    if(token){
      return token;
    }
    window.location.href = '../signin.html';
  };
  let herokuAdminPath = `https://tracky-maintenance-app.herokuapp.com`;
async function getAllRequest(){
    const response = await fetch(`${herokuAdminPath}/api/v1/requests`, {
      method : "GET",
      headers:{
        "content-type" : "application/json",
        Authorization: `Bearer ${checkToken()}`
      }
    }).then(res => res.json())
      .then(response => response)
      .catch(e => e)
      let cardBody = document.querySelector("#card");
       if(response["message"] === 'jwt expired'){
        errorInputModalGreen.classList.add("error-modal-open");
        setTimeout(()=>{
            window.location.href = '../signin.html'
        }, 3000)
      }else{
            // making a request
    response.request.forEach(requests => {
       cardBody.innerHTML += `<div class="requests"><p class="request-title">${requests.title}</p>
      <p class="request-time">Date : ${requests.time}</p>
      <br>
      <p>&nbsp;<i class="fas fa-tools"></i> ${requests.category}</p>
      <p class="request-description">${requests.description}</p>
      <p class="request-status">
      <button title="Approve request" class="request-edit-button" onClick="approve(${requests.id})">Approve</button>
      <button title="Resolve request" class="request-save-button save-${requests.id}" onClick="resolve(${requests.id})">Resolve</button>
      <button title="Disapprove request" class="request-cancel-button cancel-${requests.id}" onClick="disapprove(${requests.id})">Disapprove <i class="far fa-times-circle"></i></button>${requests.status}</p></div>`
    });
    document.getElementById('number-of-request').innerText = `${response.request.length}`;
      }
}

getAllRequest();
function error(){
    let success = document.querySelector('.success')
    success.style.transform = 'translateY(0)'
    setTimeout(()=>{success.style.transform = 'translateY(-57px)'} , 3000);
}
async function approve(id){
    const response = await fetch(`${herokuAdminPath}/api/v1/requests/${id}/approve`, {
        method : "PUT",
        headers:{
          "content-type" : "application/json",
          Authorization: `Bearer ${checkToken()}`
        }
      }).then(res => res.json())
        .then(response => response)
        .catch(e => e)
        if(response["message"] === 'jwt expired'){
                window.location.href = '../signin.html'
        }else if(response["message"] === 'Request can only be approved when they are pending'){
            document.querySelector('.success').innerHTML =  `<p>Request can only be approved when they are pending</p>`
           return error();
        }else if(response["message"] === 'request approved successfully'){
          document.querySelector('.success').style.background = ' #05668D'
            document.querySelector('.success').innerHTML =  `<p>Request Approved <i class="fas fa-check-double"></i></p>`
           error();
            setTimeout(()=>{window.location = '../../HTML/admin/admin-index.html'} , 2000);
        }
}

async function resolve(id){
    const response = await fetch(`${herokuAdminPath}/api/v1/requests/${id}/resolve`, {
        method : "PUT",
        headers:{
          "content-type" : "application/json",
          Authorization: `Bearer ${checkToken()}`
        }
      }).then(res => res.json())
        .then(response => response)
        .catch(e => e)
        if(response["message"] === 'jwt expired'){
                window.location.href = '../signin.html'
        }else if(response["message"] === 'Request has been resolved'){
            document.querySelector('.success').innerHTML =  `<p>Request has been resovled</p>`
           return error();
        }else if(response["message"] === 'request resolved successfully'){
            document.querySelector('.success').innerHTML =  `<p>Request Resolved</p>`
           error();
            setTimeout(()=>{window.location = '../../HTML/admin/admin-index.html'} , 2000);
        }
}

async function disapprove(id){
    const response = await fetch(`${herokuAdminPath}/api/v1/requests/${id}/disapprove`, {
        method : "PUT",
        headers:{
          "content-type" : "application/json",
          Authorization: `Bearer ${checkToken()}`
        }
      }).then(res => res.json())
        .then(response => response)
        .catch(e => e)
        if(response["message"] === 'jwt expired'){
                window.location.href = '../signin.html'
        }else if(response["message"] === 'Request has been resolved'){
            document.querySelector('.success').innerHTML =  `<p>Request has been resovled</p>`
           return error();
        }else if(response["message"] === 'request disapproved successfully'){
            document.querySelector('.success').style.background = 'red';
            document.querySelector('.success').innerHTML =  `<p>Request Disapproved   <i class="far fa-times-circle"></i></p>`
           error();
            setTimeout(()=>{window.location = '../../HTML/admin/admin-index.html'} , 2000);
        }
}