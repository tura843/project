// --- Add this to js/script.js ---

function displayAwesomeGreeting() {
    const greetingElement = document.getElementById('greeting');
    const greetingIconElement = document.getElementById('greeting-icon');
    const greetingContainer = document.getElementById('greeting-container'); // Get container for animation trigger

    if (!greetingElement || !greetingIconElement || !greetingContainer) {
        console.error("Greeting elements not found!");
        return; // Exit if elements aren't found
    }

    const currentHour = new Date().getHours(); // Gets the local hour (0-23)
    let greetingText = "";
    let greetingIcon = "";

    // Determine greeting based on time (adjust ranges if needed)
    if (currentHour >= 5 && currentHour < 12) {
        // Morning (5am - 11:59am)
        greetingText = "Good morning from Dodoma! Welcome to Fadhiri Masudi's portfolio.";
        greetingIcon = "☀️"; // Sun emoji
    } else if (currentHour >= 12 && currentHour < 18) {
        // Afternoon (12pm - 5:59pm)
        greetingText = "Good afternoon from Dodoma! Hope you enjoy exploring Fadhiri Masudi's work.";
        greetingIcon = "😊"; // Smiling face emoji
    } else if (currentHour >= 18 && currentHour < 22) {
        // Evening (6pm - 9:59pm)
        greetingText = "Good evening from Dodoma! Thanks for stopping by Fadhiri Masudi's portfolio.";
        greetingIcon = "🌇"; // Sunset emoji
    } else {
        // Night (10pm - 4:59am)
        greetingText = "Working late or visiting from afar? Welcome to Fadhiri Masudi's portfolio, here in Dodoma!";
        greetingIcon = "🌙"; // Moon emoji
    }

    // Update the HTML content
    greetingElement.textContent = greetingText;
    greetingIconElement.textContent = greetingIcon;

    // Re-trigger animation by resetting the class (optional, if needed dynamically)
    // greetingContainer.style.animation = 'none';
    // void greetingContainer.offsetWidth; // Trigger reflow
    // greetingContainer.style.animation = '';
}

// --- Theme Toggle Logic (Example - you might already have this) ---
function setupThemeToggle() {
    const toggleButton = document.getElementById('theme-toggle');
    if(toggleButton) {
        toggleButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            // Optional: Save theme preference to localStorage
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });

        // Optional: Load saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        } // No need for 'else' as light is default
    } else {
        console.error("Theme toggle button not found!");
    }
}

// --- Run functions when the DOM is fully loaded ---
document.addEventListener('DOMContentLoaded', () => {
    displayAwesomeGreeting(); // Display the greeting
    setupThemeToggle();     // Set up the theme toggle button
    // Add any other initialization functions here
});




// --- Add this function to js/script.js ---

function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.main-nav a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html'; // Get current filename

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        link.classList.remove('active'); // Remove active class from all links first
        if (linkPath === currentPath) {
            link.classList.add('active'); // Add active class to the matching link
        }
    });
}


// --- Modify the DOMContentLoaded listener ---
document.addEventListener('DOMContentLoaded', () => {
    // Remove the old greeting function call if you don't want it on the projects page
    // displayAwesomeGreeting(); // Comment out or remove if not needed here

    setupThemeToggle();     // Set up the theme toggle button
    setActiveNavLink();     // Highlight the current page in the nav
    // Add any other initialization functions here
});








// --- Add this inside the DOMContentLoaded event listener in js/script.js ---

document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();     // Set up the theme toggle button
    setActiveNavLink();     // Highlight the current page in the nav

    // Fun Fact Button Logic
    const funFactButton = document.getElementById('fun-fact-button');
    const funFactText = document.getElementById('fun-fact-text');

    if (funFactButton && funFactText) {
        funFactButton.addEventListener('click', () => {
            // Toggle visibility
            if (funFactText.classList.contains('fun-fact-hidden')) {
                funFactText.classList.remove('fun-fact-hidden');
                funFactText.classList.add('fun-fact-visible');
                funFactButton.textContent = 'Okay, hide it!'; // Change button text
            } else {
                funFactText.classList.add('fun-fact-hidden');
                funFactText.classList.remove('fun-fact-visible');
                funFactButton.textContent = 'Click to reveal!'; // Change button text back
            }
        });
    }

    // Add any other initialization functions here for about page if needed
});









