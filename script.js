//variables start

var startButtonEl = document.getElementById('start-btn');
var nextButtonEl = document.getElementById('next-btn');
var resultsEl = document.getElementById('results');
var finalScoreEl = document.getElementById('finalScore');
var questionContainerEl = document.getElementById('question-container');
startButtonEl.addEventListener('click', startGame);
var questionEl = document.getElementById('question');
var answerBtnEl = document.getElementById('answer-buttons');
var nameEntryEl = document.getElementById('name-entry');
var nameForm = document.querySelector("#name-form");
var enterBtnEl = document.getElementById("enter-btn");
var timerEl = document.getElementById('timer');
var savedHighscore = [];
nextButtonEl.addEventListener('click', () =>{
    currentQuestionsIndex++
    NextQuestion();
})

var finalScore = 0;

var shuffledQuestions, currentQuestionsIndex;
// variables end 
// functions
function startGame() {
    console.log('started');
    startButtonEl.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5); //generate random number to shuffle up questions
    currentQuestionsIndex = 0;
    questionContainerEl.classList.remove('hide');
    // timerFunction();
    NextQuestion();

}

// function timerFunction(){
// //timer
// var timeLeft = questions.length * 15;
// var timeInterval = setInterval(function () {
//     timerEl.textContent = ("Time: ") + timeLeft;
//     timeLeft--;
//     // timerText.textContent = "";
//     if (timeLeft === 0) {
//         timerEl.textContent = "Time: 0";
//         clearInterval(timeInterval);
//     }
//     if  (gameEnd === true) {
//         clearInterval(timeInterval);
//     }
// }, 1000);
// //end time


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
    finalScore = 0;
    nameEntryEl.classList.add('hide');
    enterBtnEl.classList.add('hide');
    finalScoreEl.classList.add('hide');
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
        finalScore++;
        timerEl.innerText = 'Score: ' + finalScore;
    } else {
        resultsEl.innerText = 'Incorrect!';
        timerEl.innerText = 'Score: ' + finalScore;
        console.log(finalScore);
    }
    Array.from(answerBtnEl.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionsIndex + 1){ //if there is more questions 
    nextButtonEl.classList.remove('hide');
    } else {
        if (correct){
            finalScore++;
            timerEl.innerText = 'Score: ' + finalScore;
        }
        finalScoreEl.classList.remove('hide');
        timerEl.innerText = 'Score: ' + finalScore;
        score();
    }
}

function score(){
    
    questionContainerEl.classList.add('hide');
    enterBtnEl.classList.remove('hide');
    resultsEl.innerText = 'All done!';
    finalScoreEl.innerText = 'Your final score: ' + finalScore;
    timerEl.innerText = 'Score: ' + finalScore;
    startButtonEl.innerText = 'Restart'; //restart the quiz
    startButtonEl.classList.remove('hide');
    nameForm.classList.remove('hide');
    nameEntryEl.classList.remove('hide');

}

//submit function for adding name and storing to local storage
function submitName(){
    
    // nameForm.addEventListener("submit", function(event){
        // event.preventDefault();

        var nameText = nameEntryEl.value.trim();

        // Return from function early if submitted todoText is blank
        if (nameText === "") {
          return;
        }
        savedHighscore.push(nameText);
        nameEntryEl.value = "";
        storeHighscore();
        // nameEntryEl.classList.add('hide');
        
        submitName();
    }

    function storeHighscore() {
        // Stringify and set name and highscore in localStorage
        localStorage.setItem("savedHighscore", JSON.stringify(savedHighscore));
        console.log(savedHighscore);
      }


    // localStorage.setItem('name',nameEntryEl);

    // todoForm.addEventListener("submit", function(event) {
    //     event.preventDefault();
      
    //     var todoText = todoInput.value.trim();
      
    //     // Return from function early if submitted todoText is blank
    //     if (todoText === "") {
    //       return;
    //     }
      
    //     // Add new todoText to todos array, clear the input
    //     todos.push(todoText);
    //     todoInput.value = "";
      
    //     // Store updated todos in localStorage, re-render the list
    //     storeTodos();
    //     renderTodos();
    //   });


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
        question: 'What are variables used for in JavaScript Programs?',
        answers: [
            { text: 'Storing numbers, dates, or other values', correct: true },
            { text: 'Varying randomly', correct: false },
            { text: 'Causing high-school algebra flashbacks', correct: false },
            { text: 'None of the above', correct: false },

        ]
        
    }
    ,
    {
        question: 'When a user views a page containing a JavaScript program, which machine actually executes the script?',
        answers: [
            { text: 'A. The Users machine running a Web browser', correct: true },
            { text: 'B. The Web server', correct: false },
            { text: 'C.  A central machine deep within Netscapes corporate offices', correct: false},
            { text: 'D.  None of the above', correct: false}
        ]
        
    // },
    // {
    //     question: 'Which of the following are capabilities of functions in JavaScript?',
    //     answers: [
    //         { text: 'Return a value', correct: false },
    //         { text: 'Accept parameters and Return a value', correct: false },
    //         { text: 'Accept parameters', correct: true},
    //         { text: 'None of the above', correct: false}
    //     ]
        
    // },
    // {
    //     question: '______ tag is an extension to HTML that can enclose any number of JavaScript statements.',
    //     answers: [
    //         { text: '<BODY>', correct: false },
    //         { text: '<SCRIPT>', correct: true },
    //         { text: '<HEAD>', correct: false},
    //         { text: '<TITLE>', correct: false}
    //     ]
        
    // },
    // {
    //     question: 'Using _______ statement is how you test for a specific condition.',
    //     answers: [
    //         { text: 'Select', correct: false },
    //         { text: 'Switch', correct: false },
    //         { text: 'For', correct: false},
    //         { text: 'If', correct: true}
    //     ]
        
    // },
    // {
    //     question: 'Which one is not an operator',
    //     answers: [
    //         { text: '===', correct: false },
    //         { text: '==', correct: false },
    //         { text: '>', correct: false},
    //         { text: '&', correct: true}
    //     ]
        
    // },
    // {
    //     question: 'Which one is not a Javascript loop?',
    //     answers: [
    //         { text: 'while-do', correct: true },
    //         { text: 'do-while', correct: false },
    //         { text: 'while', correct: false},
    //         { text: 'for', correct: false}
    //     ]
        
    } 
]