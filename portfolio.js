// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});

// Smooth Scroll Function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Validate form
        let isValid = true;
        
        // Name validation
        if (formData.name.length === 0) {
            showError('nameError', 'Name is required');
            isValid = false;
        } else if (formData.name.length > 100) {
            showError('nameError', 'Name must be less than 100 characters');
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email.length === 0) {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            showError('emailError', 'Invalid email address');
            isValid = false;
        } else if (formData.email.length > 255) {
            showError('emailError', 'Email must be less than 255 characters');
            isValid = false;
        }
        
        // Message validation
        if (formData.message.length === 0) {
            showError('messageError', 'Message is required');
            isValid = false;
        } else if (formData.message.length > 1000) {
            showError('messageError', 'Message must be less than 1000 characters');
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const btnText = submitButton.querySelector('.btn-text');
        const btnLoading = submitButton.querySelector('.btn-loading');
        
        submitButton.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Hide loading state
        submitButton.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        
        // Show success message
        successMessage.style.display = 'flex';
        
        // Reinitialize icons in success message
        lucide.createIcons();
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    });
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

// Add fade-in animation to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});