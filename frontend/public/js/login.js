// Login

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const response = await fetch('http://192.168.101.10:3000/api/auth/login', {   // here ip for server at 0.0.0.0 and localhost for server at localhost
      method: 'POST',  
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      window.location.href = 'index.html';
    } else {
      alert('Invalid credentials');
    }
  });
