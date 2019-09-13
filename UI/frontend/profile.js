const checkUserToken = () => {
  const token = window.localStorage.getItem('user-token')
  if (token) {
    return token;
  }
  window.location.href = '../signin.html';
};

const currentUserId = window.localStorage.getItem('userId');
const profilePicsDiv = document.querySelector('.profile-pics-container');
const mobileProfilePics = document.querySelector('.username-update');
const currentUsername = window.localStorage.getItem('user-name');

// let path = `https://maintenance-tracky-api.herokuapp.com`;
let apipath = `http://localhost:3000`;

async function profilepicsofcurrentuser() {
  const response = await fetch(`${apipath}/api/v1/user/${currentUserId}/profile`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${checkUserToken()}`
      }
    })
    .then(response => response)
    .then(res => res.json())
    .catch(e => console.log(e))
  document.getElementById('username-update').innerText = `${currentUsername}`
  profilePicsDiv.innerHTML = `<img src="${response[0].profileimage}" onClick="profileRedirect()" class="profile-pics" alt=""><button onClick="profile(${response[0].userid})" class="profile-btn">View profile</button>`
  mobileProfilePics.innerHTML = `<img src="${response[0].profileimage}" onClick="profileRedirect()" class="profile-pics-mobile" alt="">`

}

profilepicsofcurrentuser();

function profileRedirect() {
  window.location.href = '../user/profile.html';
}

function profile(id) {
  window.location.href = '../user/profile.html';
}