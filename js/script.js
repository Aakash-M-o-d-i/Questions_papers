
// // Get the modal
// var modal = document.getElementById("popupContainer");

// // Get the <span> element that closes the modal
// var span = document.getElementById("close-btn");

// // Get all links
// var links = document.querySelectorAll('a');

// // Variable to store the current PDF URL
// var currentPdfUrl = "";

// // When the user clicks on any link, open the modal and set the current PDF URL
// links.forEach(link => {
//     link.addEventListener('click', function(event) {
//         event.preventDefault();
//         modal.style.display = "flex"; // Show the modal
//         currentPdfUrl = this.getAttribute('data-pdf'); // Set the current PDF URL
//     });
// });

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

// // Handle form submission
// document.getElementById('contact-form').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const templateParams = {
//         name: document.getElementById('name').value,
//         email: document.getElementById('email').value,
//         subject: document.getElementById('subject').value,
//         message: document.getElementById('message').value
//     };

//     emailjs.send('service_v87ru0n', 'template_4x24gft', templateParams)
//         .then(function(response) {
//             console.log('SUCCESS!', response.status, response.text);
//             alert('Message sent successfully!');
//             document.getElementById('contact-form').reset();

//             // After registration and email success, close the modal and trigger the PDF download
//             modal.style.display = "none";
//             window.location.href = currentPdfUrl;
//         }, function(error) {
//             console.log('FAILED...', error);
//             alert('Failed to send message. Please try again.');
//         });
// });



// Get the modal
var modal = document.getElementById("popupContainer");

// Get the <span> element that closes the modal
var span = document.getElementById("close-btn");

// Get all links with the class 'pdf-link'
var links = document.querySelectorAll('.pdf-link');

// Variable to store the current PDF URL
var currentPdfUrl = "";

// When the user clicks on any link, open the modal and set the current PDF URL
links.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        modal.style.display = "flex"; // Show the modal
        currentPdfUrl = this.getAttribute('data-pdf'); // Set the current PDF URL
    });
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const templateParams = {
        name: document.getElementById('name').value,
        department: document.getElementById('department').value,
        semester: document.getElementById('semester').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,

        // subject: document.getElementById('subject').value,
        // message: document.getElementById('message').value
    };

    emailjs.send('service_v87ru0n', 'template_4x24gft', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Message sent successfully!');
            document.getElementById('contact-form').reset();

            // After registration and email success, close the modal and trigger the PDF download
            modal.style.display = "none";
            window.location.href = currentPdfUrl;
        }, function(error) {
            console.log('FAILED...', error);
            alert('Failed to send message. Please try again.');
        });
});
