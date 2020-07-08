var questions = [
    {
      title: 'Commonly used data types DO NOT include:',
      choices: ['strings', 'booleans', 'alerts', 'numbers'],
      answer: 'alerts'
    },
    {
      title: 'The condition in an if / else statement is enclosed within ____.',
      choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
      answer: 'parentheses'
    }
];

  localStorage.setItem("questions", JSON.stringify(questions));












var body = document.body;
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var startButton = document.getElementById('start');
var highScoresHTML = document.getElementById('high-scores');

var j = 0;
var direction = 0;
var time = 10;
var timeInterval;
var scores = [];
var isFinal = true;

//begins quiz
startButton.onclick = function() { 
    event.preventDefault();
   
    document.getElementById("start").style.display = "none"
    
    //starts timer
    startTime();
    //sets up quiz
    buildQuiz();
};


//determines time interval
function startTime() {
    if(isFinal) {
        timeInterval = setInterval(clockTick, 1000);
    }
    return;
  }

  //decrements timer and ouputs it to screen
function clockTick() {
    time--;
    document.getElementById("txt").textContent = "Seconds: " + time;

    if(time <= 0) {
        time = 0;
        isFinal = false;
        finalPage();
        return;
    }
}

//creates questions and possible answers
function buildQuiz(){
    //retrieves array from JSON
    var questions = JSON.parse(localStorage.getItem("questions"));
    var ul = document.createElement("ul");
    var div = document.createElement("div");
    div.setAttribute("id", j);

    body.appendChild(ul);

    //creates question
    var h1 = document.createElement("h1");
    h1.textContent = questions[j].title;
    div.appendChild(h1);
    quizContainer.appendChild(div);

    //creates button options
    for(var i = 0; i < 4; ++i) {
        var button = document.createElement("button");
        button.textContent = questions[j].choices[i];
        button.setAttribute("answer", questions[j].answer);
        button.setAttribute("id", i);
        ul.appendChild(button);
            

        button.onclick = questionClick;
        
        if(!isFinal) {
            return;
        }
    }

    div.appendChild(ul);
}

//determines whether button click was correct, if questions still remain, calls build quiz again
function questionClick() {
    //console.log(this.textContent === questions[j].answer);

    if(this.textContent === questions[j].answer) {
        //correct, either triggers final page if last question or builds quiz again with new question
        alert("You're right!");
        document.getElementById(j).style.display = "none";
        j++;
        if(j >= questions.length) {
            document.getElementById(j).style.display = "none";
            isFinal = false;
            finalPage();
            return;
        } else {
            buildQuiz();
            console.log(j);
        }
        
    } else {
        //decrements five seocnds from timer if question is incorrect, triggers final page if no more questions
        alert("You're wrong.");

        changeTime(-5);

        if(!isFinal) {
            return;
        }

        document.getElementById(j).style.display = "none";
        j++;
        if(j >= questions.length) {
            document.getElementById(j).style.display = "none";
            isFinal = false;
            finalPage();
            return;
        } else {
            buildQuiz();
            console.log(j);
        }
    }
}

function changeTime(direction) {
    //console.log(time);
    time += direction;
    if(time <= 0) {
        time = 0;
        isFinal = false;
        finalPage();
        return;
    }
}

//outputs score and prompts for initials, stores in local storage
function finalPage() {
    clearInterval(timeInterval);

    quizContainer.style.display = "none";

    document.getElementById("txt").style.display = "none";
    
    resultsContainer.innerHTML = "<h1> Your score: " + time + "</h1>";

    var initialsIn = prompt("Enter your initials: ");

    var initScores = {initials: initialsIn, score: time};

    
    scores.push(initScores);

    localStorage.setItem("high-scores", JSON.stringify(scores));

    printScores();

}

//prints highscores
function printScores() {
    var highScores = JSON.parse(localStorage.getItem("high-scores"));
    
    for(var i = 0; i < highScores.length; ++i) {
        resultsContainer.innerHTML = "<h1>" + highScores[i].initials + "          " + highScores[i].score + "</h1>";
        //highScoresHTML.appendChild(highScores[i].initials + " " + highScores[i].score);
    }

    //Go Back, set j = 0; time = 10
    //Clear High Scores

    // var goBackDiv = document.createElement("div");
    // var goBack = document.createElement("button");
    // goBack.innerHTML = "Go Back";
    // body.appendChild(goBackDiv);
    // goBackDiv.appendChild(goBack);
    // goBackDiv.setAttribute("style", "text-align:center;");

    // goBack.onclick = function() {
    //     event.preventDefault();
    
    //     console.log("Hi");

    //     j = 0;
    //     time = 10;
        
    //     startTime();
    //     buildQuiz();
    // };

}
