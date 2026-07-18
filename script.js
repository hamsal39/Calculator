// --- 70% HAND-WRITTEN LOGIC (State management & math) ---
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = '';   // Current number being typed
let previousInput = '';  // First number stored
let operator = null;     // Current operator (+, -, *, /)
let resetScreen = false; // Flag to clear screen on next number press

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        // 1. CLEAR (C)
        if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = null;
            resetScreen = false;
            display.value = '0';
            return;
        }

        // 2. OPERATORS (+, -, *, /)
        if (value === '+' || value === '-' || value === '*' || value === '/') {
            if (currentInput === '') return; // Don't allow empty operator
            previousInput = currentInput;
            operator = value;
            resetScreen = true;
            return;
        }

        // 3. EQUALS (=)
        if (value === '=') {
            if (previousInput === '' || currentInput === '' || operator === null) return;

            const prev = parseFloat(previousInput);
            const curr = parseFloat(currentInput);
            let result = 0;

            switch (operator) {
                case '+': result = prev + curr; break;
                case '-': result = prev - curr; break;
                case '*': result = prev * curr; break;
                case '/':
                    if (curr === 0) {
                        display.value = 'Error';
                        currentInput = '';
                        previousInput = '';
                        operator = null;
                        resetScreen = true;
                        return;
                    }
                    result = prev / curr;
                    break;
            }

            display.value = result;
            currentInput = result.toString(); // Store result for chaining
            previousInput = '';
            operator = null;
            resetScreen = true;
            return;
        }

        // 4. DECIMAL (.) - prevent multiple dots
        if (value === '.') {
            if (currentInput.includes('.')) return;
            if (currentInput === '') currentInput = '0';
        }

        // 5. NUMBERS (0-9)
        if (resetScreen) {
            currentInput = value;
            resetScreen = false;
        } else {
            currentInput += value;
        }

        display.value = currentInput;
    });
});