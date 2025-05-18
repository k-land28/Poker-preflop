const positions = ["UTG", "HJ", "CO", "BTN", "SB", "BB"];

const hands = {
  open: [
    { question: "Your Position: CO", hand: "AJo", correct: "open", position: "CO" },
    { question: "Your Position: BTN", hand: "KTs", correct: "open", position: "BTN" },
  ],
  cold: [
    { question: "Open Raise: CO\nYour Position: BTN", hand: "AQs", opener: "CO", self: "BTN", correct: "call" },
    { question: "Open Raise: UTG\nYour Position: BB", hand: "KQo", opener: "UTG", self: "BB", correct: "fold" },
  ],
  vs3bet: [
    { question: "You Opened from HJ\n3Bet by BTN\nYour Position: HJ", hand: "QQ", correct: "4bet" },
    { question: "You Opened from CO\n3Bet by SB\nYour Position: CO", hand: "ATs", correct: "fold" },
  ]
};

let currentMode = "open";
let currentQuestionIndex = 0;

const questionEl = document.getElementById("question");
const handEl = document.getElementById("hand");
const resultEl = document.getElementById("result");

function setPositions(opener, self) {
  document.querySelectorAll(".position").forEach(pos => {
    pos.classList.remove("highlight-open", "highlight-self");
    const label = pos.getAttribute("data-pos");
    if (label === opener) pos.classList.add("highlight-open");
    if (label === self) pos.classList.add("highlight-self");
  });
}

function showQuestion() {
  const questionSet = hands[currentMode];
  const data = questionSet[currentQuestionIndex];
  questionEl.textContent = data.question;
  handEl.textContent = `Your Hand: ${data.hand}`;
  resultEl.textContent = "";
  if (currentMode === "cold") {
    setPositions(data.opener, data.self);
  } else {
    setPositions(null, data.position || data.self);
  }
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentMode = tab.getAttribute("data-mode");
    currentQuestionIndex = 0;
    showQuestion();
  });
});

document.querySelectorAll(".option-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const choice = btn.getAttribute("data-choice");
    const correct = hands[currentMode][currentQuestionIndex].correct;
    resultEl.textContent = choice === correct ? "✅ Correct!" : `❌ Wrong (Correct: ${correct.toUpperCase()})`;
    currentQuestionIndex = (currentQuestionIndex + 1) % hands[currentMode].length;
    setTimeout(showQuestion, 1200);
  });
});

showQuestion();
