const loginFormHandler = async function (event) {
  event.preventDefault();
  const email = document.querySelector('#username-input-login');
  const password = document.querySelector('#password-input-login');
  const formData = {
    email: email.value.trim(),
    password: password.value.trim(),
  };

  const loginRequest = new Request('/user/login', {
    method: 'post',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // console.log(loginRequest);
  fetch(loginRequest)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error(
          'Bork! Bork! Doggo Detects an Error: ' + response.status
        );
      } else {
        document.location.replace('/');
      }
    })
    .catch((err) => console.log(err));
};

document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);
