// ===== NAVIGATION MENU TOGGLE =====
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// ===== FAQ TOGGLE =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// ===== POPUP FORM FUNCTIONS =====
function openForm() {
    document.getElementById('formPopup').style.display = 'block';
    document.getElementById('contact-form').reset();
}

function closeForm() {
    document.getElementById('formPopup').style.display = 'none';
}

window.addEventListener('click', (event) => {
    const popup = document.getElementById('formPopup');
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const loader = document.getElementById('loader');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    loader.style.display = 'block';
    submitBtn.disabled = true;
    
    const formData = {
        name: contactForm.querySelector('input[name="name"]').value,
        email: contactForm.querySelector('input[name="email"]').value,
        title: contactForm.querySelector('input[name="title"]').value,
        message: contactForm.querySelector('textarea[name="message"]').value,
        timestamp: new Date().toISOString()
    };
    
    try {
        console.log('Form submitted:', formData);
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        alert('Thank you for your inquiry! I will get back to you soon.');
        closeForm();
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error. Please try again.');
    } finally {
        loader.style.display = 'none';
        submitBtn.disabled = false;
    }
});

// ===== CHAT WIDGET FUNCTIONALITY =====
const chatButton = document.querySelector('.chat-button');
const chatBox = document.querySelector('.chat-box');
const chatClose = document.querySelector('.chat-close');
const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input-area input');
const chatSendBtn = document.querySelector('.chat-input-area button');

chatButton.addEventListener('click', () => {
    if (chatBox.style.display === 'none' || chatBox.style.display === '') {
        chatBox.style.display = 'flex';
        chatInput.focus();
    } else {
        chatBox.style.display = 'none';
    }
});

chatClose.addEventListener('click', () => {
    chatBox.style.display = 'none';
});

async function sendMessage() {
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    addChatMessage(message, 'user');
    chatInput.value = '';
    
    showTypingIndicator();
    
    try {
        const response = await getAIResponse(message);
        removeTypingIndicator();
        addChatMessage(response, 'bot');
    } catch (error) {
        removeTypingIndicator();
        addChatMessage('Sorry, I encountered an error. Please try again.', 'bot');
        console.error('Chat error:', error);
    }
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addChatMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typingDiv = document.getElementById('typing-indicator');
    if (typingDiv) typingDiv.remove();
}

