const sessionId = Date.now().toString();

//Login/Signup
window.switchBetween = function () {
    var loginContainer = document.getElementById('login-container');
    var signupContainer = document.getElementById('signup-container');
    
    if (!loginContainer.classList.contains('hidden')) {
        loginContainer.classList.add('hidden');
        signupContainer.classList.remove('hidden');
    } else {
        loginContainer.classList.remove('hidden');
        signupContainer.classList.add('hidden');
    }
}


window.loginUser = async function () {
    const usernameInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-password');
    const username = usernameInput.value;
    const password = passwordInput.value;
    usernameInput.value = '';
    passwordInput.value = '';

    try {
        const response = await fetch('/.netlify/functions/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            const usernameGet = data.username;
            const userProfileDiv = document.getElementById('user-profile');
            const userInputValue = document.getElementById('user-id-ses');

            localStorage.setItem('username', data.username);
            alert('Successfully logged in.');
            document.getElementById('login-container').classList.add('hidden');
            document.getElementById('chat-page').classList.remove('hidden');
            userProfileDiv.innerHTML = `<h5>Welcome, ${usernameGet}!</h5>`;
            userInputValue.value = usernameGet;

            const conversationHistory = data.conversationHistory;
            if (conversationHistory && conversationHistory.length > 0) {
                const chatBox = document.getElementById('chat-box');
                chatBox.innerHTML = '';

                conversationHistory.forEach(message => {
                    const messageElement = document.createElement('div');
                    if (message.role === 'user') {
                        messageElement.classList.add('message', 'user-message');
                    } else if (message.role === 'assistant') {
                        messageElement.classList.add('message', 'bot-message');
                    }
                    messageElement.textContent = message.content;

                    let formattedContent = message.content.replace(/\n/g, '<br />');
                    formattedContent = formattedContent.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');

                    messageElement.innerHTML = formattedContent;
                    chatBox.appendChild(messageElement);
                });
            }
        } else {
            alert(data.message);
        }
        scrollToBottom();
    } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred. Please try again.');
    }
}

window.signUpUser = async function () {
    const usernameInput = document.getElementById('signup-username');
    const emailInput = document.getElementById('signup-email');
    const passwordInput = document.getElementById('signup-password');
    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    usernameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';

    try {
        const response = await fetch('.netlify/functions/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error signing up:', error);
        alert('An error occurred. Please try again.');
    }
}

let modelName = '';
    document.getElementById('model-option').addEventListener('change', function() {
        modelName = this.value;
    });

//Get the key
window.submitApiKey = async function () {
    const apiKeyInput = document.getElementById('api-key-input');
    const apiKey = apiKeyInput.value;
    const username = document.getElementById('user-id-ses').value;
    apiKeyInput.value = '';

    try {
        const response = await fetch('/.netlify/functions/api-key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({apiKey, modelName, username}),
        });

        const data = await response.json();
        if (!data.success) {
            alert('Failed to submit API key. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting API key:', error);
        alert('An error occurred. Please try again.');
    }
}

//Run the bot
window.sendMessage = async function () {
    const inputField = document.getElementById('chat-input');
    const message = inputField.value;
    inputField.value='';

    appendMessage('You', message);
    appendMessage('Chatbot', 'Generating answer...');

    try {
        const response = await fetch('/.netlify/functions/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message, username: localStorage.getItem('username')}),
        });

        const data = await response.json();
        if (response.ok) {
            const chatBox = document.getElementById('chat-box');
            const loadingMsg = chatBox.lastChild;
            chatBox.removeChild(loadingMsg);
            appendMessage('Chatbot', data.message);
        } else {
            const chatBox = document.getElementById('chat-box');
            const messages = Array.from(chatBox.children);
            // const lastUserMsg = messages.find(msg => msg.classList.contains('you'));
            // const lastBotMsg = messages.find(msg => msg.classList.contains('chatbot'));
            // if (lastUserMsg) chatBox.removeChild(lastUserMsg);
            const lastBotMsg = messages.find(msg => msg.classList.contains('bot-message') && msg.textContent.includes('Generating answer...'));
            if (lastBotMsg) chatBox.removeChild(lastBotMsg);
            alert(data.message);
        }
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Error processing your message, please try again.');

        const chatBox = document.getElementById('chat-box');
        const messages = Array.from(chatBox.children);
        const lastBotMsg = messages.find(msg => msg.classList.contains('bot-message') && msg.textContent.includes('Generating answer...'));
        if (lastBotMsg) chatBox.removeChild(lastBotMsg);
    }
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender.toLowerCase());
    if (sender === 'Chatbot') {
        msgDiv.classList.add('bot-message');
    } else {
        msgDiv.classList.add('user-message');
    }
    msgDiv.innerHTML = `${message.replace(/\n/g, '<br />')}`;
    msgDiv.innerHTML = `${message.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>')}`;
    chatBox.appendChild(msgDiv);
}

const chatInput = document.getElementById('chat-input');
chatInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

document.getElementById('chat-input').addEventListener('keydown', async function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        await sendMessage();
    }
});

function scrollToBottom() {
    const chatBox = document.getElementById('chat-box');
    chatBox.scrollTop = chatBox.scrollHeight;
}