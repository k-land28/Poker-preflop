'use strict';

const positions = ['BTN', 'SB', 'BB', 'UTG', 'MP', 'CO'];

// 各モードの問題データ
const questions = {
  vs_open: [
    {
      situation: 'MPがオープンした場合、COの正しいアクションは？',
      correct: '3Bet',
      choices: ['Fold', 'Call', '3Bet'],
      involvedPositions: ['MP', 'CO'],
      openPosition: 'MP',
      actionPosition: 'CO',
      stage: 'vs_open',
    },
    {
      situation: 'UTGがオープンした場合、MPの正しいアクションは？',
      correct: 'Fold',
      choices: ['Fold', 'Call', '3Bet'],
      involvedPositions: ['UTG', 'MP'],
      openPosition: 'UTG',
      actionPosition: 'MP',
      stage: 'vs_open',
    },
  ],
  vs_3bet: [
    {
      situation: 'COがオープンし、MPが3Betした時、COの正しいアクションは？',
      correct: '4Bet',
      choices: ['Fold', 'Call', '4Bet'],
      involvedPositions: ['CO', 'MP'],
      openPosition: 'CO',
      threeBetPosition: 'MP',
      actionPosition: 'CO',
      stage: 'vs_3bet',
    },
    {
      situation: 'UTGがオープンし、BTNが3Betした時、UTGの正しいアクションは？',
      correct: 'Fold',
      choices: ['Fold', 'Call', '4Bet'],
      involvedPositions: ['UTG', 'BTN'],
      openPosition: 'UTG',
      threeBetPosition: 'BTN',
      actionPosition: 'UTG',
      stage: 'vs_3bet',
    },
  ],
  open_none: [
    {
      situation: '誰もオープンしていない場合、BTNの正しいアクションは？',
      correct: 'Open',
      choices: ['Fold', 'Open'],
      involvedPositions: ['BTN'],
      actionPosition: 'BTN',
      stage: 'open_none',
    },
  ],
};

let currentMode = 'vs_open';
let currentIndex = 0;

const tableEl = document.getElementById('table');
const situationText = document.getElementById('situationText');
const actionButtons = document.getElementById('actionButtons');
const resultText = document.getElementById('resultText');
const tabs = document.querySelectorAll('.tab-button');

function clearPositions() {
  tableEl.innerHTML = '';
}

function createPositions(mode, question) {
  clearPositions();

  // 楕円テーブルのサイズ
  const width = tableEl.clientWidth;
  const height = tableEl.clientHeight;
  const centerX = width / 2;
  const centerY = height / 2;

  // 楕円の半径
  const radiusX = width / 2 - 40;
  const radiusY = height / 2 - 30;

  // ポジション数
  const count = positions.length;

  // どのポジションを目立たせるか
  // actionPositionは強調、openPositionや3BetPositionは別色で表示

  for (let i = 0; i < count; i++) {
    const posName = positions[i];
    const angle = (2 * Math.PI * i) / count - Math.PI / 2; // 12時位置基準に調整

    // 楕円上の座標計算
    const x = centerX + radiusX * Math.cos(angle);
    const y = centerY + radiusY * Math.sin(angle);

    const posEl = document.createElement('div');
    posEl.className = 'position';
    posEl.textContent = posName;

    // 中心位置調整（位置要素の半分サイズを引く）
    posEl.style.left = `${x}px`;
    posEl.style.top = `${y}px`;
    posEl.style.transform = 'translate(-50%, -50%)';

    // 状況に応じて色分け
    if (question) {
      if (posName === question.actionPosition) {
        posEl.style.backgroundColor = '#00ffaa'; // 自分のアクション位置は明るいシアン
        posEl.style.color = '#004433';
        posEl.style.boxShadow = '0 0 20px #00ffaa';
        posEl.style.fontWeight = '900';
        posEl.style.cursor = 'default';
      } else if (posName === question.openPosition) {
        posEl.style.backgroundColor = '#ff5500'; // オープナーはオレンジ
        posEl.style.color = '#220000';
        posEl.style.boxShadow = '0 0 15px #ff5500';
        posEl.style.fontWeight = '700';
      } else if (question.threeBetPosition && posName === question.threeBetPosition) {
        posEl.style.backgroundColor = '#ffaa00'; // 3Betしたポジションは黄色
        posEl.style.color = '#443300';
        posEl.style.boxShadow = '0 0 15px #ffaa00';
        posEl.style.fontWeight = '700';
      } else {
        // 通常色
        posEl.style.backgroundColor = '#004444cc';
        posEl.style.color = '#0ff';
        posEl.style.boxShadow = '0 0 10px #0ff';
      }
    }

    tableEl.appendChild(posEl);
  }
}

function displayQuestion() {
  const qList = questions[currentMode];
  const q = qList[currentIndex];

  situationText.textContent = q ? q.situation : '問題がありません';
  resultText.textContent = '';
  actionButtons.innerHTML = '';

  if (!q) return;

  createPositions(currentMode, q);

  // 選択肢ボタン作成
  q.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.addEventListener('click', () => {
      if (choice === q.correct) {
        resultText.style.color = '#0faa00';
        resultText.textContent = '正解！🎉';
      } else {
        resultText.style.color = '#ff2200';
        resultText.textContent = `不正解。正解は「${q.correct}」です。`;
      }
    });
    actionButtons.appendChild(btn);
  });
}

function switchMode(newMode) {
  currentMode = newMode;
  currentIndex = 0;

  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.mode === newMode);
  });

  displayQuestion();
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.dataset.mode !== currentMode) {
      switchMode(tab.dataset.mode);
    }
  });
});

// 初期表示
window.addEventListener('load', () => {
  switchMode(currentMode);
});
