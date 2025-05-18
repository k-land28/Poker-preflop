const positions = ["UTG", "HJ", "CO", "BTN", "SB", "BB"];

const questions = [
  {
    type: "open",
    heroPos: "HJ",
    text: "前に誰もいません。HJのあなた、アクションは？",
    options: ["Fold", "Open"],
    correct: "Open"
  },
  {
    type: "vsOpen",
    heroPos: "CO",
    villainPos: "UTG",
    text: "UTGがオープン。あなたはCO。どうする？",
    options: ["Fold", "Call", "3Bet"],
    correct: "3Bet"
  },
  {
    type: "vs3bet",
    heroPos: "BTN",
    villainPos: "BB",
    text: "あなたがBTNからオープンし、BBから3ベット。アクションは？",
    options: ["Fold", "Call", "4Bet"],
    correct: "Fold"
  },
];

let currentQuestion = 0;

function displayQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("situationText").textContent = q.text;

  // ハイライト
  positions.forEach(pos => {
    const el = document.getElementById(pos);
    el.style.backgroundColor = "#fff";
  });

  if (q.heroPos) {
    document.getElementById(q.heroPos).style.backgroundColor = "#ffcc00";
  }
  if (
