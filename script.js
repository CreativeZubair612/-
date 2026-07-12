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

window.addEventListener('load', () => {
    console.log('Website initialized');
});
