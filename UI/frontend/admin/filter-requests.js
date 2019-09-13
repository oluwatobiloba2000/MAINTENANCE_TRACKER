const checkToken = ()=>{
    const token = window.localStorage.getItem('admin-token')
    if(token){
      return token;
    }
    window.location.href = '../../HTML/signin.html';
  };

  let herokuAdminPath = `https://maintenance-tracky-api.herokuapp.com`;
  // let herokuAdminPath = `http://localhost:3000`;
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
            window.location.href = '../../HTML/signin.html'
        }, 3000)
      }else{
          // making a request
          response.request.forEach(requests => {
              cardBody.innerHTML += `<div class="requests"><p class="request-title">${requests.title} <span style="float: right">From ${requests.username}</span></p>
              <p class="request-time">Date : ${requests.time}</p>
              <br>
              <p>&nbsp;<i class="fas fa-tools"></i> ${requests.category}</p>
              <p class="request-description">${requests.description}</p>
              <p class="request-status"><span class="request-status-right">${requests.status}</span></p></div>`
            });
            document.getElementById('number-of-request').innerText = `${response.request.length}`;
      }
}

getAllRequest();

document.getElementById('search').addEventListener('keyup', (e)=>{
    let values = document.getElementById('search').value.trim().toUpperCase();
    let li = document.querySelectorAll('.requests');
    li.forEach((e)=>{
        let titles = e.getElementsByTagName('p')[0].innerText.toUpperCase();
        let dates = e.getElementsByTagName('p')[1].innerText.toUpperCase();
        let category = e.getElementsByTagName('p')[2].innerText.toUpperCase();
        if(titles.indexOf(values) > -1 || dates.indexOf(values) > -1 || category.indexOf(values) > -1){
            e.style.display = ''
        }
        else{
            e.style.display = 'none';
        }
    })
})