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
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("request-btn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

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
