const chatInput = document.querySelector(".input textarea");
const sendChatBtn = document.querySelector(".input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;
  const API_KEY = "sk-sAbf_1Xcimzv0Jfv-wkugj75qiBdOGss5uf03PVMm-T3BlbkFJCzA_LkT6Aj6NhL-EfCh8mENKd-ruJ69sMC175lhukA";

const createChatUl = (message , className) => {
    //create a chat <ul> element w passed a msg and className
    const ChatUl = document.createElement("ul");
    ChatUl.classList.add("Chat" , className);
    let ChatContent = className === "outgoing" ? `<p> ${message} </p>` : `<span class="material-symbols-outlined">smart_toy</span><p> ${message} </p>`;
    ChatUl.innerHTML = ChatContent;
    return ChatUl;
}

    const generateResponse = (incomingChatUl) =>{
        const API_URL = "https://api.openai.com/v1/chat/completions";
        const messageElement =  incomingChatUl.querySelector("p");
 
        const requestOptions = {
            method : "POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer${API_KEY}`
            },
            body: JSON.stringify({
                model:"gpt-4o-mini",
                message:[{role: "user", content:userMessage}]
            })
            
        }
    }
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content
    }).catch((error) => {
        messageElement.textContent = "Oops! Something went wrong. please try again later";

    })
     

    const HandleChat = () =>{
    userMessage = chatInput.value.trim();
    if (!userMessage)return ;

 //append the users message to the chatbox
    chatbox.appendChild(createChatUl(userMessage, "outgoing"));

    setTimeout(()=> {
        //display msg while waiting or response
    
    const incomingChatUl = createChatUl("Thinking...", "incoming")
    chatbox.appendChild(incomingChatUl);

    generateResponse(incomingChatUl);
               
    }, 600);
}

sendChatBtn.addEventListener("click", HandleChat);