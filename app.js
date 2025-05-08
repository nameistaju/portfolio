// DOM Elements
const header = document.querySelector('header');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const backToTop = document.querySelector('.back-to-top');
const fadeElements = document.querySelectorAll('.fade-in');
const progressBars = document.querySelectorAll('.progress');
const contactForm = document.getElementById('contactForm');
const navLinkItems = document.querySelectorAll('.nav-link');

// Navigation Menu Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Change hamburger icon
    const icon = hamburger.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when clicking a nav link
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Highlight active section in navigation
const highlightActiveSection = () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinkItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

// Scroll Events
window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Show/hide back to top button
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
    
    // Highlight active section
    highlightActiveSection();
    
    // Animate elements on scroll
    animateOnScroll();
});

// Back to top functionality
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate elements on scroll
const animateOnScroll = () => {
    fadeElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('show');
            
            // Animate progress bars if they're in view
            if (element.classList.contains('skill-progress')) {
                const progressBar = element.querySelector('.progress');
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = `${width}%`;
            }
        }
    });
};

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        animateOnScroll();
    }, 300);
});

// Contact Form Submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Validate form data
    if (!name || !email || !message) {
        showFormMessage('Please fill in all required fields', 'error');
        return;
    }
    
    try {
        // Create mailto link (as a simple solution)
        const mailtoLink = `mailto:bantu9848@gmail.com?subject=${encodeURIComponent(subject || 'Contact from Portfolio')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showFormMessage('Message sent successfully! Your email client should have opened.', 'success');
        
        // Reset form
        contactForm.reset();
        
    } catch (error) {
        console.error('Error sending email:', error);
        showFormMessage('Failed to send message. Please try again or contact directly via email.', 'error');
    }
});

// Show form submission message
function showFormMessage(message, type) {
    // Check if message element already exists
    let messageElement = document.querySelector('.form-message');
    
    if (!messageElement) {
        // Create message element if it doesn't exist
        messageElement = document.createElement('div');
        messageElement.className = 'form-message';
        contactForm.appendChild(messageElement);
    }
    
    // Set message and style
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;
    
    // Add styles for message
    messageElement.style.padding = '10px';
    messageElement.style.marginTop = '15px';
    messageElement.style.borderRadius = '5px';
    
    if (type === 'success') {
        messageElement.style.backgroundColor = '#d1fae5';
        messageElement.style.color = '#065f46';
        messageElement.style.border = '1px solid #a7f3d0';
    } else {
        messageElement.style.backgroundColor = '#fee2e2';
        messageElement.style.color = '#b91c1c';
        messageElement.style.border = '1px solid #fecaca';
    }
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);

}

