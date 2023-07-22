const registerButton = document.getElementById('registerButton');
const loginButton = document.getElementById('loginButton');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

registerButton.addEventListener('click', () => {
  registerForm.style.display = 'block';
  loginForm.style.display = 'none';
});

loginButton.addEventListener('click', () => {
  loginForm.style.display = 'block';
  registerForm.style.display = 'none';
});

document.getElementById('registerSubmit').addEventListener('click', async () => {
  const username = document.getElementById('regUsername').value;
  const password = document.getElementById('regPassword').value;

  const response = await fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  if (response.ok) {
    location.href = '/index.html';
  } else {
    alert('Ошибка при регистрации');
  }
});

document.getElementById('loginSubmit').addEventListener('click', async () => {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  if (response.ok) {
    location.href = '/index.html';
  } else {
    alert('Ошибка при авторизации');
  }
});