let backgroundLoader = document.querySelector('.loader-back');
let backgroungLoderH1 = document.querySelector('.background-loader-h1')
const checkUserToken = () => {
    const token = window.localStorage.getItem('user-token')
    if (token) {
        return token;
    }
    window.location.href = '../signin.html';
};

const currentUserId = window.localStorage.getItem('userId');
const profileContainer = document.querySelector('.profile-container');

let apipath = `https://maintenance-tracky-api.herokuapp.com`;
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
        <fieldset>
          <legend for="file">Upload your profile picture</legend>
           <input name="file" class="file" onClick="savePics(${response[0].userid})"  accept="image/*" type="file" id="fileinput-${response[0].userid}">
        </fieldset>
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

function savePics(id) {
    document.getElementById(`fileinput-${id}`).addEventListener('change', (e) => {
        backgroundLoader.classList.add('background-loader');
        document.getElementById("loader").style.display = "block";
        backgroungLoderH1.style.display = 'block';
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/oluwatobby/image/upload';
        const CLOUDINARY_UPLOAD_PRESET = 'ua76zl29';
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        fetch(CLOUDINARY_URL, {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then((data) => {
                if (data.secure_url !== '') {
                    const uploadedFileUrl = data.secure_url;
                    localStorage.setItem('profileImage', uploadedFileUrl);
                    backgroungLoderH1.innerHTML = `IMAGE PROCESSED SUCCESSFULLY AND READY FOR UPDATE <i class="fas fa-check-double"></i></p>`
                    setTimeout(() => {
                        backgroundLoader.classList.remove('background-loader');
                        document.getElementById("loader").style.display = "none";
                        backgroungLoderH1.innerHTML = `IMAGE PROCESSING PLEASE WAIT ......`
                        backgroungLoderH1.style.display = 'none'
                    }, 2000)
                } else {
                    console.warn('Something went wrong');
                    backgroundLoader.classList.remove('background-loader');
                    document.getElementById("loader").style.display = "none";
                    backgroungLoderH1.style.display = 'none'
                }
            })
            .catch(err => console.error(err));
    }, false);
}


async function updateProfile(id) {
    const imageLink = localStorage.getItem('profileImage')
    const profileEmail = document.querySelector(`.email-${id}`)
    const emailValue = profileEmail.innerText;
    if (emailValue.length <= 11) {
        return document.querySelector('.email-validation').style.visibility = 'visible';
    }
    const body = {
        email: emailValue,
        profileimage: imageLink
    }
    backgroundLoader.classList.add('background-loader');
    document.getElementById("loader").style.display = "block";
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
        backgroundLoader.classList.remove('background-loader');
        document.getElementById("loader").style.display = "none";
        backgroungLoderH1.style.display = 'none'
        localStorage.removeItem('profileImage');
        window.location.href = `../user/profile.html`
    }
}

function noloader() {
    backgroundLoader.classList.remove('background-loader');
    document.getElementById("loader").style.display = "none";
    backgroungLoderH1.style.display = 'none'
}
noloader()