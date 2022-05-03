let questions = [
    {
      title: "How Many Days did it take to make JavaScript? ",
      choices: ["30 Days", "365 Days", "10 Days", "1 Day"],
      answer: "10 Days",
    },
    {
      title: "What does HTML stand for?",
      choices: ["Hypertext Markup Language","Hypertool Markup Language","HighText Makeup Language","None of the above",],
      answer: "Hypertext Markup Language",
    },
    {
      title: "What year did JavaScript get invented?",
      choices: ["2000", "2005", "1997", "1995"],
      answer: "1995",
    },
    {
      title: "Is Java and JavaScript the same?",
      choices: ["There's a difference?", "Maybe", "Yes", "No"],
      answer: "No",
    },
    {
      title: "Who Created JavaScript?",
      choices: ["Jake from StateFarm", "Aliens", "Bill Gates", "Brendan Eich"],
      answer: "Brendan Eich",
    },
  ];
  
  // define other variables
  var currentQuestionIndex = 0;
  var time = questions.length * 12;
  var timerId;
  
  var questionsElement = document.querySelector("#questions");
  var timerElement = document.querySelector("#time");
  var choicesElement = document.querySelector("#choices");
  var feedbackElement = document.querySelector("#feedback");
  var submitButton = document.querySelector("#submit");
  var startButton = document.querySelector("#start");
  var initialsElement = document.querySelector("#initials");
  
  // timer starts
  function startQuiz() {
    var startScreenElement = document.querySelector("#start_screen");
    startScreenElement.setAttribute("class", "hide");
  
    questionsElement.removeAttribute("class");
  
    timerId = setInterval(clockTicking, 1000);
  
    timerElement.textContent = time;
  
    showQuiz();
  }
  
  // show questions and choices
  function showQuiz() {
    var currentQuestion = questions[currentQuestionIndex];
  
    var titleElement = document.querySelector("#question-title");
    titleElement.textContent = currentQuestion.title;
  
    choicesElement.innerHTML = "";
  
    currentQuestion.choices.forEach(function (choice, i) {
      var choiceNode = document.createElement("button");
      choiceNode.setAttribute("class", "choice");
      choiceNode.setAttribute("value", choice);
  
      choiceNode.textContent = i + 1 + ". " + choice;
  
      choiceNode.onclick = questionClick;
  
      choicesElement.appendChild(choiceNode);
    });
  }
  
  function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
      // time penalty
      time -= 10;
  
      if (time < 0) {
        time = 0;
      }
  timerElement.textContent = time;
  
      // after question is answered, show if correct or wrong
      feedbackElement.textContent = "NOPE!";
    } else {
      feedbackElement.textContent = "NICE!";
    }
  
    feedbackElement.setAttribute("class", "feedback");
    setTimeout(function () {
      feedbackElement.setAttribute("class", "feedback hide");
    }, 1000);
  
    // next question
    currentQuestionIndex++;
  
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      showQuiz();
    }
  }
  
  function quizEnd() {
    // stop timer
    clearInterval(timerId);
  
    // show end screen
    var endScreenElement = document.querySelector("#end-screen");
    endScreenElement.removeAttribute("class");
  
    // show final score
    var finalScoreElement = document.querySelector("#final-score");
    finalScoreElement.textContent = time;
  
    // hide questions section
    questionsElement.setAttribute("class", "hide");
  }
  
  function clockTicking() {
    // update time
    time--;
    timerElement.textContent = time;
  
    // end quiz when time is over
    if (time <= 0) {
      quizEnd();
    }
  }
  
  function saveHighscore() {
    var initials = initialsElement.value.trim();
  
    // if initials not blank save to local storage
    if (initials !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
  
      var newScore = {
        score: time,
        initials: initials,
      };
  
      // push to localstorage
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
  
      // redirect to scores page
      window.location.href = "highscore.html";
    }
  }
  
  // button to submit initials
  submitButton.onclick = saveHighscore;
  
  // button to start quiz
  startButton.onclick = startQuiz;