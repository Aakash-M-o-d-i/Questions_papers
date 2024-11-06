// Time : 1.28s

// Cache DOM elements
var span = document.getElementById("close-btn");
var contactForm = document.getElementById('contact-form');
var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var subjectInput = document.getElementById('subject');
var messageInput = document.getElementById('message');
var loadingBar = document.getElementById('loadingBar');
var progress = document.getElementById('progress');

// Handle form submission
contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Show loading bar and reset progress
    loadingBar.style.display = "block";
    progress.style.width = "0%";

    const templateParams = {
        name: nameInput.value,
        email: emailInput.value,
        subject: subjectInput.value,
        message: messageInput.value,
    };

    // Simulate progress (optional)
    let progressInterval = setInterval(() => {
        let currentWidth = parseInt(progress.style.width);
        if (currentWidth < 100) {
            progress.style.width = (currentWidth + 10) + '%'; // Increase width
        }
    }, 100); // Adjust interval timing as needed

    emailjs.send('service_8jjnn0l', 'template_foq1fj7', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Message sent successfully!');

            // Reset the form fields
            contactForm.reset();

            // Hide loading bar and clear interval
            clearInterval(progressInterval);
            loadingBar.style.display = "none";
            progress.style.width = "0%";

            // Optionally close the modal if needed
            modal.style.display = "none";
        }, function(error) {
            console.log('FAILED...', error);
            alert('Failed to send message. Please try again.');

            // Hide loading bar and clear interval
            clearInterval(progressInterval);
            loadingBar.style.display = "none";
            progress.style.width = "0%";
        });
});
