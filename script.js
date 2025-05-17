const positions = ["UTG", "MP", "CO", "BTN"];
const hands = ["AA", "AKs", "AQs", "AJo", "KTs", "99"];  // 簡略版

const myRange = {
  "CO_vs_UTG": {
    "3bet": ["AKs", "QQ", "JJ"],
    "call": ["AQs", "99"],
  },
  "BTN_vs_MP": {
    "3bet": ["AKs", "AQs"],
    "call": ["AJo", "99"],
  },
  // 追加可能
};

let currentSituation = {};

function generateSituation() {
  const opener = positions[Math.floor(Math.random() * 2)]; // UTG or MP
  const heroIndex = positions.indexOf(opener) + 1;
  const hero = positions[heroIndex + Math.floor(Math.random() * (positions.length - heroIndex))];
  const hand = hands[Math.floor(Math.random() * hands.length)];

  currentSituation = {
    opener,
    hero,
    hand
  };

  document.getElementById("opener").innerText = `オープン: ${opener}`;
  document.getElementById("hero").innerText = `あなたのポジション: ${hero}`;
  document.getElementById("hand").innerText = `あなたのハンド: ${hand}`;
  document.getElementById("result").innerText = "";
}

function checkAnswer(action) {
  const key = `${currentSituation.hero}_vs_${currentSituation.opener}`;
  const range = myRange[key];

  if (!range) {
    document.getElementById("result").innerText = "この状況のレンジが未定義です";
    return;
  }

  const isCorrect = range[action]?.includes(currentSituation.hand);

  if (isCorrect) {
    document.getElementById("result").innerText = "✅ 正解！";
  } else {
    document.getElementById("result").innerText = "❌ 不正解";
  }
}

generateSituation();  // 初回起動