async function getAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase().trim();
    
    const knowledgeBase = [
        {
            patterns: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
            response: 'Hello! Welcome to Muhammad Zubair Design Studio. How can I assist you today?'
        },
        {
            patterns: ['services', 'what do you offer', 'what can you do', 'design services', 'offerings'],
            response: 'I offer a wide range of graphic design services: Logo Design, Social Media Content, Branding, Posters and Flyers, Banners and Headers, and Custom Design projects. What service interests you?'
        },
        {
            patterns: ['logo', 'logo design', 'create logo', 'new logo'],
            response: 'Logo design is one of my specialties. I create custom, unique logos that represent your brand identity. Each logo is tailored to your business vision. Would you like to discuss your logo project?'
        },
        {
            patterns: ['social media', 'social media content', 'instagram', 'facebook', 'twitter', 'social posts'],
            response: 'I create eye-catching social media content designed to engage your audience across Instagram, Facebook, Twitter, and LinkedIn. I handle posts, stories, banners, and promotional graphics.'
        },
        {
            patterns: ['branding', 'brand identity', 'complete branding', 'brand guidelines'],
            response: 'I provide complete branding solutions including logo design, color palette selection, typography guidelines, and brand identity documentation. Perfect for startups or businesses needing a refresh.'
        },
        {
            patterns: ['poster', 'flyer', 'promotional', 'advertisement', 'marketing material'],
            response: 'I design professional posters, flyers, and marketing materials that grab attention and communicate your message effectively. Perfect for events, promotions, and announcements.'
        },
        {
            patterns: ['banner', 'header', 'web banner', 'website banner'],
            response: 'I design custom banners and headers for web and print. Perfect for websites, social media, events, and promotional displays. Tell me about your banner project.'
        },
        {
            patterns: ['price', 'pricing', 'cost', 'how much', 'rates', 'fee', 'quote'],
            response: 'Pricing varies based on project scope and complexity. For an accurate quote tailored to your project, please contact me at mzzubair612@gmail.com or call +44 7449260500.'
        },
        {
            patterns: ['timeline', 'how long', 'turnaround', 'delivery time', 'deadline', 'when'],
            response: 'Most projects take 3-7 business days depending on complexity. Simple logo designs take 1-2 days, while complete branding packages may take 1-2 weeks. I will provide specific timelines for your project.'
        },
        {
            patterns: ['revisions', 'changes', 'modifications', 'edit', 'revision rounds', 'how many revisions'],
            response: 'Each package includes 2-3 rounds of revisions to ensure you are completely satisfied. Additional revision rounds can be discussed and may incur extra charges.'
        },
        {
            patterns: ['contact', 'how to reach', 'get in touch', 'phone', 'email', 'reach out', 'contact information'],
            response: 'You can reach me at: Email: mzzubair612@gmail.com or Phone: +44 7449260500. I respond promptly to all inquiries.'
        },
        {
            patterns: ['portfolio', 'see work', 'previous work', 'examples', 'case studies', 'projects', 'show me'],
            response: 'Check out my portfolio section on this website to view samples of my recent design work. It showcases logos, social media content, branding projects, and more.'
        },
        {
            patterns: ['payment', 'how to pay', 'payment methods', 'accept'],
            response: 'I currently accept bank transfers for all payments. Bank account details will be provided once your project is confirmed. A deposit may be required for certain projects.'
        },
        {
            patterns: ['file format', 'formats', 'psd', 'ai', 'png', 'jpg', 'deliverable', 'deliver'],
            response: 'I deliver designs in multiple formats including PNG, JPG, PDF, and editable source files in PSD and AI formats for maximum flexibility.'
        },
        {
            patterns: ['experience', 'how many years', 'expertise', 'qualified', 'background', 'professional'],
            response: 'I am a professional graphic designer with years of experience. I have successfully helped numerous businesses and individuals bring their creative visions to life with professional, high-quality designs.'
        },
        {
            patterns: ['custom design', 'unique project', 'special request', 'custom work'],
            response: 'I welcome custom design projects tailored to your specific needs. Whether unconventional or highly specialized, I am ready to create a unique solution. Tell me about your custom project.'
        },
        {
            patterns: ['thank you', 'thanks', 'appreciate', 'grateful'],
            response: 'You are welcome! I am happy to help. If you have any other questions, feel free to ask.'
        },
        {
            patterns: ['bye', 'goodbye', 'see you', 'farewell', 'later'],
            response: 'Goodbye! Thank you for visiting. Feel free to reach out anytime. I look forward to working with you.'
        },
        {
            patterns: ['how are you', 'how do you do'],
            response: 'I am doing great, thank you for asking! I am ready to help you with your design needs. What can I do for you today?'
        },
        {
            patterns: ['yes', 'ok', 'okay', 'sure', 'alright', 'sounds good'],
            response: 'Great! I am excited to move forward. What would you like to know more about?'
        },
        {
            patterns: ['no', 'nope', 'not really', 'not interested'],
            response: 'No problem. Feel free to ask me anything else or let me know if you change your mind. How else can I help?'
        },
        {
            patterns: ['work with', 'collaborate', 'partnership', 'hire', 'hire me', 'work together'],
            response: 'I would love to work with you! To discuss your project details and requirements, please contact me at mzzubair612@gmail.com or +44 7449260500. Let us create something amazing together.'
        },
        {
            patterns: ['revise', 'mistake', 'wrong', 'fix', 'redo'],
            response: 'All projects include revision rounds where I will fix any issues and make adjustments until you are satisfied with the result.'
        }
    ];
    
    for (const item of knowledgeBase) {
        for (const pattern of item.patterns) {
            if (lowerMessage.includes(pattern)) {
                await new Promise(resolve => setTimeout(resolve, 500));
                return item.response;
            }
        }
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    return 'That is a great question! For more detailed information, please contact me at mzzubair612@gmail.com or +44 7449260500. I am always happy to discuss your project needs.';
}

chatSendBtn.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// ===== TYPING INDICATOR ANIMATION =====
const style = document.createElement('style');
style.textContent = `
    .typing-indicator {
        display: flex !important;
        align-items: center;
        gap: 4px !important;
    }
    
    .typing-indicator span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #22c55e;
        animation: typing 1.4s infinite;
    }
    
    .typing-indicator span:nth-child(2) {
        animation-delay: 0.2s;
    }
    
    .typing-indicator span:nth-child(3) {
        animation-delay: 0.4s;
    }
    
    @keyframes typing {
        0%, 60%, 100% {
            opacity: 0.5;
            transform: translateY(0);
        }
        30% {
            opacity: 1;
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);

window.addEventListener('load', () => {
    console.log('Chat widget initialized');
});
