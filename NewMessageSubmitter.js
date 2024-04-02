
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const messageForm = document.getElementById('message-form');
const messageList = document.getElementById('message-list');
const searchBar = document.getElementById('search');
let currentUser = null;
let messages = [];

// Load messages from local storage
loadMessages();

// Login form submission
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
});

// Register form submission
registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    register(username, password);
});

// Message form submission
messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = document.getElementById('message').value;
    sendMessage(message);
});

// Search bar functionality
searchBar.addEventListener('keyup', (event) =>{
    const searchTerm = event.target.value.toLowerCase();
})

// Filter messages based on search term
const filteredMessages = messages.filter((message) =>
    message.text.toLowerCase().includes(searchTerm) ||
    message.user.toLowerCase().includes(searchTerm)
);

// Clear message list and display filtered messages
messageList.innerHTML = '';
filteredMessages.forEach((message) => displayMessage(message));
;

// Function to login a user
function login(username, password) {
    const user = messages.find((message) => message.user === username);
    if (user && user.password === password) {
        currentUser = user;
        showMessages();
        loginForm.reset();
    } else {
        alert('Invalid username or password');
    }
}

// Function to register a new user
function register(username, password) {
    if (messages.find((message) => message.user === username)) {
        alert('Username already exists');
    } else {
        messages.push({ user, password, text: [] });
        localStorage.setItem('messages', JSON.stringify(messages));
        alert('Registration successful');
        loginForm.reset();
    }
}

// Function to send a message
function sendMessage(message) {
    if (currentUser) {
        const timestamp = new Date().toISOString();
        currentUser.text.push({ message, timestamp });
        localStorage.setItem('messages', JSON.stringify(messages));
        messageForm.reset();
        showMessages();
    } else {
        alert('Please login to submit a message');
    }
}

// Function to display messages
function showMessages() {
    messageList.innerHTML = '';
    currentUser.text.sort((a, b) => b.timestamp - a.timestamp).forEach((message) => displayMessage(message));
}

// Function to display an individual message
function displayMessage(message) {
    const messageCard = document.createElement('li');
    messageCard.classList.add('message-card');
    messageCard.innerHTML = `
        <p><b>${currentUser.user}</b> - ${message.timestamp}</p>
        <p>${message.message}</p>
        <button onclick="deleteMessage('${message.timestamp}')">Delete</button>
    `;
    messageList.appendChild(messageCard);
}

// Function to delete a message
function deleteMessage(timestamp) {
    const messageIndex = currentUser.text.findIndex((message) => message.timestamp === timestamp);
    currentUser.text.splice(messageIndex, 1);
    localStorage.setItem('messages', JSON.stringify(messages));
    showMessages();
}

// Function to load messages from local storage
function loadMessages() {
    const messagesFromStorage = localStorage.getItem('messages');
    if (messagesFromStorage) {
        messages = JSON.parse(messagesFromStorage);
    }
}

// Toggle between login and register forms
const loginLink = document.getElementById('login-link');
const registerLink = document.getElementById('register-link');

loginLink.addEventListener('click', () => {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
});

registerLink.addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});

// Check if a user is logged in on page load
window.onload = () => {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    showMessages();
  } else {
    loginForm.style.display = 'block';
  }
};

