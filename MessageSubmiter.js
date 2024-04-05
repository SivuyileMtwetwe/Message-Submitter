let currentUser = null;
document.addEventListener("DOMContentLoaded",function(){
  currentUser=localStorage.getItem("currentUser");
  if(currentUser){
    document.getElementById("current-user").textContent=currentUser;
    showPage("message-page");
    displayMessages()
  }else{
    showPage("register-page")
  };
});

function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  localStorage.setItem(username, password);
  showPage("login-page");
}

function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

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
  const timestamp = new Date().toLocaleString();
  const messageObj = {
    user: currentUser,
    message: message,
    timestamp: timestamp
  };

  let messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages.unshift(messageObj);
  localStorage.setItem("messages", JSON.stringify(messages));
  displayMessages();
}

function displayMessages() {
  const messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML = "";
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages.forEach(message => {
    const messageCard = document.createElement("div");
    messageCard.classList.add("message-card");
    messageCard.innerHTML = `
      <p><strong>${message.user}</strong> (${message.timestamp}): ${message.message}</p>
      <button onclick="deleteMessage('${message.timestamp}')">🗑️</i></button>
    `;
    messagesContainer.appendChild(messageCard);
  });
}

function deleteMessage(timestamp) {
  let messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages = messages.filter(message => message.timestamp !== timestamp);

  localStorage.setItem("messages", JSON.stringify(messages));
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
      <button onclick="deleteMessage('${message.timestamp}')">🗑️</button>
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

function storeCurrentPage(pageId){
  localStorage.setItem('currentPage',pageId);
}

function showStoredPage(){
  const currentPageId=localStorage.getItem('currentPage');
  if(currentPageId){
    showPage(currentPageId);
  }else{
    showPage("register-page");
  }
}


