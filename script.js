'use strict';

const positions = ['UTG', 'MP', 'CO', 'BTN', 'SB', 'BB'];
const hands = ['AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQo', 'A5s', 'KJo', 'T9s'];

function generateRandomQuestion(mode) {
  const hero = positions[Math.floor(Math.random() * positions.length)];
  let villain;
  do {
    villain = positions[Math.floor(Math.random() * positions.length)];
  } while (villain === hero);

  const hand = hands[Math.floor(Math.random() * hands.length)];
  let question = {};

  if (mode === 'open_none') {
    question = {
      situation: `${hero}からオープンするか判断してください。`,
      correct: 'Open',
      choices: ['Fold', 'Open'],
      actionPosition: hero,
      stage: 'open_none'
    };
  } else if (mode === 'vs_open') {
    question = {
      situation: `${villain}がオープンした場合、${hero}のアクションは？`,
      correct: '3Bet',
      choices: ['Fold', 'Call', '3Bet'],
      openPosition: villain,
      actionPosition: hero,
      stage: 'vs_open'
    };
  } else if (mode === 'vs_3bet') {
    question = {
      situation: `${hero}がオープンし、${villain}が3Betした場合、${hero}のアクションは？`,
      correct: 'Fold',
      choices: ['Fold', 'Call', '4Bet'],
      openPosition: hero,
      threeBetPosition: villain,
      actionPosition: hero,
      stage: 'vs_3bet'
    };
  }

  return { ...question, hand };
}

let currentMode = 'open_none';
let currentQuestion = null;

const tableEl = document.getElementById('table');
const situationText = document.getElementById('situationText');
const handText = document.getElementById('handText');
const actionButtons = document.getElementById('actionButtons');
const resultText = document.getElementById('resultText');
const nextButton = document.getElementById('nextButton');
const tabs = document.querySelectorAll('.tab-button');

function clearPositions() {
  tableEl.innerHTML = '';
}

function createPositions(question) {
  clearPositions();

  const width = tableEl.clientWidth;
  const height = tableEl.clientHeight;
  const centerX = width / 2;
  const centerY = height / 2;
  const radiusX = width / 2 - 40;
  const radiusY = height / 2 - 30;
  const count = positions.length;

  const heroPos = question.actionPosition;
  const heroIndex = positions.indexOf(heroPos);
  const rotate = (i) => (i - heroIndex + count / 2 + count) % count;

  for (let i = 0; i < count; i++) {
    const rotatedIndex = rotate(i);
    const angle = (2 * Math.PI * rotatedIndex) / count - Math.PI / 2;
    const x = centerX + radiusX * Math.cos(angle);
    const y = centerY + radiusY * Math.sin(angle);

    const posName = positions[i];
    const posEl = document.createElement('div');
    posEl.className = 'position';
    posEl.textContent = posName;
    posEl.style.left = `${x}px`;
    posEl.style.top = `${y}px`;
    posEl.style.transform = 'translate(-50%, -50%)';

    if (posName === question.actionPosition) {
      posEl.style.backgroundColor = '#00ffaa';
      posEl.style.color = '#004433';
      posEl.style.boxShadow = '0 0 20px #00ffaa';
      posEl.style.fontWeight = '900';
    } else if (posName === question.openPosition) {
      posEl.style.backgroundColor = '#ff5500';
      posEl.style.color = '#220000';
      posEl.style.boxShadow = '0 0 15px #ff5500';
      posEl.style.fontWeight = '700';
    } else if (question.threeBetPosition && posName === question.threeBetPosition) {
      posEl.style.backgroundColor = '#ffaa00';
      posEl.style.color = '#443300';
      posEl.style.boxShadow = '0 0 15px #ffaa00';
      posEl.style.fontWeight = '700';
    }

    tableEl.appendChild(posEl);
  }
}

function displayQuestion() {
  currentQuestion = generateRandomQuestion(currentMode);
  const q = currentQuestion;

  situationText.textContent = q.situation;
  handText.textContent = `ハンド: ${q.hand}`;
  resultText.textContent = '';
  actionButtons.innerHTML = '';

  createPositions(q);

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
  tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.mode === newMode));
  displayQuestion();
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.dataset.mode !== currentMode) {
      switchMode(tab.dataset.mode);
    }
  });
});

nextButton.addEventListener('click', displayQuestion);

window.addEventListener('load', () => switchMode(currentMode));
