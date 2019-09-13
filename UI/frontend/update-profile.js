const checkUserToken = () => {
    const token = window.localStorage.getItem('user-token')
    if (token) {
        return token;
    }
    window.location.href = '../signin.html';
};

const currentUserId = window.localStorage.getItem('userId');
const profileContainer = document.querySelector('.profile-container');

let path = `https://maintenance-tracky-api.herokuapp.com`;
// let apipath = `http://localhost:3000`;
const username = window.localStorage.getItem('user-name');

async function currentUserProfile() {
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
    document.querySelector('#username-update').textContent = `${username}`;
    profileContainer.innerHTML = `
        <div class="profile-details">
        <img src="${response[0].profileimage}" title="Profile picture of ${response[0].username}" class="big-profile-pics" alt="Your link or network error might be the cause, Please check your image link or try refreshing your browser">
       </div>
       <p class="profile-display">Profile Image Url</p>
        <p contenteditable="true" spellcheck="false" class="profile-content link image-link-${response[0].userid}">${response[0].profileimage}</p>

        <p class="profile-display">Username</p>
        <p contenteditable="false" class="profile-content username-profile">${response[0].username}</p>
        <p class="profile-display">Email</p>
        <p contenteditable="true" class="profile-content email-${response[0].userid}">${response[0].email}</p>
        <p class="email-validation">Email too short</p>
       <div class="btn-group">
        <button class="profile-btn-big update-button" onClick="updateProfile(${response[0].userid})">Update</button>
        <button onClick="goback()" class="profile-btn-big cancel-button">Home</button>
    </div>
    </div>
        `
    // window.localStorage.removeItem('user-name')
    window.localStorage.setItem('user-name', response[0].username)
}

currentUserProfile()

function goback() {
    window.location.href = '../user/user-index.html'
}

async function updateProfile(id) {
    const imageLink = document.querySelector(`.image-link-${id}`)
    const imageLinkValue = imageLink.innerText
    const profileEmail = document.querySelector(`.email-${id}`)
    const emailValue = profileEmail.innerText;
    if(emailValue.length <= 11){
       return document.querySelector('.email-validation').style.visibility = 'visible';
    }
    const body = {
        email: emailValue,
        profileimage: imageLinkValue
    }
    const response = await fetch(`${apipath}/api/v1/user/${currentUserId}/update`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${checkUserToken()}`
            }
        }).then(res => res.json())
        .then(response => response)
        .catch(e => e)

    if (response === 'profile not found') {
        return console.log("ERROR");
    } else {
        window.location.href = `../user/profile.html`
    }
}