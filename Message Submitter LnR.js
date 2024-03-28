// window.location.href="./Message Submitter.html"

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const toggleFormLink = document.getElementById('toggle-form');

// Add event listeners for form submissions (login and registration)
loginForm.addEventListener('submit', handleLogin);
registerForm.addEventListener('submit', handleRegister);
registerForm.addEventListener("submit",function(event){event.preventDefault();})

// Function to handle login form submission 
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulate authentication (replace with your backend logic)
    if (username === 'Sivuyile' && password === 'password123') {
        alert('Login successful!');
        // Redirect or display success message after successful login
    } else {
        // alert('Invalid username or password!');
    }
}

// Function to handle registration form submission 
function handleRegister(event) {
    event.preventDefault();

    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    // Simulate user registration 
    // alert('Registration successful! Please login now.');

    // Clear registration form fields after successful registration
    registerForm.reset();

    // Toggle back to login form
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
}

const loginButton=document.getElementById("login-button");
loginButton.addEventListener("click",function(){window.location.href="./Message Submitter.html"})

// Toggle between login and registration forms on click
toggleFormLink.addEventListener('click', () => {
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    registerForm.style.display = registerForm.style.display === 'block' ? 'none' : 'block';
});