// --- Add this Form Validation Logic to js/script.js ---

function handleContactForm() {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (!form || !formStatus) {
        // console.log("Contact form elements not found. Skipping form setup.");
        return; // Exit if form elements aren't on the current page
    }

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Function to display errors
    const showError = (inputElement, message) => {
        const errorElement = document.getElementById(`${inputElement.id}-error`);
        inputElement.classList.add('invalid');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    };

    // Function to clear errors
    const clearError = (inputElement) => {
        const errorElement = document.getElementById(`${inputElement.id}-error`);
        inputElement.classList.remove('invalid');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    };

     // Function to validate email format
    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Simple regex
        return re.test(String(email).toLowerCase());
    };

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default browser submission
        formStatus.style.display = 'none'; // Hide previous status messages
        formStatus.className = 'form-status'; // Reset status class

        let isValid = true;

        // --- Validation Checks ---
        // Clear previous errors
        clearError(nameInput);
        clearError(emailInput);
        clearError(messageInput);

        // Validate Name
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required.');
            isValid = false;
        }

        // Validate Email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required.');
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        }

        // Validate Message
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message cannot be empty.');
            isValid = false;
        }

        // --- Submission ---
        if (isValid) {
            // ** IMPORTANT **
            // In a real application, you would send the form data here
            // using Fetch API or XMLHttpRequest to your backend endpoint.
            // Example:
            // const formData = new FormData(form);
            // fetch('/your-backend-endpoint', { method: 'POST', body: formData })
            //   .then(response => response.json())
            //   .then(data => { ... handle success ... })
            //   .catch(error => { ... handle error ... });

            // **Simulate success for this example:**
            console.log('Form is valid. Data would be sent here:');
            console.log('Name:', nameInput.value.trim());
            console.log('Email:', emailInput.value.trim());
            console.log('Subject:', document.getElementById('subject').value.trim());
            console.log('Message:', messageInput.value.trim());

            formStatus.textContent = 'Message sent successfully! Thank you for reaching out.';
            formStatus.classList.add('success');
            formStatus.style.display = 'block';
            form.reset(); // Clear the form fields

        } else {
            // Display a general error message if specific field errors aren't enough
            formStatus.textContent = 'Please correct the errors above and try again.';
            formStatus.classList.add('error');
            formStatus.style.display = 'block';
        }
    });

     // Optional: Clear errors when user starts typing again
     [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', () => clearError(input));
    });
}


