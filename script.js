//variables start

var startButtonEl = document.getElementById('start-btn');
var nextButtonEl = document.getElementById('next-btn');
var resultsEl = document.getElementById('results');
var questionContainerEl = document.getElementById('question-container');
startButtonEl.addEventListener('click', startGame);
var questionEl = document.getElementById('question');
var answerBtnEl = document.getElementById('answer-buttons');
nextButtonEl.addEventListener('click', () =>{
    currentQuestionsIndex++
    NextQuestion();
})


var shuffledQuestions, currentQuestionsIndex;
// variables end 
// functions
function startGame() {
    console.log('started');
    startButtonEl.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5); //generate random number to shuffle up questions
    currentQuestionsIndex = 0;
    questionContainerEl.classList.remove('hide');
    NextQuestion();
}

function NextQuestion() {
    reset();
    console.log('next question');
    showQuestion(shuffledQuestions[currentQuestionsIndex]);
    
}

function showQuestion(question) {
    console.log('show question');

    questionEl.innerText = question.question;
    question.answers.forEach(answers => {
        var button = document.createElement('button');
        button.innerText = answers.text;
        button.classList.add('btn');
        if (answers.correct) {
            button.dataset.correct = answers.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerBtnEl.appendChild(button);
    });
}

function reset(){
    clearStatusClass(document.body);
    console.log('reset');
    nextButtonEl.classList.add('hide'); //hide next button
    while (answerBtnEl.firstChild){ //loop through 
        answerBtnEl.removeChild(answerBtnEl.firstChild);
    }
    resultsEl.innerText = '';
}

function selectAnswer(e) {
    var selectABtn = e.target;
    var correct = selectABtn.dataset.correct;
    setStatusClass(document.body, correct)
    if (correct){
        resultsEl.innerText = 'Correct!';
    } else {
        resultsEl.innerText = 'Incorrect!';
    }
    Array.from(answerBtnEl.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionsIndex + 1){ //if there is more questions 
    nextButtonEl.classList.remove('hide');
    } else {
        startButtonEl.innerText = 'Restart'; //restart the quiz
        startButtonEl.classList.remove('hide');
    }
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        
        element.classList.add('correct')
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong');
}

var questions = [
    {
        question: 'what is 2+2',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
        
    },
    {
        question: 'When a user views a page containing a JavaScript program, which machine actually executes the script?',
        answers: [
            { text: 'd', correct: true },
            { text: 'f', correct: false }
        ]
        
    },
    
]