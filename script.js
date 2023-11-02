const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next');
const resultElement = document.getElementById('result');

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Fetch questions from the JSON file
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        displayQuestion();
    });

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionsElement.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.innerText = option;
        optionButton.addEventListener('click', () => checkAnswer(option, index));
        optionsElement.appendChild(optionButton);
    });

    nextButton.style.display = 'none';
}

function checkAnswer(selectedOption, index) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correct) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    displayQuestion();
});

function showResult() {
    questionElement.innerText = 'ThankYou for completing!';
    optionsElement.innerHTML = '';
    resultElement.innerText = `Your Score is ${score} out of ${questions.length}`;
}