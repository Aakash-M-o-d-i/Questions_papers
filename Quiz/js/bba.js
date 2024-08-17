const quizData = [
    {
        question: 'From the given balance sheet, what is the increase in total assets from 31-Dec-18 to 31-Dec-19?',
        options: ['1,40,000', '2,40,000', '1,00,000', '50,000'],
        answer: '1,40,000',
    },
    {
        question: 'What is the Quick ratio from the given information?',
        options: ['1.0', '1.5', '0.75', '2.0'],
        answer: '0.75',
    },
    {
        question: 'Which of the following is considered a non-current asset from the provided data?',
        options: ['Accounts receivable', 'Land', 'Cash in hand and at bank', 'Accounts Payable'],
        answer: 'Land',
    },
    {
        question: 'Calculate the Stock Turnover ratio using the provided data.',
        options: ['4 times', '3 times', '5 times', '2 times'],
        answer: '4 times',
    },
    {
        question: 'What is the change in Cash in hand and at bank from 31-Dec-18 to 31-Dec-19?',
        options: ['Increased by 80,000', 'Decreased by 70,000', 'No change', 'Increased by 20,000'],
        answer: 'Increased by 80,000',
    },
    {
        question: 'Which of the following transactions is a debit entry in the ledger?',
        options: ['Sold goods to Krishna on credit', 'Paid into bank', 'Drew Cash from Bank for Credit', 'Paid Shyam cash'],
        answer: 'Paid into bank',
    },
    {
        question: 'From the provided information, what is the amount of General Reserve as of 31-Mar-22?',
        options: ['3,44,000', '4,14,000', '1,20,000', '5,10,000'],
        answer: '4,14,000',
    },
    {
        question: 'In the Cost Sheet preparation, what is the total factory overhead cost?',
        options: ['1,00,000', '1,80,000', '60,000', '2,00,000'],
        answer: '1,80,000',
    },
    {
        question: 'Which of the following is included in the Administrative Overheads?',
        options: ['Wages paid to workers', 'Indirect labor', 'Salaries', 'Depreciation of factory equipment'],
        answer: 'Salaries',
    },
    {
        question: 'In the transactions of Mahesh for April, what was the initial capital started with?',
        options: ['20,000', '14,000', '10,000', '30,000'],
        answer: '20,000',
    }
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
  