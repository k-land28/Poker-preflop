const questions = [
  {
    text: "UTGがオープンした後、BTNから3ベットが返された。このときのBTNの正しいアクションは？",
    heroPos: "BTN",
    villainPos: "UTG",
    options: ["4ベット", "フォールド", "コール"],
    answer: "4ベット"
  },
  {
    text: "誰もオープンしていない状態でHJからのオープン。このときのCOの正しいアクションは？",
    heroPos: "CO",
    villainPos: "HJ",
    options: ["オープンレイズ", "フォールド", "コール"],
    answer: "オープンレイズ"
  },
  {
    text: "SBがオープンした後、BBから3ベットが返された。このときのSBの正しいアクションは？",
    heroPos: "SB",
    villainPos: "BB",
    options: ["4ベット", "フォールド", "コール"],
    answer: "フォールド"
  }
];

const positions = ["UTG", "HJ", "CO", "BTN", "SB", "BB"];

let currentQuestion = 0;

function placePositionsOnEllipse() {
  const table = document.querySelector('.table');
  const cx = table.clientWidth / 2;
  const cy = table.clientHeight / 2;
  const a = cx - 40;
  const b = cy - 20;

  positions.forEach((pos, i) => {
    const el = document.getElementById(pos);
    const angle = (2 * Math.PI / positions.length) * i - Math.PI / 2;
    const x = cx + a * Math.cos(angle) - el.offsetWidth / 2;
    const y = cy + b * Math.sin(angle) - el.offsetHeight / 2;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  });
}

function displayQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("situationText").textContent = q.text;

  // 全ポジションリセット
  positions.forEach(pos => {
    const el = document.getElementById(pos);
    el.style.backgroundColor = "rgba(0, 255, 255, 0.1)";
    el.style.boxShadow = 'none';
  });

  // ヒーロー（自分）強調
  if (q.heroPos) {
    const heroEl = document.getElementById(q.heroPos);
    heroEl.style.backgroundColor = "#ffcc00";
    heroEl.style.boxShadow = '0 0 10px 3px #ffcc00';
  }
  // 相手強調
  if (q.villainPos) {
    const villainEl = document.getElementById(q.villainPos);
    villainEl.style.backgroundColor = "#ff0066";
    villainEl.style.boxShadow = '0 0 10px 3px #ff0066';
  }

  // ボタン表示
  const btnArea = document.getElementById("actionButtons");
  btnArea.innerHTML = "";
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    btnArea.appendChild(btn);
  });

  document.getElementById("resultText").textContent = "";
}

function checkAnswer(selected) {
  const q = questions[currentQuestion];
  const result = document.getElementById("resultText");
  if (selected === q.answer) {
    result.textContent = "正解！🎉";
    result.style.color = "#00ff00";
    result.style.textShadow = "0 0 15px #00ff00";
  } else {
    result.textContent = `不正解… 正解は「${q.answer}」です`;
    result.style.color = "#ff4444";
    result.style.textShadow = "0 0 15px #ff4444";
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    currentQuestion = 0;
  }
  displayQuestion();
}

window.addEventListener('resize', placePositionsOnEllipse);
window.addEventListener('load', () => {
  placePositionsOnEllipse();
  displayQuestion();
});
