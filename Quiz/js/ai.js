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
        <div class="a">
            <p>
                <strong>Question ${i+1}:</strong> ${incorrectAnswers[i].question}<br>
                <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
                <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
            </p>
        </div>
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
