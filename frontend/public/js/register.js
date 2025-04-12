// Register
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const uniqueID = document.getElementById('uniqueID').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  const response = await fetch('http://192.168.101.10:3000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uniqueID, email, password })
  });

  const data = await response.json();
  if (data.success) {
    
    window.location.href = 'login.html';
  } else {
    alert(data.message);
  }
});
  