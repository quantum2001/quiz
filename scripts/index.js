sessionStorage.clear();
document
  .getElementsByClassName("content-body")[0]
  .addEventListener("scroll", () => {
    if (
      document.documentElement.getElementsByClassName("content-body")[0]
        .scrollTop > 20 ||
      document.body.getElementsByClassName("content-body")[0].scrollTop > 20
    ) {
      document.getElementsByClassName("nav")[0].style.backgroundColor = "#ddd";
    } else {
      document.getElementsByClassName("nav")[0].style.backgroundColor =
        "rgba(0, 0, 0, 0)";
    }
  });
if (
  sessionStorage.getItem("username") != null &&
  sessionStorage.getItem("department") != null
) {
  document.getElementById("username").style.display = "none";
  document.getElementById("department").style.display = "none";
  document.getElementById("user-name").innerHTML = sessionStorage.getItem(
    "username"
  );
  document.getElementById("dept").innerHTML = sessionStorage.getItem(
    "department"
  );
}

function startTest(url, test) {
  let username = document.getElementById("username");
  let department = document.getElementById("department");
  let errorMessage = document.getElementById("error-message");
  if (
    (sessionStorage.getItem("username") == null &&
      sessionStorage.getItem("department") == null) ||
    sessionStorage.getItem !== test
  ) {
    if (username.value == "" && department.value == "") {
      errorMessage.innerHTML = "Please Fill in the required fields";
    } else if (username.value == "" || department.value == "") {
      errorMessage.innerHTML = "Please Fill in the required fields";
    } else {
      sessionStorage.setItem("username", username.value);
      sessionStorage.setItem("department", department.value);
      sessionStorage.setItem("clicked", "1");
      sessionStorage.setItem("test", test);
      let testQuestions = [];

      fetch("data/questions.json")
        .then(async (response) => {
          let quest = await response.json();
          return quest;
        })
        .then((data) => {
          question = eval(`data.${test}`);
          console.log(question);
          return question;
        })
        .then((questions) => {
          sessionStorage.setItem("mins", questions.timeInMins);
          sessionStorage.setItem("secs", "0");
          sessionStorage.setItem(
            "totalquestion",
            JSON.stringify(questions.numberOfQuestionsToBeAnswered)
          );
          let randomQuestions = [];
          while (
            randomQuestions.length < questions.numberOfQuestionsToBeAnswered
          ) {
            let random = Math.floor(Math.random() * questions.questions.length);
            let isRandom = true;
            for (i = 0; i < randomQuestions.length; i++) {
              if (randomQuestions[i] === random) {
                isRandom = false;
              }
            }
            if (isRandom) {
              randomQuestions.push(random);
            }
          }

          for (i = 0; i < randomQuestions.length; i++) {
            testQuestions.push(questions.questions[randomQuestions[i]]);
          }

          sessionStorage.setItem(
            "questionstesting",
            JSON.stringify(testQuestions)
          );
          location.replace(url);
        });
    }
  }
}

function searchQuiz(input) {
  let testButtons = document.querySelectorAll(".test-button");
  let exists = true;
  for (i = 0; i < testButtons.length; i++) {
    let buttonText = testButtons[i].textContent.toLowerCase();
    if (buttonText.indexOf(input) > -1) {
      testButtons[i].style.display = "inline";
      document.getElementById(
        "search-error"
      ).innerHTML = `results for ${input}`;
    } else {
      testButtons[i].style.display = "none";
      document.getElementById(
        "search-error"
      ).innerHTML = `results for ${input}`;
    }
  }
  if (input == "" || input == null) {
    document.getElementById("search-error").innerHTML = ``;
  }
}
