const checkToken = ()=>{
    const token = window.localStorage.getItem('user-token')
    if(token){
      return token;
    }
    window.location.href = '../signin.html';
};

// let path = `https://maintenance-tracky-api.herokuapp.com`;
let path = `http://localhost:3000`;

const userId = window.localStorage.getItem('userId');
const userName = window.localStorage.getItem('user-name')

async function getAllPendingRequest(){
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
      let pendingRequest = response.request.filter((e)=>{
        return e.status == "pending"
      })
      if(response.length == 0){
          console.log("empty")
        document.querySelector('.grey-text').classList.add('grey-text-show');
      }else if(response["message"] === 'jwt expired'){
        errorInputModalGreen.classList.add("error-modal-open");
        setTimeout(()=>{
            window.location.href = '../signin.html'
        }, 3000)
      }else if(response.length !== 0){
        //   filter approved request
    pendingRequest.forEach(requests => {
       cardBody.innerHTML +=`<div class="requests"><p style="margin :0 ; padding : 1%; background: rgba(5, 102, 141, 0.342);">${requests.title}</p>
      <p style="float : right; background-color: #A5BE00; padding: 0.4%;">${requests.time}</p>
      <br>
      <p>&nbsp;<i class="fas fa-tools"></i> ${requests.category}</p>
      <p style="padding : 3px;border : 1px solid green">${requests.description}</p>
      <p style="margin-right: 3px;
      text-align: right;"><span class="request-status-right">${requests.status}</span></div>`
    });
    document.getElementById('number-of-request').innerText = `${pendingRequest.length}`;
}}

getAllPendingRequest();