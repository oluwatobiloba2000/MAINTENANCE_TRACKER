// INPUT ERROR MODAL STARTS
const errorInputModal = document.querySelector('.errormodal');
const closeModal = document.querySelector('.close-error-modal').addEventListener('click', () => {
  errorInputModal.classList.remove('error-modal-open');
});

// INPUT ERROR MODAL ENDS
const navbarMobile = document.querySelector('.close-nav-mobile');

document.querySelector('#bars-icon').addEventListener('click', () => {
  navbarMobile.classList.toggle('open-nav');
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("request-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> close the modal
span.onclick = function () {
  modal.style.display = "none";
  errorInputModal.classList.remove('error-modal-open');
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    errorInputModal.classList.remove('error-modal-open');
  }
}

const submitForm = document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  //getting the inputs form the user
  let title = document.getElementById("title").value;
  let postCategory = document.querySelector('[name=category]').value;
  let postDescription = document.getElementById("description").value;
  let date = new Date();
  if (title.trim() === '' || postDescription.trim() === '') {
    errorInputModal.classList.add('error-modal-open');
  } else {
    // making a request
    const cardBody = document.querySelector("#card");
    newDiv = document.createElement("div");
    newDiv.innerHTML = `<p style="margin :0 ;
      padding : 1%;
      background: rgba(5, 102, 141, 0.342);
      ">${title}</p>
      <p style="float : right; background-color: #A5BE00; padding: 0.4%;">${date}</p>
      <br>
      <p>&nbsp;<i class="fas fa-tools"></i> ${postCategory}</p>
      <p style="padding : 3px;border : 1px solid green">${postDescription}</p>
      <p style="margin-right: 3px;
      text-align: right;">pending</p>`
    newDiv.classList.add("requests");
    cardBody.insertAdjacentElement('beforebegin', newDiv);

    // cleared the user inputs
    document.getElementById("form").reset();

    modal.style.display = "none";
    errorInputModal.classList.remove('error-modal-open');
  }
});