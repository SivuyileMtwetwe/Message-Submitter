let currentUser = null;

function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Save username and password to local storage
  localStorage.setItem(username, password);

  // Show login page
  showPage("login-page");
}

function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  // Check if username exists and password matches
  if (localStorage.getItem(username) === password) {
    currentUser = username;
    document.getElementById("current-user").textContent = currentUser;
    showPage("message-page");
    displayMessages();
  } else {
    alert("Invalid username or password");
  }
}

function logout() {
  currentUser = null;
  showPage("login-page");
}

function submitMessage() {
  const message = document.getElementById("message-input").value;

  // Get current timestamp
  const timestamp = new Date().toLocaleString();

  // Create message object
  const messageObj = {
    user: currentUser,
    message: message,
    timestamp: timestamp
  };

  // Retrieve existing messages from local storage
  let messages = JSON.parse(localStorage.getItem("messages")) || [];

  // Add new message to the beginning of the array
  messages.unshift(messageObj);

  // Save updated messages to local storage
  localStorage.setItem("messages", JSON.stringify(messages));

  // Display updated messages
  displayMessages();
}

function displayMessages() {
  const messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML = "";

  // Retrieve messages from local storage
  const messages = JSON.parse(localStorage.getItem("messages")) || [];

  // Display each message
  messages.forEach(message => {
    const messageCard = document.createElement("div");
    messageCard.classList.add("message-card");
    messageCard.innerHTML = `
      <p><strong>${message.user}</strong> (${message.timestamp}): ${message.message}</p>
      <button onclick="deleteMessage('${message.timestamp}')"><i class="fa-solid fa-trash"></i></button>
    `;
    messagesContainer.appendChild(messageCard);
  });
}

function deleteMessage(timestamp) {
  // Retrieve messages from local storage
  let messages = JSON.parse(localStorage.getItem("messages")) || [];

  // Filter out the message with the provided timestamp
  messages = messages.filter(message => message.timestamp !== timestamp);

  // Save updated messages to local storage
  localStorage.setItem("messages", JSON.stringify(messages));

  // Display updated messages
  displayMessages();
}

function search() {
  const query = document.getElementById("search").value.toLowerCase();
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  const filteredMessages = messages.filter(message => message.message.toLowerCase().includes(query));
  const messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML = "";

  filteredMessages.forEach(message => {
    const messageCard = document.createElement("div");
    messageCard.classList.add("message-card");
    messageCard.innerHTML = `
      <p><strong>${message.user}</strong> (${message.timestamp}): ${message.message}</p>
      <button onclick="deleteMessage('${message.timestamp}')">Delete</button>
    `;
    messagesContainer.appendChild(messageCard);
  });
}

function showPage(pageId) {
  const pages = document.getElementsByClassName("page");
  for (let i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }
  document.getElementById(pageId).style.display = "block";
  localStorage.setItem("currentPage",pageId);
}
document.addEventListener("DOMContentLoaded", function() {
  const currentPage=localStorage.getItem("currentPage");
  showPage(currentPage?currentPage:"register-page");
});

function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Save username and password to local storage
  localStorage.setItem(username, password);
  storeCurrentPage("login-page");

  // Show login page
  showPage("login-page");
}

function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  // Check if username exists and password matches
  if (localStorage.getItem(username) === password) {
    currentUser = username;
    localStorage.setItem("currentUser",currentUser);
    document.getElementById("current-user").textContent = currentUser;
    showPage("message-page")
    displayMessages();
  } else {
    alert("Invalid username or password");
  }
}

function logout() {
  currentUser = null;
  showPage("login-page");
}

function submitMessage() {
  const message = document.getElementById("message-input").value;

  // Get current timestamp
  const timestamp = new Date().toLocaleString();

  // Create message object
  const messageObj = {
    user: currentUser,
    message: message,
    timestamp: timestamp
  };

  // Retrieve existing messages from local storage
  let messages = JSON.parse(localStorage.getItem("messages")) || [];

  // Add new message to the beginning of the array
  messages.unshift(messageObj);

  // Save updated messages to local storage
  localStorage.setItem("messages", JSON.stringify(messages));

  // Display updated messages
  displayMessages();
}

function displayMessages() {
  const messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML = "";

  // Retrieve messages from local storage
  const messages = JSON.parse(localStorage.getItem("messages")) || [];

  // Display each message
  messages.forEach(message => {
    const messageCard = document.createElement("div");
    messageCard.classList.add("message-card");
    messageCard.innerHTML = `
      <p><strong>${message.user}</strong> (${message.timestamp}): ${message.message}</p>
      <button onclick="deleteMessage('${message.timestamp}')"><i class="fa-solid fa-trash"></i></button>
    `;
    messagesContainer.appendChild(messageCard);
  });
}

function deleteMessage(timestamp) {
  // Retrieve messages from local storage
  let messages = JSON.parse(localStorage.getItem("messages")) || [];

  // Filter out the message with the provided timestamp
  messages = messages.filter(message => message.timestamp !== timestamp);

  // Save updated messages to local storage
  localStorage.setItem("messages", JSON.stringify(messages));

  // Display updated messages
  displayMessages();
}

function search() {
  const query = document.getElementById("search").value.toLowerCase();
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  const filteredMessages = messages.filter(message => message.message.toLowerCase().includes(query));
  const messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML = "";

  filteredMessages.forEach(message => {
    const messageCard = document.createElement("div");
    messageCard.classList.add("message-card");
    messageCard.innerHTML = `
      <p><strong>${message.user}</strong<br><br>> </p>(${message.timestamp}): ${message.message}
      <button onclick="deleteMessage('${message.timestamp}')">Delete</button>
    `;
    messagesContainer.appendChild(messageCard);
  });
}

function showPage(pageId) {
  const pages = document.getElementsByClassName("page");
  for (let i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }
  document.getElementById(pageId).style.display = "block";
}

function storeCurrentPage(pageId){
  sessionStorage.setItem('currentPage',pageId);
}

function showStoredPage(){
  const currentPageId=sessionStorage.getItem('currentPage');
  if(currentPageId){
    showPage(currentPageId);
  }else{
    showPage("register-page");
  }
}

document.addEventListener("DOMContentLoaded",function(){
  currentUser=localStorage.getItem("currentUser");
  if(currentUser){
    document.getElementById("current-user").textContent=currentUser;
    showPage("message-page");
    displayMessages()
  }
});










// // Store the current page in session storage
// window.addEventListener("beforeunload",function(){
//   const currentPageId=this.document.querySelector(".page[style='display: block']").id;
//   sessionStorage.setItem("currentPage",currentPageId);
// })
// sessionStorage.setItem("currentPage",pageId);

// document.addEventListener("DOMContentLoaded",function(){
//   const storedPage=sessionStorage.getItem("currentPage");
//   if(storedPage){
//     showPage(storedPage);
//   }else{
//     showPage("register-page")
//   }
// })