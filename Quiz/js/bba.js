const quizData = [
    {
        question: 'What is the primary cause of the spectral lines in the hydrogen atomic spectrum?',
        options: [
            'Transitions between energy levels',
            'Thermal vibration of atoms',
            'Nuclear reactions',
            'Interaction with magnetic fields'
        ],
        answer: 'Transitions between energy levels',
    },
    {
        question: 'The square of the wave function represents the:',
        options: [
            'Energy of the particle',
            'Momentum of the particle',
            'Probability density',
            'Wavelength of the particle'
        ],
        answer: 'Probability density',
    },
    {
        question: 'On which quantum numbers does the radial wave function rely?',
        options: [
            'Principal quantum number',
            'Azimuthal quantum number',
            'Magnetic quantum number',
            'Spin quantum number'
        ],
        answer: 'Principal quantum number',
    },
    {
        question: 'Slater\'s rules are used for calculating:',
        options: [
            'Electronegativity',
            'Effective nuclear charge',
            'Bond energy',
            'Ionization energy'
        ],
        answer: 'Effective nuclear charge',
    },
    {
        question: 'What is the hybridization of carbon in CO₂?',
        options: [
            'sp',
            'sp²',
            'sp³',
            'dsp²'
        ],
        answer: 'sp',
    },
    {
        question: 'What is the difference in bonding between Na and NaCl?',
        options: [
            'Ionic bonding in NaCl and covalent bonding in Na',
            'Metallic bonding in Na and ionic bonding in NaCl',
            'Covalent bonding in both',
            'Metallic bonding in NaCl and ionic bonding in Na'
        ],
        answer: 'Metallic bonding in Na and ionic bonding in NaCl',
    },
    {
        question: 'Which of the following is an example of lattice energy?',
        options: [
            'Energy released during bond formation',
            'Energy required to convert a gas into a solid',
            'Energy required to break ionic bonds in a crystal lattice',
            'Energy absorbed by an electron during excitation'
        ],
        answer: 'Energy required to break ionic bonds in a crystal lattice',
    },
    {
        question: 'The structure of PCl₅ is:',
        options: [
            'Tetrahedral',
            'Trigonal bipyramidal',
            'Square planar',
            'Octahedral'
        ],
        answer: 'Trigonal bipyramidal',
    },
    {
        question: 'What is shielding or screening effect?',
        options: [
            'Reduction in nuclear charge experienced by outer electrons',
            'Increase in nuclear charge experienced by inner electrons',
            'Interaction between nucleus and valence electrons',
            'None of the above'
        ],
        answer: 'Reduction in nuclear charge experienced by outer electrons',
    },
    {
        question: 'What is the correct relationship between de Broglie wavelength and momentum?',
        options: [
            'λ = h / p',
            'λ = p / h',
            'λ = h * p',
            'λ = h² / p²'
        ],
        answer: 'λ = h / p',
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
  