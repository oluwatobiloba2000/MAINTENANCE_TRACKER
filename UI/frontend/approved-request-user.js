const checkToken = ()=>{
    const token = window.localStorage.getItem('user-token')
    if(token){
      return token;
    }
    window.location.href = '../HTML/signin.html';
};

async function getAllApprovedRequest(){
    const response = await fetch(`https://tracky-maintenance-app.herokuapp.com/api/v1/users/requests`, {
      method : "GET",
      headers:{
        "content-type" : "application/json",
        Authorization: `Bearer ${checkToken()}`
      }
    }).then(res => res.json())
      .then(response => response)
      .catch(e => e)
      let cardBody = document.querySelector("#card");
      let approvedRequest = response.request.filter((e)=>{
        return e.status == "Approved"
      })
      if(response["message"] === 'jwt expired'){
        errorInputModalGreen.classList.add("error-modal-open");
        setTimeout(()=>{
            window.location.href = '../HTML/signin.html'
        }, 3000)
      }else if(response.length !== 0){
        //   filter approved request
    approvedRequest.forEach(requests => {
       cardBody.innerHTML += `<div class="requests"><p class="request-title">${requests.title}</p>
      <p class="request-time">Date : ${requests.time}</p>
      <br>
      <p>&nbsp;<i class="fas fa-tools"></i> ${requests.category}</p>
      <p class="request-description">${requests.description}</p>
      <p class="request-status">${requests.status}</p></div>`
    });

    document.getElementById('number-of-request').innerText = `${approvedRequest.length}`;
}}

getAllApprovedRequest();