let mode = "vs_open"; // デフォルトはオープン判断モード
const positions = ["UTG", "MP", "CO", "BTN", "SB", "BB"];
const hands = ["AA", "KK", "QQ", "JJ", "TT", "AKs", "AQs", "AJs", "KQs", "AKo", "AQo", "AJo", "KQo"];
const actions = {
  vs_open: ["Fold", "Raise"],
  vs_cold: ["Fold", "Call", "3bet"]
};

function setMode(selectedMode) {
  mode = selectedMode;

  document.getElementById("btnOpen").classList.remove("active");
  document.getElementById("btnCold").classList.remove("active");
  if (mode === "vs_open") {
    document.getElementById("btnOpen").classList.add("active");
  } else {
    document.getElementById("btnCold").classList.add("active");
  }

  generateSituation();
}

function generateSituation() {
  clearSeatStyles();

  const heroIndex = Math.floor(Math.random() * 6);
  let openerIndex = null;
  if (mode === "vs_cold") {
    do {
      openerIndex = Math.floor(Math.random() * 6);
    } while (openerIndex === heroIndex);
  }

  const heroPos = positions[heroIndex];
  const openerPos = mode === "vs_cold" ? positions[openerIndex] : null;
  const hand = hands[Math.floor(Math.random() * hands.length)];

  // 座席表示更新
  document.getElementById(`seat-${heroIndex}`).classList.add("hero");
  if (mode === "vs_cold" && openerIndex !== null) {
    document.getElementById(`seat-${openerIndex}`).classList.add("opener");
  }

  document.getElementById("info").textContent =
    mode === "vs_open"
      ? `${heroPos}からオープンしますか？`
      : `${openerPos}がオープンしました。${heroPos}でどう対応しますか？`;

  document.getElementById("hand").textContent = `あなたのハンド: ${hand}`;

  const actionArea = document.getElementById("actionButtons");
  actionArea.innerHTML = "";
  actions[mode].forEach(action => {
    const btn = document.createElement("button");
    btn.textContent = action;
    btn.onclick = () => checkAnswer(action, hand, heroPos, openerPos);
    actionArea.appendChild(btn);
  });

  document.getElementById("result").textContent = "";
}

function clearSeatStyles() {
  for (let i = 0; i < 6; i++) {
    document.getElementById(`seat-${i}`).classList.remove("hero", "opener");
  }
}

function checkAnswer(action, hand, heroPos, openerPos) {
  // 本来はレンジを参照して判定する
  // 仮実装として「AK以上、TT以上は強い」とみなす
  const strongHands = ["AA", "KK", "QQ", "JJ", "TT", "AKs", "AKo"];
  let correct = false;

  if (mode === "vs_open") {
    correct = action === "オープン" ? strongHands.includes(hand) : !strongHands.includes(hand);
  } else {
    correct = action === "スリーベット" ? strongHands.includes(hand) : !strongHands.includes(hand);
  }

  document.getElementById("result").textContent = correct ? "正解！" : "不正解...";
}

window.onload = generateSituation;
