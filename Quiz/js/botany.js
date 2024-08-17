const quizData = [
    {
        question: 'Phycology is the study of:',
        options: ['Algae', 'Fungi', 'Bryophyte'],
        answer: 'Algae'
    },
    {
        question: 'Fusion between gametes of unequal sizes is called:',
        options: ['Anisogamy', 'Oogamy', 'Isogamy', 'Dichogamy'],
        answer: 'Oogamy'
    },
    {
        "question": "The plant in which root, stem and leaf is not differentiated is called:",
        "options": ["Thallus", "Marchantia", "Bryophyte", "Liverwort"],
        "answer": "Thallus",
    },
    {
        question: 'Reserve food material in Rhodophyceae is:',
        options: ['Glycogen', 'Starch', 'Mannitol', 'Floridian starch'],
        answer: 'Floridian starch'
    },
    {
        question: 'What is the main function of a bacterial capsule?',
        options: ['Protection', 'Movement', 'Reproduction', 'Energy production'],
        answer: 'Protection'
    },
    {
        question: 'What color are Gram-negative bacteria?',
        options: ['Red', 'Purple', 'Pink', 'Colorless'],
        answer: 'Pink'
    },
    {
        question: 'During what phase is bacterial growth the fastest?',
        options: ['Lag phase', 'Log phase', 'Stationary phase', 'Death phase'],
        answer: 'Log phase'
    },
    {
        question: 'What is a virion?',
        options: ['A virus particle', 'A bacterial cell', 'A human cell', 'A plant cell'],
        answer: 'A virus particle'
    },
    {
        question: 'Are antibiotics used to treat viral infections?',
        options: ['Yes', 'No'],
        answer: 'No'
    },
    {
        question: 'What is gemma?',
        options: ['A type of asexual reproduction in bryophytes', 'A type of sexual reproduction in fungi', 'A type of photosynthetic organism', 'A type of bacterial cell'],
        answer: 'A type of asexual reproduction in bryophytes'
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
  