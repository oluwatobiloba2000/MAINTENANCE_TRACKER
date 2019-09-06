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
  const token = window.localStorage.getItem('user-token')
  if(token){
    return token;
  }
  window.location.href = '../signin.html';
};

const userId = window.localStorage.getItem('userId');
const userName = window.localStorage.getItem('user-name');

// let path = `https://tracky-maintenance-app.herokuapp.com`;
let path = `http://localhost:3000`;

const submitForm = document.getElementById("submit").addEventListener("click", async (e) => {
  e.preventDefault();
  //getting the inputs form the user
  let title = document.getElementById("title").value;
  let postCategory = document.querySelector('[name=category]').value;
  let postDescription = document.getElementById("description").value;
  if (title.trim() === '' || postDescription.trim() === '') {
      errorInputModal.classList.add('error-modal-open');
        setTimeout(()=>{errorInputModal.classList.remove('error-modal-open')} , 3000);
  } else {
    const requestBody = {title : title, category : postCategory, description : postDescription, userId : userId, userName : userName}
    const response = await fetch(`${path}/api/v1/users/requests`, {
          method : "POST",
          body : JSON.stringify(requestBody),
          headers:{
            "content-type" : "application/json",
            Authorization: `Bearer ${checkToken()}`
          }
        }).then(res => res.json())
        .then(response => response)
          .catch(e => e)
          // making a request
          const cardBody = document.querySelector("#card");
  const newDiv = document.createElement('div');
  response.request.forEach(e => {
    newDiv.innerHTML += `<p class="title-${e.id} request-title">${e.title}</p>
    <p class="request-time">Date : ${e.time}</p>
    <br>
    <p>&nbsp;<i class="fas fa-tools"></i> ${e.category}</p>
    <p class="description-${e.id} request-description">${e.description}</p>
    <p class="request-status">
    <button class="request-edit-button" onClick="edit(${e.id})">Edit</button>
    <button class="request-save-button save-${e.id}" style="display : none" onClick="save(${e.id})">Save</button>
    <button class="request-cancel-button cancel-${e.id}" style="display : none" onClick="cancel(${e.id})">Cancel</button>${e.status}</p>`
  });

  cardBody.insertAdjacentElement('beforebegin', newDiv);
  newDiv.classList.add("requests");
  let success = document.querySelector('.success')
  success.style.transform = 'translateY(0)'
  setTimeout(()=>{success.style.transform = 'translateY(-57px)'} , 3000);
  // cleared the user inputs
  document.getElementById("form").reset();
  modal.style.display = "none";
  errorInputModal.classList.remove('error-modal-open');
  }
});

async function getAllRequest(){
    const response = await fetch(`${path}/api/v1/${userId}/requests`, {
      method : "GET",
      headers:{
        "content-type" : "application/json",
        Authorization: `Bearer ${checkToken()}`
      }
    }).then(res => res.json())
      .then(response => response)
      .catch(e => e)
      let cardBody = document.querySelector("#card");
    document.querySelector('.username-update').innerText = `${userName}`
    document.getElementById('username-update').innerText = `${userName}`
      if(response === 'NO REQUEST'){
       return document.querySelector('.grey-text').classList.add('grey-text-show');
      }else if(response["message"] === 'jwt expired'){
        errorInputModalGreen.classList.add("error-modal-open");
        return setTimeout(()=>{
            window.location.href = '../signin.html'
        }, 3000)
      }else{
            // making a request
    response.request.forEach(requests => {
       cardBody.innerHTML += `<div class="requests"><p class="request-title title-${requests.id}">${requests.title}</p>
      <p class="request-time">Date : ${requests.time}</p>
      <br>
      <p>&nbsp;<i class="fas fa-tools"></i> ${requests.category}</p>
      <p class="request-description description-${requests.id}">${requests.description}</p>
      <p class="request-status">
      <button class="request-edit-button" onClick="edit(${requests.id})">Edit</button>
      <button class="request-save-button save-${requests.id}" style="display : none" onClick="save(${requests.id})">Save</button><button class="request-cancel-button cancel-${requests.id}" style="display : none" onClick="cancel(${requests.id})">Cancel</button>${requests.status}</p></div>`
    });
    document.getElementById('number-of-request').innerText = `${response.request.length}`;
      }
}

async function edit(id){
 const response = await fetch(`${path}/api/v1/users/requests/${id}`, {
  method : "PUT",
  headers:{
    "content-type" : "application/json",
    Authorization: `Bearer ${checkToken()}`
  }
}).then(res => res.json())
  .then(response => response)
  .catch(e => e)
  if(response["message"] === 'request approved cannot be edited'){
    document.querySelector(`.save-${id}`).style.display = 'none'; document.querySelector(`.cancel-${id}`).style.display = 'none';
  }else{
    addContenteditable(id);
  }

}

async function save(id){
  removeContenteditable(id)
  const EditedTitle =  document.querySelector(`.title-${id}`);
  const title = EditedTitle.innerText
  const EditedDescription =  document.querySelector(`.description-${id}`);
  const description = EditedDescription.innerText
  if (title.trim() === '' || description.trim() === '') {
    errorInputModal.classList.add('error-modal-open');
      setTimeout(()=>{location.reload()} , 3000);
} else {
  const requestBody = {title : title, description : description}
  const response = await fetch(`${path}/api/v1/users/requests/${id}`, {
        method : "PUT",
        body : JSON.stringify(requestBody),
        headers:{
          "content-type" : "application/json",
          Authorization: `Bearer ${checkToken()}`
        }
      }).then(res => res.json())
      .then(response => response)
        .catch(e => e)
        // making a request
const newDiv = document.createElement('div');
response.request.forEach(e => {
  newDiv.innerHTML += `<div class="request"><p contenteditable style="margin :0 ; padding : 1%; background: rgba(5, 102, 141, 0.342);">${e.title}</p>
  <p style="float : right; background-color: #A5BE00; padding: 0.4%;">${e.time}</p>
  <br>
  <p>&nbsp;<i class="fas fa-tools"></i> ${e.category}</p>
  <p style="padding : 3px;border : 1px solid green">${e.description}</p>
  <p style="margin-right: 3px;
  text-align: right;">${e.status}</p></div>`
});
 const success = document.querySelector('.success')
 success.innerHTML = `<p>success</p>`
 success.style.transform = 'translateY(0)'
 setTimeout(()=>{success.style.transform = 'translateY(-57px)'} , 3000);
}
}

function cancel(id){
  removeContenteditable(id)
}
getAllRequest();

function addContenteditable(id){
  document.querySelector(`.cancel-${id}`).style.display = 'block';
  document.querySelector(`.save-${id}`).style.display = 'block';
  let edit = document.querySelector(`.title-${id}`)
  edit.setAttribute('contenteditable' , 'true');
  edit.classList.add('edit-border');
  let editDescription = document.querySelector(`.description-${id}`)
  editDescription.setAttribute('contenteditable' , 'true');
  editDescription.classList.add('edit-border');
}

function removeContenteditable(id){
  document.querySelector(`.save-${id}`).style.display = 'none';
  document.querySelector(`.cancel-${id}`).style.display = 'none';
  let edit = document.querySelector(`.title-${id}`);
  edit.setAttribute('contenteditable' , 'false');
  edit.classList.remove('edit-border');
  let editDescription = document.querySelector(`.description-${id}`);
  editDescription.setAttribute('contenteditable' , 'false');
  editDescription.classList.remove('edit-border');
}