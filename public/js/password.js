const togglePassword = document.querySelector('#toggle-password');
  const password = document.querySelector('#password-login');

  togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});

//source: https://www.csestack.org/hide-show-password-eye-icon-html-javascript/