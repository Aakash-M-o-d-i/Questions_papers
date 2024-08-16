const quizData = [
    {
        question: 'What is the difference between RAM and ROM?',
        options: ['RAM is volatile, ROM is non-volatile', 'ROM is faster than RAM', 'RAM stores firmware, ROM stores software', 'None of the above'],
        answer: 'RAM is volatile, ROM is non-volatile',
    },
    {
        question: 'What is a File Server?',
        options: ['A server that manages and stores files', 'A server that executes application software', 'A server that connects printers', 'A server that handles network traffic'],
        answer: 'A server that manages and stores files',
    },
    {
        question: 'What is the full form of LCD?',
        options: ['Liquid Control Display', 'Light Crystal Display', 'Liquid Crystal Display', 'Light Color Display'],
        answer: 'Liquid Crystal Display',
    },
    {
        question: 'What does CLI stand for?',
        options: ['Central Line Interface', 'Command Line Interface', 'Control Line Interface', 'Common Line Interface'],
        answer: 'Command Line Interface',
    },
    {
        question: 'What is the purpose of translators in computing?',
        options: ['Convert low-level code to high-level code', 'Convert high-level code to low-level code', 'Translate spoken language to code', 'Translate code into human-readable language'],
        answer: 'Convert high-level code to low-level code',
    },
    {
        question: 'Which of the following is an Input Device?',
        options: ['Monitor', 'Keyboard', 'Printer', 'Hard Drive'],
        answer: 'Keyboard',
    },
    {
        question: 'Which of the following is an Output Device?',
        options: ['Mouse', 'Keyboard', 'Monitor', 'Scanner'],
        answer: 'Monitor',
    },
    {
        question: 'Which of the following is a type of printer?',
        options: ['Dot Matrix', 'Laser', 'Inkjet', 'All of the above'],
        answer: 'All of the above',
    },
    {
        question: 'Multiprogramming allows:',
        options: ['Multiple tasks to run simultaneously by sharing CPU time', 'Only one program to run at a time', 'Execution of a single task faster', 'None of the above'],
        answer: 'Multiple tasks to run simultaneously by sharing CPU time',
    },
    {
        question: 'Multitasking is:',
        options: ['Running multiple applications simultaneously', 'Running a single application multiple times', 'Dividing a task into multiple smaller tasks', 'Running multiple programs on multiple computers'],
        answer: 'Running multiple applications simultaneously',
    },
    {
        question: 'What does the DOS command TIME do?',
        options: ['Displays the current time', 'Sets the current time', 'Displays and sets the current time', 'None of the above'],
        answer: 'Displays and sets the current time',
    },
    {
        question: 'What is the purpose of the DOS command REN?',
        options: ['Renames a directory', 'Renames a file', 'Removes a file', 'Restarts the computer'],
        answer: 'Renames a file',
    },
    {
        question: 'What does the DOS command MOV do?',
        options: ['Moves a file from one directory to another', 'Displays the contents of a file', 'Moves a directory', 'None of the above'],
        answer: 'Moves a file from one directory to another',
    },
    {
        question: 'What is the function of the DOS command CD?',
        options: ['Creates a new directory', 'Changes the current directory', 'Deletes a directory', 'Copies a directory'],
        answer: 'Changes the current directory',
    },
    {
        question: 'What does the DOS command CHKDSK check?',
        options: ['Memory errors', 'Disk errors', 'File errors', 'Directory errors'],
        answer: 'Disk errors',
    },
    {
        question: 'What does the DOS command SET do?',
        options: ['Sets system environment variables', 'Sets the current time and date', 'Sets file permissions', 'Sets user account settings'],
        answer: 'Sets system environment variables',
    },
    {
        question: 'What is the purpose of the DOS command PING?',
        options: ['Checks network connectivity', 'Deletes a directory', 'Renames a file', 'Moves a file'],
        answer: 'Checks network connectivity',
    },
    {
        question: 'What does the DOS command TREE display?',
        options: ['The structure of files and directories', 'The content of a file', 'The current directory', 'The disk usage'],
        answer: 'The structure of files and directories',
    },
    {
        question: 'What is the function of the DOS command COPY CON?',
        options: ['Copies a file from one location to another', 'Copies a file with a new name', 'Creates a new file with content entered by the user', 'Converts a file format'],
        answer: 'Creates a new file with content entered by the user',
    },
    {
        question: 'What does the DOS command TYPE do?',
        options: ['Displays the contents of a text file', 'Types a command', 'Changes file type', 'Moves a file'],
        answer: 'Displays the contents of a text file',
    },
    {
        question: 'What is an Operating System (OS)?',
        options: ['Software that manages hardware resources', 'A type of programming language', 'Hardware that runs software', 'None of the above'],
        answer: 'Software that manages hardware resources',
    },
    {
        question: 'Which of the following is an example of an Operating System?',
        options: ['Microsoft Word', 'Linux', 'Google Chrome', 'Python'],
        answer: 'Linux',
    },
    {
        question: 'Which of the following is not an Operating System?',
        options: ['Windows', 'macOS', 'Unix', 'Java'],
        answer: 'Java',
    },
    {
        question: 'Which Operating System is known for its open-source nature?',
        options: ['Windows', 'Linux', 'macOS', 'iOS'],
        answer: 'Linux',
    },
    {
        question: 'Which of the following is a feature of a modern Operating System?',
        options: ['Multitasking', 'Single-tasking', 'Manual memory management', 'Limited user interface'],
        answer: 'Multitasking',
    },
    {
        question: 'The primary role of an Operating System is to:',
        options: ['Provide a user-friendly interface', 'Manage hardware resources', 'Execute and manage software applications', 'All of the above'],
        answer: 'All of the above',
    },
    {
        question: 'Which Operating System is known for its graphical user interface (GUI)?',
        options: ['Linux', 'Windows', 'DOS', 'Unix'],
        answer: 'Windows',
    },
    {
        question: 'Which of the following Operating Systems is primarily used on servers?',
        options: ['Windows', 'macOS', 'Linux', 'Android'],
        answer: 'Linux',
    },
    {
        question: 'Which Operating System is used on Apple\'s computers?',
        options: ['Windows', 'macOS', 'Linux', 'Unix'],
        answer: 'macOS',
    },
    {
        question: 'What is a key characteristic of DOS?',
        options: ['Command-line interface', 'Graphical user interface', 'Multitasking capability', 'Open-source platform'],
        answer: 'Command-line interface',
    },
];

  

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const optionWrapper = document.createElement('div');
        const option = document.createElement('input');
        option.type = 'radio';
        option.id = `option-${i}`;
        option.name = 'quiz';
        option.value = shuffledOptions[i];

        const label = document.createElement('label');
        label.setAttribute('for', `option-${i}`);
        label.innerHTML = shuffledOptions[i];

        optionWrapper.appendChild(option);
        optionWrapper.appendChild(label);
        optionsElement.appendChild(optionWrapper);

        option.addEventListener('change', checkAnswer);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    const labels = document.querySelectorAll('.options label');

    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === quizData[currentQuestion].answer) {
            score++;
        } else {
            incorrectAnswers.push({
                question: quizData[currentQuestion].question,
                incorrectAnswer: answer,
                correctAnswer: quizData[currentQuestion].answer,
            });
        }

        labels.forEach(label => {
            if (label.innerHTML === quizData[currentQuestion].answer) {
                label.classList.add('correct');
            } else {
                label.classList.add('incorrect');
            }
        });

        currentQuestion++;
        setTimeout(() => {
            if (currentQuestion < quizData.length) {
                displayQuestion();
            } else {
                displayResult();
            }
        }, 1000);
    }
}

function displayResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';

    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
}

function showAnswer() {
    quizContainer.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
            <p>
                <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
                <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
                <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
            </p>
        `;
    }

    resultContainer.innerHTML = `
        <p>You scored ${score} out of ${quizData.length}!</p>
        <p>Incorrect Answers:</p>
        ${incorrectAnswersHtml}
    `;
}

retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
