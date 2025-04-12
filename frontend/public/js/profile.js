//import { io } from 'https://cdn.socket.io/4.6.0/socket.io.esm.min.js';
  // Profile
  document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'login.html';
    }
    const response = await fetch('http://192.168.101.10:3000/api/users/me', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    if(response.ok && data.user){
    document.getElementById('uniqueID').textContent = `Unique ID: ${data.user.uniqueID}`;
    document.getElementById('email').textContent = `Email: ${data.user.email}`;
    }
    
    if(response.ok && data.friends){
      const friends = data.friends;
      console.log(friends);
      const friendsList = document.getElementById('friendsList');
      friends.forEach(friend => {
        const friendEmail=friend.email;
        console.log(friendEmail,"friendEmail");
        const li = document.createElement('li');
        //const link = document.createElement('a');
        // link.href = `mailto:${friendEmail}`;
        li.textContent=friendEmail;
        //li.appendChild(link);
        friendsList.appendChild(li);
     
        // Add click event to initiate chat with the friend
       li.addEventListener('click', () => {
        document.getElementById('chatWith').textContent = `Chatting with: ${friendEmail}`;
        document.getElementById('chatInput').dataset.recipient = friendEmail;
        loadChatHistory(friendEmail);
      });
    });
      // Load chat history
      async function loadChatHistory(friendEmail) {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://192.168.101.10:3000/api/chats/${friendEmail}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok && data.chats) {
          const chatArea = document.getElementById('chatArea');
          chatArea.value = '';
          data.chats.forEach(chat => {
            chatArea.value += `${chat.sender}: ${chat.message}\n`;
          });
        }
      }
    }
    
    const userEmail = data.user.email;
  const socket = io('http://192.168.101.10:3000', {
    query: { userEmail }
  });
  

    // Handle sending messages
  document.getElementById('sendMessageButton').addEventListener('click', () => {
    const message = document.getElementById('chatInput').value;
    const recipient = document.getElementById('chatInput').dataset.recipient;
    socket.emit('sendMessage', { message, recipient });
    document.getElementById('chatInput').value = '';
  });

  // Handle receiving messages
  socket.on('receiveMessage', (message) => {
    if(message.recipient===userEmail||message.sender===userEmail){
    const chatArea = document.getElementById('chatArea');
    chatArea.value += `${message.sender}: ${message.message}\n`;
    }
  });

  });



  //search friend
document.getElementById('searchButton').addEventListener('click', async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  const uniqueID = document.getElementById('searchUniqueID').value;
  // Ensure the input is not empty
  if (!uniqueID.trim()) {
      alert('Please enter a Unique ID');
      return;
  }
  try {
      // Send request to backend to check if the unique ID exists
      const response = await fetch('http://192.168.101.10:3000/api/check/check-unique-id', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ uniqueID }),
      });
      const data = await response.json();
      console.log(data);
      // If the ID exists, show the Add and Cancel buttons
      if (response.ok && data.success) {
          displayButtons();
      } else {
          alert('Unique ID not found');
      }
  } catch (error) {
      console.error('Error checking Unique ID:', error);
      alert('An error occurred while checking the Unique ID.');
  }
});

function displayButtons() {
  // Create Add button
  const addButton = document.createElement('button');
  addButton.textContent = 'Add';
  addButton.id = 'addButton';
  // Create Cancel button
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.id = 'cancelButton';

  const button=document.getElementById("searchButton");
  button.disabled=true;

  // Add buttons to the DOM
  const buttonContainer = document.getElementById('buttonContainer');
  buttonContainer.appendChild(addButton);
  buttonContainer.appendChild(cancelButton);
  // Add event listener for Cancel button
  cancelButton.addEventListener('click', () => {
      addButton.remove();
      cancelButton.remove();
      const button=document.getElementById("searchButton");
      button.disabled=false;
  });

  // Add event listener for Add button
  addButton.addEventListener('click', async () => {
    const token = localStorage.getItem('token');
      try {
          // Send request to backend to add the friend
          const uniqueID = document.getElementById('searchUniqueID').value;
          const response = await fetch('http://192.168.101.10:3000/api/add/add-friend', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({ uniqueID }),
          });
          const data = await response.json();
          if (response.ok) {
              alert('Friend added successfully;)');
          } else {
              alert(data.message || 'An error occurred while adding the friend');
          }
          addButton.remove();
          cancelButton.remove();
          
      } catch (error) {
          console.error('Error adding friend:', error);
          alert('An error occurred while adding the friend');
      }
  });
}



  // Logout
  document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  });
 