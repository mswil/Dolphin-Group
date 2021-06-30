async function signupFormHandler(event) {
    event.preventDefault()
  
    const email = document.querySelector('#username-signup').value.trim()
    const password = document.querySelector('#password-signup').value.trim()
  
    if (email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      })
  
      if (response.ok) {
        document.location.replace('/')
      } else {
        alert('Error')
      }
    }
  }
  
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler)
