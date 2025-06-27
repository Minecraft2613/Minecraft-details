
  function toggleLogin() {
    const checkbox = document.getElementById('agreeCheck');
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.disabled = !checkbox.checked;
  }
