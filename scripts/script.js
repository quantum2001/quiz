let fetchedQuestions = JSON.parse(sessionStorage.getItem("questionstesting"));

for (let i = 0; i < fetchedQuestions.length; i++) {
  if (
    fetchedQuestions[i].question != null ||
    fetchedQuestions[i].question != ""
  ) {
    document.getElementById(
      "question-list"
    ).innerHTML += `<div class="question">
    <form>
      <p>
        <span class="question-sn"></span>. ${fetchedQuestions[i].question}
      </p>

    </form>
  </div>`;

    if (fetchedQuestions[i].type == "option") {
      for (k = 0; k < fetchedQuestions[i].options.length; k++) {
        document
          .querySelectorAll(".question")
          [i].querySelector("form").innerHTML += `
  <input type="radio" id="" value="${fetchedQuestions[i].options[k]}" /><span
        > ${fetchedQuestions[i].options[k]}</span
      ><br />
  `;
      }
    } else if (fetchedQuestions[i].type == "german") {
      document
        .querySelectorAll(".question")
        [i].querySelector("form").innerHTML += `<input type="text" /> <br />
  `;
    } else if (fetchedQuestions[i].type == "code") {
      document
        .querySelectorAll(".question")
        [i].querySelector(
          "form p"
        ).innerHTML += `<br /><code>${fetchedQuestions[i].code}</code>`;
      document
        .querySelectorAll(".question")
        [i].querySelector("form").innerHTML += `<input type="text" /> <br />
  `;
    }
  }
}

let forms = document.getElementsByTagName("form");

for (let i = 0; i < forms.length; i++) {
  let form = forms[i];
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

document.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 20 || document.body.scrollTop > 20) {
    document.getElementsByClassName("nav")[0].style.backgroundColor = "#ddd";
  } else {
    document.getElementsByClassName("nav")[0].style.backgroundColor =
      "rgba(0, 0, 0, 0)";
  }
});

let click = sessionStorage.getItem("clicked");
console.log(typeof click);
if (click == null || click == "" || click != "1") {
  document.getElementById("container").style.display = "none";
  alert("Wrong Gateway");
  location.replace("index.html");
}

let test = sessionStorage.getItem("test");
document.getElementById("test-title").innerHTML = test;

let questions = document.getElementsByClassName("question");

if (
  sessionStorage.getItem("mins") == null &&
  sessionStorage.getItem("secs") == null
) {
  sessionStorage.setItem("mins", "10");
  sessionStorage.setItem("secs", "0");
}

let scores = 0;
let mins = parseInt(sessionStorage.getItem("mins"));
let secs = parseInt(sessionStorage.getItem("secs"));
let answered = 0;
let currentQuestion = 0;
if (mins < 10 && secs < 10) {
  document.getElementById("time").innerHTML = "0" + mins + ":" + "0" + secs;
} else if (mins < 10) {
  document.getElementById("time").innerHTML = "0" + mins + ":" + secs;
} else if (secs < 10) {
  document.getElementById("time").innerHTML = +mins + ":" + "0" + secs;
} else {
  document.getElementById("time").innerHTML = +mins + ":" + secs;
}
function selectedAnswers() {}
function addAnswer(question, answer) {
  eval(
    `selectedAnswers.prototype.${question} = '${answer.toLocaleLowerCase()}'`
  );
  answeredQuestions();
}

for (let i = 0; i < questions.length; i++) {
  let labels = questions[i].querySelectorAll('input[type="radio"]');
  for (let j = 0; j < labels.length; j++) {
    let attr = document.createAttribute("name");
    attr.value = `question-${i + 1}`;
    labels[j].setAttributeNode(attr);
    labels[j].addEventListener("click", () => {
      addAnswer(`q${i + 1}`, labels[j].value);
    });
  }
  if (questions[i].querySelector('input[type="text"]')) {
    let input = questions[i].querySelector('input[type="text"]');
    input.addEventListener("keyup", () => {
      addAnswer(`q${i + 1}`, input.value);
    });
  }
}

function countDown() {
  if (secs == 0 && mins > 0) {
    mins--;
    secs = 59;
    sessionStorage.setItem("mins", `${mins}`);
    sessionStorage.setItem("secs", `${secs}`);
  } else {
    secs--;
    sessionStorage.setItem("secs", `${secs}`);
  }
  if (mins == 0 && secs == 0) {
    document.getElementById("time").innerHTML = "0" + mins + ":" + "0" + secs;
    let sessionTest = sessionStorage.getItem("test");
    calculateScores(test);
    clearInterval(interval);
  }
  if (mins < 10 && secs < 10) {
    document.getElementById("time").innerHTML = "0" + mins + ":" + "0" + secs;
  } else if (mins < 10) {
    document.getElementById("time").innerHTML = "0" + mins + ":" + secs;
  } else if (secs < 10) {
    document.getElementById("time").innerHTML = +mins + ":" + "0" + secs;
  } else {
    document.getElementById("time").innerHTML = +mins + ":" + secs;
  }
}
let interval = setInterval(countDown, 1000);

function nextQuestion() {
  for (let i = 0; i < questions.length; i++) {
    questions[i].style.display = "none";
  }
  if (questions.length - 1 > currentQuestion) {
    currentQuestion++;
    questions[currentQuestion].style.display = "block";
  } else {
    currentQuestion = questions.length - 1;
    questions[currentQuestion].style.display = "block";
  }
}

function prevQuestion() {
  for (let i = 0; i < questions.length; i++) {
    questions[i].style.display = "none";
  }
  if (currentQuestion > 0) {
    currentQuestion--;
    questions[currentQuestion].style.display = "block";
  } else {
    currentQuestion = 0;
    questions[currentQuestion].style.display = "block";
  }
}

document.getElementById("finish").addEventListener("click", () => {
  calculateScores(sessionStorage.getItem("test"));
});

for (let i = 0; i < questions.length; i++) {
  questions[i].style.display = "none";
}
questions[0].style.display = "block";
let questionSn = document.getElementsByClassName("question-sn");
for (let j = 0; j < questionSn.length; j++) {
  questionSn[j].innerHTML = j + 1;
}
document.getElementById("total-question").innerHTML = questions.length;

function answeredQuestions() {
  answered = 0;
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].querySelectorAll('input[type="radio"]')) {
      let labels = questions[i].querySelectorAll('input[type="radio"]');
      for (let k = 0; k < labels.length; k++) {
        if (labels[k].checked) {
          answered++;
        }
      }
    }

    if (questions[i].querySelector('input[type="text"]')) {
      let input = questions[i].querySelector('input[type="text"]');
      if (input.value == "" || input.value == null) {
        answered = answered;
      } else {
        answered++;
      }
    }
  }

  document.getElementById("question-answered").innerHTML = answered;
}
answeredQuestions();
function calculateScores(test) {
  for (let i = 0; i < questions.length; i++) {
    console.log(i);
    let answer = fetchedQuestions[i].answer;
    let selectedAnswer = eval(`selectedAnswers.prototype.q${i + 1}`);
    if (answer == selectedAnswer) {
      scores++;
    }
  }
  // sessionStorage.setItem("answers", JSON.stringify(eval(test + "answers")));
  sessionStorage.setItem(
    "selectedAnswers",
    JSON.stringify(selectedAnswers.prototype)
  );
  sessionStorage.setItem("clicked", "0");
  location.replace("result.html");
}
//Developed and created by Samuel Lawal Oluwafemi
// samurai
