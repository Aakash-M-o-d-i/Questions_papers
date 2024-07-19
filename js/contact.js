document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');
    const loadingBar = document.getElementById('loadingBar');
    const progressBar = document.getElementById('progress');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        loadingBar.style.display = 'block';
        progressBar.style.width = '0%';

        const templateParams = {
            name: nameField.value,
            email: emailField.value,
            subject: subjectField.value,
            message: messageField.value
        };

        let progress = 0;
        const interval = setInterval(function () {
            if (progress < 80) {
                progress += 5;
                progressBar.style.width = progress + '%';
            } else {
                clearInterval(interval);
            }
        }, 100);

        emailjs.send('service_v87ru0n', 'template_4x24gft', templateParams)
            .then(function (response) {
                clearInterval(interval);
                progressBar.style.width = '100%';
                console.log('SUCCESS!', response.status, response.text);
                alert('Message sent successfully!');
                contactForm.reset();
                loadingBar.style.display = 'none';
            }, function (error) {
                clearInterval(interval);
                progressBar.style.width = '0%';
                console.log('FAILED...', error);
                alert('Failed to send message. Please try again.');
                loadingBar.style.display = 'none';
            });
    });
});