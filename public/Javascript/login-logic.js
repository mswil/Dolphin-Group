const loginFormHandler = async function (event) {
  event.preventDefault();
  const email = document.querySelector('#username-input-login');
  const password = document.querySelector('#password-input-login');
  const formData = {
    email: email.value,
    password: password.value,
  };

  const loginRequest = new Request('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(formData),
  });
  console.log(loginRequest);
  fetch(loginRequest)
    //   CRUD('POST', '/login', formData)
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
