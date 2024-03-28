const messageForm = document.getElementById("message-form")

window.addEventListener("load",function(){
    loadMessages();
});

messageForm.addEventListener("submit",function(e){
    e.preventDefault();

    const name= document.getElementById("name").value;
    const message= document.getElementById("message").value;

    const newMessage= {
        deleteItem:this.removeChild,
        name:name,
        message:message,
        timestamp:new Date().toLocaleString()
    };

    saveMessage(newMessage);

    document.getElementById("name").value="";
    document.getElementById("message").value="";


    loadMessages()
});
function deleteItem(){

  const deleteItem = card.removeChild(messageContainer)

}
document.getElementById("search").addEventListener("input",function(){searchMessage()})
function searchMessage(){
    const searchInput=document.getElementById("search").value.toLowerCase();
    const messageCard= document.getElementsByClassName("message-card")

    for(let i=0; i<messageCard.length; i++){
        const card=messageCard[i];
        const name= card.querySelector("h3").textContent.toLowerCase();

        if(name.includes(searchInput)||message.includes(searchInput)){
            card.style.display= "block";
        
        }else{
            card.style.display="none"
        }
    }
}
function saveMessage(message){
    let messages = localStorage.getItem("messages");

    if(messages){
        messages=JSON.parse(messages);
    } else{
        messages=[];
    }

    messages.unshift(message);
    localStorage.setItem("messages",JSON.stringify(messages))
}

function loadMessages(){
    const messageContainer=document.getElementById("message-container");
    messageContainer.innerHTML="";
    

    let messages= localStorage.getItem("messages");

    if(messages){
        messages=JSON.parse(messages)
        
    

    messages.forEach(function(message){
        const card = document.createElement("div");
        card.classList.add("message-card");
        
        




        const name = document.createElement("h3")
        name.textContent=message.name;
        card.appendChild(name);

        messageContainer.appendChild(card);
        


        const messageText=document.createElement("p");
        messageText.textContent=message.message;
        card.appendChild(messageText);


        const timestamp= document.createElement("h6");
        timestamp.textContent="Sent at:" + message.timestamp;
        card.appendChild(timestamp)

        

        const deleteButton=document.createElement("button");
        deleteButton.textContent="Delete";
        deleteButton.addEventListener("click",function(){
            deleteMessage(message);
            card.parentNode.removeChild(card)
        })
        card.appendChild(deleteButton);
    });
}
}

function deleteMessage(message){
    let messages=localStorage.getItem("messages");
    messages=JSON.parse(messages);

    const newMessages=messages.filter((m)=>m.timestamp!==message.timestamp);
    localStorage.setItem("messages",JSON.stringify(newMessages));
}