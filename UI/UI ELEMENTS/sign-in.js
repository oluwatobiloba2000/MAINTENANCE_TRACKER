const show_password = document.getElementById("show_password");
show_password.addEventListener('click', () => {
  const passwordValue = document.getElementById('password');
  // checking if the input type is password
  if (passwordValue.type === "password") {
    // if it is password , change it to text
    passwordValue.type = "text";
    // change the text content of the show_password to "HIDE"
    show_password.innerHTML = `<i class="fas fa-eye-slash"></i>`;
  } else {
    // else change it back to password
    passwordValue.type = "password";
    // change the text content of the show_password to SHOW
    show_password.innerHTML = `<i class="fas fa-eye"></i>`;
  }
});