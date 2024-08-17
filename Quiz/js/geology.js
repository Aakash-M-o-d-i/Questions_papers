const quizData = [
    {
        question: 'What is the age of the earth?',
        options: ['4.5 billion years', '6 billion years', '8 billion years', '10 billion years'],
        answer: '4.5 billion years'
    },
    {
        question: 'Where is the asteroid belt present?',
        options: ['Between Mars and Jupiter', 'Between Venus and Mars', 'Between Earth and Venus', 'Between Jupiter and Saturn'],
        answer: 'Between Mars and Jupiter'
    },
    {
        question: 'What is the shape of the earth?',
        options: ['Sphere', 'Ellipsoid', 'Geoid', 'Flat'],
        answer: 'Geoid'
    },
    {
        question: 'What is the composition of the Earth\'s Core?',
        options: ['Iron and Nickel', 'Silicon and Oxygen', 'Carbon and Hydrogen', 'Water and Ice'],
        answer: 'Iron and Nickel'
    },
    {
        question: 'Define Geomorphology',
        options: ['The study of the earth\'s surface features', 'The study of the earth\'s interior', 'The study of the earth\'s atmosphere', 'The study of the earth\'s oceans'],
        answer: 'The study of the earth\'s surface features'
    },
    {
        question: 'Define the "Focus" of the earthquake',
        options: ['The point on the earth\'s surface directly above the earthquake source', 'The point within the earth where the earthquake originates', 'The area on the earth\'s surface where the earthquake is felt most strongly', 'The path that the earthquake waves travel through the earth'],
        answer: 'The point within the earth where the earthquake originates'
    },
    {
        question: 'Coral reefs are the landforms formed by',
        options: ['Corals', 'Plants', 'Rocks', 'Sand'],
        answer: 'Corals'
    },
    {
        question: 'The statement Present is the key to the past is given by',
        options: ['James Hutton', 'Charles Darwin', 'Albert Einstein', 'Isaac Newton'],
        answer: 'James Hutton'
    },
    {
        question: 'Himalayan mountains formed due to the',
        options: ['continental plates', 'oceanic plates', 'tectonic plates', 'lithospheric plates'],
        answer: 'continental plates'
    },
    {
        question: 'What is the shape and size of volcanic bombs',
        options: ['Round and small', 'Flat and large', 'Irregular and large', 'Streamlined and small'],
        answer: 'Irregular and large'
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
  