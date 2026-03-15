let currentInput = '0';
let previousInput = '';
let operation = null;

const currentDisplay = document.getElementById('current-operand');
const previousDisplay = document.getElementById('previous-operand');

function updateDisplay() {
    currentDisplay.innerText = currentInput;
    previousDisplay.innerText = previousInput + (operation || '');
}

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput = currentInput.toString() + number.toString();
    }
    updateDisplay();
}

function chooseOperation(op) {
    if (currentInput === '' && previousInput === '') return;
    if (previousInput !== '') compute();
    operation = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function compute() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+': computation = prev + current; break;
        case '-': computation = prev - current; break;
        case '*': computation = prev * current; break;
        case '/': 
            if (current === 0) { alert("Erro: Divisão por zero"); return; }
            computation = prev / current; 
            break;
        default: return;
    }

    currentInput = computation.toString();
    operation = undefined;
    previousInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function deleteNumber() {
    currentInput = currentInput.toString().slice(0, -1);
    if (currentInput === '') currentInput = '0';
    updateDisplay();
}

const statusMessage = document.getElementById('status-message');

function showErrorMessage(msg) {
    statusMessage.innerText = msg;
    statusMessage.style.opacity = '1';
    
    setTimeout(() => {
        statusMessage.style.opacity = '0';
    }, 2000);
}

window.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') {
        appendNumber(e.key);
        return;
    }
    
    if (['+', '-', '*', '/'].includes(e.key)) {
        chooseOperation(e.key);
        return;
    }
    
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        compute();
        return;
    }
    if (e.key === 'Backspace') {
        deleteNumber();
        return;
    }
    if (e.key === 'Escape') {
        clearDisplay();
        return;
    }

    if (e.key.match(/^[a-zA-Z]$/)) {
        showErrorMessage("⚠️ Apenas números são permitidos!");
    }
});
