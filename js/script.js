

// // Time : 1.28s

// Cache DOM elements
var modal = document.getElementById("popupContainer");
var span = document.getElementById("close-btn");
var contactForm = document.getElementById('contact-form');
var nameInput = document.getElementById('name');
var departmentInput = document.getElementById('department');
var semesterInput = document.getElementById('semester');
var emailInput = document.getElementById('email');
var phoneInput = document.getElementById('phone');
var loadingBar = document.getElementById('loadingBar');
var progress = document.getElementById('progress');

// Variable to store the current PDF URL
var currentPdfUrl = "";

// Attach event listener once to the parent container (event delegation)
document.addEventListener('click', function(event) {
    var target = event.target;

    // Handle PDF link click
    if (target.classList.contains('pdf-link')) {
        event.preventDefault();
        modal.style.display = "flex"; // Show the modal
        currentPdfUrl = target.getAttribute('data-pdf'); // Set the current PDF URL
        return; // Exit early
    }

    // Handle close button click
    if (target.id === 'close-btn') {
        modal.style.display = "none";
        return; // Exit early
    }

    // Handle click outside of the modal
    if (target === modal) {
        modal.style.display = "none";
        return; // Exit early
    }
});

// Handle form submission
contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Show loading bar and reset progress
    loadingBar.style.display = "block";
    progress.style.width = "0%";

    const templateParams = {
        name: nameInput.value,
        department: departmentInput.value,
        semester: semesterInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
    };

    // Simulate progress (optional)
    let progressInterval = setInterval(() => {
        let currentWidth = parseInt(progress.style.width);
        if (currentWidth < 100) {
            progress.style.width = (currentWidth + 10) + '%'; // Increase width
        }
    }, 100); // Adjust interval timing as needed

    emailjs.send('service_v87ru0n', 'template_4x24gft', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Message sent successfully!');
            contactForm.reset();

            // After registration and email success, close the modal and trigger the PDF download
            modal.style.display = "none";
            window.location.href = currentPdfUrl;

            // Hide loading bar and clear interval
            clearInterval(progressInterval);
            loadingBar.style.display = "none";
        }, function(error) {
            console.log('FAILED...', error);
            alert('Failed to send message. Please try again.');

            // Hide loading bar and clear interval
            clearInterval(progressInterval);
            loadingBar.style.display = "none";
        });
});
