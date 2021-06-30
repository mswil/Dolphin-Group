async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#username-input-login').value.trim();
  const password = document.querySelector('#password-input-login').value.trim();

  if (email && password) {
    const response = await fetch('/user/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const responseBody = await response.json();
    if (response.ok) {
      document.location.replace('/');
    } else if (responseBody?.message) {
      alert(responseBody.message);
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);
