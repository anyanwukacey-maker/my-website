
const output = document.getElementById('output');
const history = document.getElementById('history');
let expression = '';

document.querySelectorAll('.button').forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;
    if (action === 'clear') return reset();
    if (action === 'delete') return backspace();
    if (action === 'calculate') return calculate();
    appendValue(value);
  });
});

function appendValue(value) {
  if (!value) return;
  if (expression === '' && value === '.') {
    expression = '0.';
  } else if (expression === '0' && value !== '.' && !isOperator(value) && value !== ')' ) {
    expression = value;
  } else {
    expression += value;
  }
  updateDisplay();
}

function isOperator(char) {
  return ['+', '-', '*', '/', '%'].includes(char);
}

function reset() {
  expression = '';
  output.textContent = '0';
  history.textContent = '';
}

function backspace() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

function updateDisplay() {
  output.textContent = expression || '0';
  history.textContent = expression;
}

function calculate() {
  if (!expression) return;
  try {
    const sanitized = expression.replace(/[^0-9+\-*/.%()]/g, '');
    const result = Function('"use strict"; return (' + sanitized + ')')();
    output.textContent = formatResult(result);
    history.textContent = expression + ' =';
    expression = String(result);
  } catch {
    output.textContent = 'Error';
  }
}

function formatResult(value) {
  if (Number.isFinite(value)) {
    return Number.isInteger(value) ? String(value) : parseFloat(value.toFixed(10)).toString();
  }
  return 'Error';
}

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (/\d/.test(key)) return appendValue(key);
  if (['+', '-', '*', '/', '%', '.', '(', ')'].includes(key)) return appendValue(key);
  if (key === 'Enter' || key === '=') return calculate();
  if (key === 'Backspace') return backspace();
  if (key.toLowerCase() === 'c') return reset();
});