// --- Modify the DOMContentLoaded listener ---
document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();     // Set up the theme toggle button
    setActiveNavLink();     // Highlight the current page in the nav
    handleContactForm();    // Set up contact form validation and handling

    // Add any other initialization functions here if needed
});










    // --- Add this Survey Form Logic to js/script.js ---

    function handleSurveyForm() {
        const form = document.getElementById('survey-form');
        const formStatus = document.getElementById('survey-form-status');

        if (!form || !formStatus) {
            // console.log("Survey form elements not found. Skipping survey form setup.");
            return; // Exit if survey form isn't on the current page
        }

        // --- Helper Functions (reuse or adapt from contact form) ---
        const showError = (inputElement, message, isGroup = false) => {
            const errorElementId = isGroup ? `${inputElement.name}-error` : `${inputElement.id}-error`;
            const errorElement = document.getElementById(errorElementId);
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.style.display = 'block';
            }
            // Add invalid class to input or group container if needed
            if (!isGroup) {
                 inputElement.classList.add('invalid');
            } else {
                // Find parent group and add class? Or handle styling via error message visibility
                const group = inputElement.closest('.radio-group, .checkbox-group');
                 if(group) group.classList.add('invalid-group'); // Optional class for group styling
            }
        };

        const clearError = (elementOrName) => {
            let inputElement, errorElementId, isGroup = false;
            if (typeof elementOrName === 'string') { // If name is passed (for radio/checkbox groups)
                errorElementId = `${elementOrName}-error`;
                isGroup = true;
                 // Find first input of the group to get parent container
                 inputElement = form.querySelector(`input[name="${elementOrName}"]`);
            } else { // If input element is passed
                inputElement = elementOrName;
                errorElementId = `${inputElement.id}-error`;
            }

            const errorElement = document.getElementById(errorElementId);
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
            if (!isGroup && inputElement) {
                 inputElement.classList.remove('invalid');
            } else if (isGroup && inputElement) {
                 const group = inputElement.closest('.radio-group, .checkbox-group');
                 if(group) group.classList.remove('invalid-group');
            }
        };

        const validateEmail = (email) => {
            const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return re.test(String(email).toLowerCase());
        };

        // --- Form Submission Event Listener ---
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            formStatus.style.display = 'none';
            formStatus.className = 'form-status'; // Reset status class

            let isValid = true;

            // --- Clear All Previous Errors ---
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                if (input.type !== 'radio' && input.type !== 'checkbox') {
                    clearError(input);
                }
            });
            // Clear radio/checkbox group errors by name
            clearError('satisfaction');
            clearError('suggestions'); // Textarea error
            clearError('survey-email'); // Email error


            // --- Validation Checks ---
            const emailInput = document.getElementById('survey-email');
            const satisfactionRadios = form.querySelectorAll('input[name="satisfaction"]');
            const suggestionsTextarea = document.getElementById('suggestions');

            // Validate Email (if entered)
            if (emailInput.value.trim() !== '' && !validateEmail(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            }

            // Validate Satisfaction (Required Radio Group)
            let satisfactionSelected = false;
            satisfactionRadios.forEach(radio => {
                if (radio.checked) {
                    satisfactionSelected = true;
                }
            });
            if (!satisfactionSelected) {
                showError(satisfactionRadios[0], 'Please select your satisfaction level.', true); // Show error on the group
                isValid = false;
            }

             // Validate Suggestions (Required Textarea)
            if (suggestionsTextarea.value.trim() === '') {
                showError(suggestionsTextarea, 'Suggestions cannot be empty.');
                isValid = false;
            }


            // --- Submission ---
            if (isValid) {
                // ** IMPORTANT **
                // Again, you need a backend endpoint to actually receive this data.
                // Example using FormData:
                // const formData = new FormData(form);
                // console.log('Survey data to send:');
                // for (let [key, value] of formData.entries()) {
                //     console.log(`${key}: ${value}`);
                // }
                // fetch('/your-survey-backend-endpoint', { method: 'POST', body: formData })
                //   .then(response => response.json()) // Or response.text()
                //   .then(data => { ... handle success ... })
                //   .catch(error => { ... handle error ... });

                // **Simulate success for this example:**
                console.log('Survey form is valid. Data would be sent.');
                formStatus.textContent = 'Thank you for your valuable feedback!';
                formStatus.classList.add('success');
                formStatus.style.display = 'block';
                form.reset(); // Clear the form

            } else {
                formStatus.textContent = 'Please correct the errors above and try again.';
                formStatus.classList.add('error');
                formStatus.style.display = 'block';
                // Optionally scroll to the first error
                const firstError = form.querySelector('.invalid, .invalid-group');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });

         // Optional: Clear errors on input/change
         form.querySelectorAll('input, textarea, select').forEach(element => {
            element.addEventListener('input', () => {
                 if (element.type === 'radio' || element.type === 'checkbox') {
                     clearError(element.name); // Clear group error by name
                 } else {
                     clearError(element); // Clear individual input error
                 }
            });
             // Clear radio group error on change as well
             if (element.type === 'radio') {
                 element.addEventListener('change', () => clearError(element.name));
             }
        });
    }


    // --- Modify the DOMContentLoaded listener ---
    document.addEventListener('DOMContentLoaded', () => {
        setupThemeToggle();     // Set up the theme toggle button
        setActiveNavLink();     // Highlight the current page in the nav
        handleContactForm();    // Set up contact form (if it exists)
        handleSurveyForm();     // Set up survey form (if it exists)

        // Add any other initialization functions here if needed
    });

    // --- Make sure setActiveNavLink handles the new 'survey.html' link ---
    // (The existing setActiveNavLink function should work fine if you added the link correctly)

    