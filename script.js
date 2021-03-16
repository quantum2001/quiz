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

if (
  location.hash != "#" + sessionStorage.getItem("hash") ||
  location.hash == "" ||
  location.hash == "#"
) {
  document.getElementById("quiz-container").style.display = "none";
  alert("Wrong Gateway");
  location.replace("index.html");
}
let test = sessionStorage.getItem("test");
document.getElementById("test-title").innerHTML = test;

let questions = document.getElementsByClassName("question");

let CPT211answers = {
  q1: "public",
  q2: "c. structural programming",
  q3: "d. member function",
  q4: "1 byte",
  q5: "object oriented analysis and design",
  q6: "void",
  q7: "class",
  q8: "main",
  q9: "bjarne stroustrup",
  q10: "20",
  q11: "c. implementation dependent",
  q12: "12",
  q13: "primitive datatype",
  q14: "b. main function",
  q15: "inheritance",
  q16: "4 bytes",
  q17: "dot operator",
  q18: "user defined",
  q19: "b. false",
  q20: "255",
};

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
    console.log(sessionTest);
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
  console.log(test);

  for (let i = 1; i <= questions.length; i++) {
    if (test == "CPT211") {
      let answer = eval(`${test}answers.q${i}`);
      let selectedAnswer = eval(`selectedAnswers.prototype.q${i}`);
      if (answer == selectedAnswer) {
        scores++;
      }
    }
  }
  sessionStorage.setItem("answers", JSON.stringify(eval(test + "answers")));
  sessionStorage.setItem(
    "selectedAnswers",
    JSON.stringify(selectedAnswers.prototype)
  );
  // let username = sessionStorage.getItem("username");
  // let department = sessionStorage.getItem("department");
  // if (scores < questions.length / 2) {
  //   alert(
  //     `${username} (${department}) your score is ${scores} : Below Average, Pratice More `
  //   );
  // } else if (scores > questions.length * 0.7) {
  //   alert(
  //     `${username} (${department}) your score is ${scores} : Excellent Result`
  //   );
  // } else {
  //   alert(`${username} (${department}) your score is ${scores} : Good`);
  // }

  location.replace("result.html");
}
//Developed and created by Samuel
