const positions = ["UTG", "HJ", "CO", "BTN", "SB", "BB"];

const questions = {
  open: [
    { question: "Your Position: CO", hero: "CO" },
    { question: "Your Position: BTN", hero: "BTN" },
  ],
  cold: [
    { question: "Open Raise: CO\nYour Position: BTN", opener: "CO", hero: "BTN" },
    { question: "Open Raise: HJ\nYour Position: BB", opener: "HJ", hero: "BB" },
  ],
  vs3bet: [
    { question: "You Opened: HJ\n3Bet from BTN\nYour Position: HJ", opener: "HJ", hero: "HJ", vs3bet: true },
  ]
};

let currentTab = "open";
let currentQuestionIndex = 0;

function updateQuestion() {
  const question = questions[currentTab][currentQuestionIndex];
  document.getElementById("question-text").innerText = question.question;

  positions.forEach(pos => {
    const el = document.getElementById(pos);
    el.classList.remove("hero", "open");
  });

  if (question.hero) document.getElementById(question.hero).classList.add("hero");
  if (question.opener) document.getElementById(question.opener).classList.add("open");

  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  let options = [];

  if (currentTab === "open") {
    options = ["Fold", "Open"];
  } else if (currentTab === "cold") {
    options = ["Fold", "Call", "3Bet"];
  } else if (currentTab === "vs3bet") {
    options = ["Fold", "Call", "4Bet"];
  }

  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => alert(`You selected: ${opt}`);
    optionsContainer.appendChild(btn);
  });
}

document.querySelectorAll(".tab-button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentTab = btn.dataset.tab;
    currentQuestionIndex = 0;
    updateQuestion();
  });
});

window.onload = updateQuestion;
