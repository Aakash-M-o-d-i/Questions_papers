// Cache DOM elements
var modal = document.getElementById("popupContainer");
var span = document.getElementById("close-btn");
var contactForm = document.getElementById('contact-form');
var nameInput = document.getElementById('name');
var departmentInput = document.getElementById('department');
var semesterInput = document.getElementById('semester');
var quizInput = document.getElementById('quiz');
var emailInput = document.getElementById('email');
var phoneInput = document.getElementById('phone');
var loadingBar = document.getElementById('loadingBar');
var progress = document.getElementById('progress');

// Variable to store the current Quiz URL
var currentQuizUrl = "";

// Open registration popup and store quiz URL
function openRegisterPopup(quizUrl) {
    currentQuizUrl = quizUrl;
    modal.style.display = "flex";
}

// Close modal on click
span.addEventListener('click', function () {
    modal.style.display = "none";
});
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


// Utility function to simulate a delay for progress bar
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to animate progress bar to 100% over 2 seconds
async function animateProgress() {
    loadingBar.style.display = "block";
    for (let width = 0; width <= 100; width += 5) {
        progress.style.width = `${width}%`;
        await delay(100); // 100ms intervals to complete in 2 seconds
    }
}

// Handle form submission
contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Show loading bar and start animation
    loadingBar.style.display = "block";
    progress.style.width = "0%";

    const templateParams = {
        name: nameInput.value,
        department: departmentInput.value,
        semester: semesterInput.value,
        quiz: quizInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
    };

    // Start progress bar animation
    animateProgress();

    // Send email with emailjs
    try {
        const response = await emailjs.send('service_w493es7', 'template_cqtb55k', templateParams);
        console.log('SUCCESS!', response.status, response.text);
        alert('Message sent successfully!');
        contactForm.reset();
        modal.style.display = "none";
        window.location.href = currentQuizUrl;
    } catch (error) {
        console.error('FAILED...', error);
        alert('Failed to send message. Please try again.');
    } finally {
        // Hide loading bar and reset progress after 2 seconds
        loadingBar.style.display = "none";
        progress.style.width = "0%";
    }
});
