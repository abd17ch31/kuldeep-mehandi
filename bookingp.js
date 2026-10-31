/* ============================================
   BOOK APPOINTMENT PAGE JAVASCRIPT
   Form Validation & WhatsApp Integration
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const submitBtn = document.getElementById('bookingSubmitBtn');
    const whatsappNumber = '919354995471'; // WhatsApp number without + sign
    
    if (!bookingForm || !submitBtn) {
        console.error("Booking form elements not found.");
        return;
    }

    // Function to validate form fields
    function validateForm() {
        const name = document.getElementById('bookingName').value.trim();
        const phone = document.getElementById('bookingPhone').value.trim();
        const date = document.getElementById('bookingDate').value;
        const city = document.getElementById('bookingCity').value.trim();
        const state = document.getElementById('bookingState').value.trim();
        const request = document.getElementById('bookingRequest').value.trim();

        // Check if all required fields are filled
        if (!name) {
            showError('Please enter your full name.');
            document.getElementById('bookingName').focus();
            return false;
        }

        if (!phone) {
            showError('Please enter your phone number.');
            document.getElementById('bookingPhone').focus();
            return false;
        }

        // Basic phone validation (should contain numbers)
        const phoneRegex = /^[0-9+\-\s()]+$/;
        if (!phoneRegex.test(phone) || phone.length < 10) {
            showError('Please enter a valid phone number.');
            document.getElementById('bookingPhone').focus();
            return false;
        }

        if (!date) {
            showError('Please select an appointment date.');
            document.getElementById('bookingDate').focus();
            return false;
        }

        // Check if date is in the future
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showError('Please select a future date for your appointment.');
            document.getElementById('bookingDate').focus();
            return false;
        }

        if (!city) {
            showError('Please enter your city.');
            document.getElementById('bookingCity').focus();
            return false;
        }

        if (!state) {
            showError('Please enter your state.');
            document.getElementById('bookingState').focus();
            return false;
        }

        return true;
    }

    // Function to show error message
    function showError(message) {
        // Remove existing error message if any
        const existingError = document.querySelector('.booking-error-message');
        if (existingError) {
            existingError.remove();
        }

        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'booking-error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            background: rgba(220, 53, 69, 0.9);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            text-align: center;
            animation: slideDown 0.3s ease;
        `;

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);

        // Insert error message before form
        bookingForm.insertBefore(errorDiv, bookingForm.firstChild);

        // Remove error message after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.style.animation = 'slideDown 0.3s ease reverse';
                setTimeout(() => errorDiv.remove(), 300);
            }
        }, 5000);
    }

    // Function to format date for display
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Function to generate WhatsApp message
    function generateWhatsAppMessage(formData) {
        const message = `Hello Kuldeep Mehandi Studio 👋

I would like to book an appointment.

Name: ${formData.name}
Phone: ${formData.phone}
Date: ${formData.date}
City: ${formData.city}
State: ${formData.state}
Special Request: ${formData.request || 'None'}

Please confirm my appointment. Thank you!`;

        return message;
    }

    // Function to open WhatsApp
    function openWhatsApp(message) {
        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
    }

    // Function to detect if device is mobile
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               (window.innerWidth <= 768 && 'ontouchstart' in window);
    }

    // Form submit handler
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>PROCESSING...</span>';

        // Get form data
        const formData = {
            name: document.getElementById('bookingName').value.trim(),
            phone: document.getElementById('bookingPhone').value.trim(),
            date: formatDate(document.getElementById('bookingDate').value),
            city: document.getElementById('bookingCity').value.trim(),
            state: document.getElementById('bookingState').value.trim(),
            request: document.getElementById('bookingRequest').value.trim()
        };

        // Generate WhatsApp message
        const message = generateWhatsAppMessage(formData);

        // Small delay for better UX
        setTimeout(() => {
            // Open WhatsApp
            openWhatsApp(message);

            // Re-enable button after a short delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fab fa-whatsapp"></i> <span>BOOK APPOINTMENT</span>';
            }, 2000);
        }, 500);
    });

    // Set minimum date to today for date input
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Add input validation on blur
    const inputs = bookingForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = 'rgba(220, 53, 69, 0.8)';
            } else {
                this.style.borderColor = '';
            }
        });

        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgba(220, 53, 69, 0.8)') {
                this.style.borderColor = '';
            }
        });
    });
});
