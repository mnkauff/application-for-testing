const questions = [
    {
        question: 'Закончите фразу: «И если я ношу кандибобер на голове, это не значит, что...»',
        type: 'choice',
        answers: ['Эту сумку мне муж купил', 'Я прошла афганскую войну', 'Я женщина или балерина'],
        correctAnswer: 'Я женщина или балерина'

    },
    {
        question: '«Сомнительно, но окэй» – главная мемная фраза 2023 года по праву принадлежит Олегу Тинькову.' +
            ' А какую из представленных фраз Олег НЕ произносил?',
        type: 'choice',
        answers: ['Совпадение? Не думаю.', 'Я это не понимаю, мне это не интересно', 'Я так чувствую, я не могу молчать'],
        correctAnswer: 'Совпадение? Не думаю.'
    },
    {
        question: 'Мем, в котором любят делиться своими бытовыми решениями и хвастаться ими перед одним известным ' +
            'американским миллиардером.' +
            ' К кому обращаются создатели мема с фразой "Как тебе такое...?',
        type: 'choice',
        answers: ['Стивен Хокинг', 'Илон Маск', 'Альберт Энштейн'],
        correctAnswer: 'Илон Маск'
    },
    {
        question: 'Качок Доге и Чимс – милые собачки из мема, ставшего популярным летом 2020 года. Какой они пароды?',
        type: 'choice',
        answers: ['Акита-Ину', 'Сиба-ину', 'Нихон-шпиц'],
        correctAnswer: 'Сиба-ину'
    },
    {
        question: 'Мем под названием «Джим Халперт Улыбается Через Жалюзи» используется в сети, чтобы выразить чувство, ' +
            'будто кто-то наблюдает за крушением поезда по собственной задумке, а сам выходит безнаказанным. ' +
            'Что это за сериал?',
        type: 'choice',
        answers: ['Бруклин 9-9', 'Офис', 'Парки и зоны отдыха'],
        correctAnswer: 'Офис'
    },
    {
        question: 'Продолжите фразу из мем-звонка: «С какой стати, вы меня извините?! Я скандал такой...',
        type: 'input',
        correctAnswer: 'учиню'
    },
    {
        question: 'Что сильнее всего, по мнению Доминика Торетто?',
        type: 'input',
        correctAnswer: 'Семья'
    }
];


const questionArea = document.getElementById('question-area');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const inputElement = document.getElementById('input');
const answerBtn = document.getElementById('answer-btn');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const resultsDiv = document.getElementById('results');
const nameHeader = document.getElementById('name-header');


let currentQuestionIndex = 0;
let score = 0;
startBtn.addEventListener('click', startTest)

function startTest() {
    questionArea.style.display = 'flex'
    startBtn.style.display = 'none';
    answerBtn.style.display = 'none';
    nameHeader.style.display = 'block'
    loadQuestion();
}
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    if( currentQuestion.type === 'choice' ) {
        inputElement.style.display = 'none';
        answerElement.innerHTML = '';
        currentQuestion.answers.forEach((answer) => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.addEventListener('click', () => {
                checkAnswer(answer);
            })
            button.classList.add('btn');
            answerElement.appendChild(button);
        })

    } else if ( currentQuestion.type === 'input' ) {
        answerElement.style.display = 'none';
        inputElement.style.display = 'block';
        inputElement.value = '';
        answerBtn.style.display = 'block';
    }
};


answerBtn.addEventListener('click', function(){
    const userAnswer = inputElement.value.trim();
    if (!userAnswer) {
        alert('Пожалуйста, введите ответ.');
        return;
    }
    checkAnswer(userAnswer);
    inputElement.value = '';
});


inputElement.addEventListener('keypress', function(e){
    if (e.key === 'Enter') {
        answerBtn.click();
        e.preventDefault();
    }
});


function checkAnswer(answer) {
    const currentQuestion = questions[currentQuestionIndex];
    const userClean = answer.toLowerCase().trim();
    const correctClean = currentQuestion.correctAnswer.trim().toLowerCase();
    if (userClean === correctClean) {
        score++;
        alert('Верно');
    } else {
        alert('Неверно');
    }
   nextQuestion()
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionArea.style.display = 'none';
    resultsDiv.style.display = 'block';
    restartBtn.style.display = 'block';
    resultsDiv.innerHTML = `
    <h2>Тест завершён!</h2>
    <p> Правильных ответов: ${score} из ${questions.length}</p>
    <p> Процент: ${Math.round((score/questions.length)*100)}%</p>
`;
    nameHeader.style.display = 'none';
}

restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    resultsDiv.style.display = 'none';
    restartBtn.style.display = 'none';
    nameHeader.style.display = 'none';
    answerElement.innerHTML = '';
    answerElement.style.display = 'flex';
    inputElement.style.display = 'none';
    answerBtn.style.display = 'none';

    startTest();
});