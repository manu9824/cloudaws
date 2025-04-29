// Gemini API configuration
const API_KEY = 'AIzaSyAK8obivhQ8T9mF-dGC-SnaZ7GutGQF4e0';
const MODEL = 'gemini-2.0-flash';

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.createElement('button');
sendBtn.id = 'sendBtn';
sendBtn.className = 'glow-button';
sendBtn.textContent = 'Send';
document.querySelector('.button-group').appendChild(sendBtn);

// Add floating ghost effect
function addGhostlyEffects() {
    // Create a fixed number of ghostly lights
    const numLights = 6; // Fixed number of lights
    
    for (let i = 0; i < numLights; i++) {
        const light = document.createElement('div');
        light.className = 'ghostly-light';
        light.style.position = 'fixed';
        light.style.width = (i % 3 + 1) * 30 + 'px'; // Varied sizes but predictable
        light.style.height = light.style.width;
        light.style.background = 'radial-gradient(circle, rgba(161, 129, 103, 0.3) 0%, rgba(0, 0, 0, 0) 70%)';
        light.style.borderRadius = '50%';
        light.style.pointerEvents = 'none';
        light.style.opacity = '0.4';
        light.style.zIndex = '0';
        light.style.boxShadow = '0 0 15px rgba(161, 129, 103, 0.4)';
        
        // Distribute lights evenly across the viewport
        const section = i % 3; // 0, 1, or 2 (left, center, right)
        const row = Math.floor(i / 3); // 0 or 1 (top, bottom)
        
        const sectionWidth = window.innerWidth / 3;
        const sectionHeight = window.innerHeight / 2;
        
        const baseX = sectionWidth * section + sectionWidth * 0.5;
        const baseY = sectionHeight * row + sectionHeight * 0.5;
        
        // Add some randomness to position but keep it within its section
        const x = baseX + (Math.random() - 0.5) * sectionWidth * 0.5;
        const y = baseY + (Math.random() - 0.5) * sectionHeight * 0.5;
        
        light.style.left = x + 'px';
        light.style.top = y + 'px';
        
        document.body.appendChild(light);
        
        // Start animation immediately
        light.style.transition = 'all 4s linear';
        moveGhostlyLight(light);
    }
}

function moveGhostlyLight(light) {
    // Get current position
    const currentX = parseInt(light.style.left);
    const currentY = parseInt(light.style.top);
    
    // Calculate movement within viewport boundaries with a 50px margin
    const margin = 50;
    const maxX = window.innerWidth - margin;
    const maxY = window.innerHeight - margin;
    
    // Calculate next position with boundaries
    let nextX = currentX + (Math.random() - 0.5) * 200;
    let nextY = currentY + (Math.random() - 0.5) * 200;
    
    // Keep within bounds
    nextX = Math.max(margin, Math.min(nextX, maxX));
    nextY = Math.max(margin, Math.min(nextY, maxY));
    
    // Move the light
    light.style.transform = `translate(${nextX - currentX}px, ${nextY - currentY}px)`;
    
    // Update glow intensity
    light.style.boxShadow = `0 0 ${Math.floor(Math.random() * 20 + 10)}px rgba(161, 129, 103, ${Math.random() * 0.3 + 0.3})`;
    
    // Update position after transition
    setTimeout(() => {
        light.style.left = nextX + 'px';
        light.style.top = nextY + 'px';
        light.style.transform = 'translate(0, 0)';
        
        // Continue movement in a loop
        moveGhostlyLight(light);
    }, 4000);
}

// Add fixed background dust particles
function addDustParticles() {
    const numParticles = 40; // Fixed number of particles
    
    for (let i = 0; i < numParticles; i++) {
        const dust = document.createElement('div');
        dust.className = 'dust-particle';
        dust.style.position = 'fixed';
        dust.style.width = Math.floor(Math.random() * 3 + 1) + 'px';
        dust.style.height = dust.style.width;
        dust.style.background = `rgba(${161 + Math.random() * 20}, ${129 + Math.random() * 20}, ${103 + Math.random() * 20}, ${Math.random() * 0.3 + 0.15})`;
        dust.style.borderRadius = '50%';
        dust.style.pointerEvents = 'none';
        dust.style.zIndex = '0';
        
        // Distribute particles evenly across the width
        const section = i % 10; // 0-9 for horizontal distribution
        const verticalOffset = i / 10; // For vertical distribution
        
        const sectionWidth = window.innerWidth / 10;
        const baseX = sectionWidth * section + (Math.random() * sectionWidth * 0.8);
        
        dust.style.left = baseX + 'px';
        dust.style.top = (verticalOffset * window.innerHeight / 4) + 'px';
        
        // Fixed animation with staggered delays
        const delay = i * 0.5; // Stagger the animations
        dust.style.animation = `floatDust 30s linear ${delay}s infinite`;
        
        document.body.appendChild(dust);
    }
}

