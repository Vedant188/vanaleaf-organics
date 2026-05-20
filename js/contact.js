// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Basic validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // Simulate form submission (in a real app, this would send to a server)
            setTimeout(() => {
                // Create form data object
                const formData = {
                    name: name,
                    email: email,
                    subject: subject,
                    message: message,
                    timestamp: new Date().toISOString()
                };

                // Log form data (in production, this would be sent to a server)
                console.log('Contact form submitted:', formData);

                // Show success message
                showFormMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');

                // Reset form
                contactForm.reset();

                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;

                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 1500);
        });
    }

    // Animate contact methods on scroll
    const contactMethods = document.querySelectorAll('.contact-method');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    contactMethods.forEach(method => {
        method.style.opacity = '0';
        method.style.transform = 'translateX(-30px)';
        method.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(method);
    });

    // Animate FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });

    // Real-time email validation
    const emailInput = document.getElementById('contactEmail');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#dc3545';
                showInputError(this, 'Please enter a valid email address');
            } else {
                this.style.borderColor = '';
                removeInputError(this);
            }
        });

        emailInput.addEventListener('input', function() {
            if (this.value && validateEmail(this.value)) {
                this.style.borderColor = '#28a745';
                removeInputError(this);
            }
        });
    }

    // Character counter for message textarea
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        const maxLength = 1000;
        const counter = document.createElement('div');
        counter.style.cssText = 'text-align: right; color: #6c757d; font-size: 0.9rem; margin-top: 0.5rem;';
        messageTextarea.parentElement.appendChild(counter);

        function updateCounter() {
            const remaining = maxLength - messageTextarea.value.length;
            counter.textContent = `${remaining} characters remaining`;

            if (remaining < 100) {
                counter.style.color = '#dc3545';
            } else {
                counter.style.color = '#6c757d';
            }
        }

        messageTextarea.setAttribute('maxlength', maxLength);
        messageTextarea.addEventListener('input', updateCounter);
        updateCounter();
    }
});

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';

        // Auto-hide after 5 seconds
        setTimeout(() => {
            formMessage.style.opacity = '0';
            setTimeout(() => {
                formMessage.style.display = 'none';
                formMessage.style.opacity = '1';
            }, 300);
        }, 5000);
    }
}

function showInputError(input, message) {
    removeInputError(input);

    const errorDiv = document.createElement('div');
    errorDiv.className = 'input-error';
    errorDiv.style.cssText = 'color: #dc3545; font-size: 0.9rem; margin-top: 0.3rem;';
    errorDiv.textContent = message;

    input.parentElement.appendChild(errorDiv);
}

function removeInputError(input) {
    const existingError = input.parentElement.querySelector('.input-error');
    if (existingError) {
        existingError.remove();
    }
}

// Click-to-copy for email and phone
document.addEventListener('DOMContentLoaded', function() {
    const contactInfo = document.querySelectorAll('.method-info p');

    contactInfo.forEach(info => {
        if (info.textContent.includes('@') || info.textContent.includes('+')) {
            info.style.cursor = 'pointer';
            info.title = 'Click to copy';

            info.addEventListener('click', function() {
                const text = this.textContent.trim();
                navigator.clipboard.writeText(text).then(() => {
                    // Show copied feedback
                    const originalText = this.textContent;
                    this.textContent = '✓ Copied!';
                    this.style.color = '#28a745';

                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.color = '';
                    }, 2000);
                });
            });
        }
    });
});

// Map integration placeholder (for future enhancement)
function initMap() {
    console.log('Map would be initialized here');
    // This would typically initialize a Google Maps or similar map widget
}

// Live chat widget placeholder (for future enhancement)
function initLiveChat() {
    console.log('Live chat would be initialized here');
    // This would typically initialize a third-party chat widget
}
