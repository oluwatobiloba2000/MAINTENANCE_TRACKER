const checkToken = ()=>{
    const token = window.localStorage.getItem('admin-token')
    if(token){
      return token;
    }
    window.location.href = '../signin.html';
};

// let path = `https://maintenance-tracky-api.herokuapp.com`;
let path = `http://localhost:3000`;

async function getAllUsers(){
    const response = await fetch(`${path}/api/v1/admin/allusers`, {
      method : "GET",
      headers:{
        "content-type" : "application/json",
        Authorization: `Bearer ${checkToken()}`
      }
    }).then(res => res.json())
      .then(response => response)
      .catch(e => e)
      if(response === 'NO USER' || response == 'SyntaxError: Unexpected token N in JSON at position 0'){
       return console.warn("No user");
      }else{
         const userBody = document.getElementById('card');
    response.users.forEach(users => {
       userBody.innerHTML += `<div class="users">
       <img src="${users.profileimage}" title="profile picture of ${users.username}" alt="${users.username}" style="width:100%">
       <div class="container">
         <h4 class="username"><b>${users.username}</b></h4>
         <span class="user-id">${users.userid}</span>
         <p class="email">${users.email}</p>
       </div>
     </div>`
    });
    document.getElementById('number-of-request').innerText = `${response.users.length}`;
      }
}

{/* <div class="users">
       <img src="${users.profileimage}" title="profile picture of ${users.username}" alt="${users.username}">
       <span class="user-id">${users.userid}</span>
       <div class="user-text-group">
       <p class="username">${users.username}</p>
       <p class="email">${users.email}</p>
      </div>
  </div> */}


getAllUsers()