// Add CSS for dust animation with fixed parameters
const dustStyle = document.createElement('style');
dustStyle.textContent = `
    @keyframes floatDust {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
        }
        25% {
            transform: translateY(-25vh) translateX(-20px);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-50vh) translateX(-30px);
            opacity: 0.2;
        }
        75% {
            transform: translateY(-75vh) translateX(-40px);
            opacity: 0.1;
        }
        100% {
            transform: translateY(-100vh) translateX(-50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(dustStyle);

// Initialize ghostly effects once, don't call recursively
setTimeout(addGhostlyEffects, 1000);
setTimeout(addDustParticles, 1500);

// Message handling
function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <span class="message-icon">${isUser ? '👤' : '👻'}</span>
            <p>${content}</p>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add fade-in animation
    messageDiv.style.opacity = '0';
    setTimeout(() => messageDiv.style.opacity = '1', 10);
    
    // Add subtle shadow animation to AI messages
    if (!isUser) {
        setTimeout(() => {
            const glow = document.createElement('div');
            glow.className = 'message-glow';
            glow.style.position = 'absolute';
            glow.style.width = '100%';
            glow.style.height = '100%';
            glow.style.top = '0';
            glow.style.left = '0';
            glow.style.background = 'radial-gradient(circle at center, rgba(161, 129, 103, 0.25), transparent 70%)';
            glow.style.borderRadius = '4px';
            glow.style.opacity = '0';
            glow.style.transition = 'opacity 2s ease-in-out';
            glow.style.zIndex = '0';
            
            messageDiv.style.position = 'relative';
            messageDiv.insertBefore(glow, messageDiv.firstChild);
            
            setTimeout(() => {
                glow.style.opacity = '1';
                
                // Pulse effect
                setInterval(() => {
                    glow.style.opacity = (parseFloat(glow.style.opacity) === 1) ? '0.5' : '1';
                }, 2500);
            }, 300);
        }, 500);
    }
}

// Gemini API interaction
async function generateGeminiResponse(prompt, context = '') {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `${context}\n\n${prompt}`
                    }]
                }]
            })
        });

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error:', error);
        return 'I apologize, but I encountered an error. Please try again.';
    }
}

// Chat history to maintain context
let chatHistory = [];

// Function to determine the type of user input and generate appropriate response
async function handleUserInput(userMessage) {
    // Add user message to chat history
    chatHistory.push({ role: 'user', content: userMessage });
    
    // Keep chat history focused on recent context (last 10 messages)
    if (chatHistory.length > 10) {
        chatHistory = chatHistory.slice(-10);
    }

    // Create context from chat history
    const context = chatHistory
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');

    // Generate dynamic prompt based on conversation context
    const prompt = `You are a knowledgeable and mysterious ghost story expert. Based on our conversation so far, provide an engaging response that matches the user's intent. If they share a story, analyze it. If they ask a question, answer with folklore context. If they want a story, create an atmospheric tale. Keep the supernatural theme while being conversational.\n\nConversation history:\n${context}\n\nUser's latest message: ${userMessage}`;

    const loadingMessage = 'The spirits are stirring... 👻';
    addMessage(loadingMessage);

    const response = await generateGeminiResponse(prompt);
    chatMessages.removeChild(chatMessages.lastChild); // Remove loading message
    
    // Add AI response to chat history
    chatHistory.push({ role: 'assistant', content: response });
    addMessage(response);
}

// Handle send button click
sendBtn.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    userInput.value = '';
    await handleUserInput(message);
});

// Handle Enter key press
userInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendBtn.click();
    }
});

// Add some CSS for messages
const style = document.createElement('style');
style.textContent = `
    .message {
        margin: 1rem 0;
        padding: 1rem;
        border-radius: 10px;
        transition: opacity 0.3s ease;
    }

    .user-message {
        background: rgba(157, 0, 255, 0.1);
        margin-left: 2rem;
    }

    .ai-message {
        background: rgba(30, 30, 40, 0.6);
        margin-right: 2rem;
    }

    .message-content {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
    }

    .message-icon {
        font-size: 1.5rem;
    }

    .message p {
        margin: 0;
        line-height: 1.5;
        white-space: pre-wrap;
    }
`;

document.head.appendChild(style);

// Add initial greeting
addMessage('Welcome to the Ghost Story & Folklore Analyzer! Share a story, ask about folklore, or request a custom tale...');