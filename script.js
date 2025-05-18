// script.js

const positions = ["UTG", "MP", "CO", "BTN", "SB", "BB"];
let mode = "vs_open"; // デフォルトモード

function setMode(newMode) {
  mode = newMode;
  document.getElementById("btnOpen").classList.remove("active");
  document.getElementById("btnCold").classList.remove("active");
  document.getElementById("btn" + (newMode === "vs_open" ? "Open" : "Cold")).classList.add("active");
  document.getElementById("result").textContent = "";
  showNewHand();
}

function showNewHand() {
  const heroPosition = Math.floor(Math.random() * 6);
  let openerPosition = null;

  if (mode === "vs_cold") {
    do {
      openerPosition = Math.floor(Math.random() * 6);
    } while (openerPosition === heroPosition);
  }

  const hand = generateRandomHand();
  document.getElementById("hand").textContent = `Your Hand: ${hand}`;

  if (mode === "vs_open") {
    document.getElementById("info").textContent = `Your Position：${positions[heroPosition]}`;
  } else {
    document.getElementById("info").textContent = `Open Raise：${positions[openerPosition]}\nYour Position：${positions[heroPosition]}`;
  }

  updateTableDisplay(heroPosition, openerPosition);
  updateActionButtons();
}

function updateTableDisplay(heroPos, openerPos) {
  for (let i = 0; i < 6; i++) {
    const seat = document.getElementById(`seat-${i}`);
    seat.classList.remove("hero", "opener");
    if (i === heroPos) seat.classList.add("hero");
    if (i === openerPos && mode === "vs_cold") seat.classList.add("opener");
  }
}

function updateActionButtons() {
  const container = document.getElementById("actionButtons");
  container.innerHTML = "";

  const actions = mode === "vs_open" ? ["Fold", "Raise"] : ["Fold", "Call", "3Bet"];

  actions.forEach(action => {
    const btn = document.createElement("button");
    btn.textContent = action;
    btn.onclick = () => showResult(action);
    container.appendChild(btn);
  });
}

function showResult(choice) {
  document.getElementById("result").textContent = `You chose: ${choice}`;
  setTimeout(showNewHand, 1500);
}

function generateRandomHand() {
  const ranks = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
  const suits = ["", "s", "o"];
  const i = Math.floor(Math.random() * ranks.length);
  const j = Math.floor(Math.random() * ranks.length);

  let hand = i < j ? `${ranks[j]}${ranks[i]}` : `${ranks[i]}${ranks[j]}`;
  if (ranks[i] !== ranks[j]) {
    hand += suits[Math.floor(Math.random() * 3)];
  }
  return hand;
}

// 初期表示
showNewHand();
