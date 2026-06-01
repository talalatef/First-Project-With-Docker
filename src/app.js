const display = document.querySelector("#display");
const keypad = document.querySelector(".keypad");

const state = {
  currentValue: "0",
  storedValue: null,
  operator: null,
  shouldResetDisplay: false,
};

const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => {
    if (b === 0) {
      throw new Error("Division by zero");
    }

    return a / b;
  },
  "%": (a, b) => a % b,
};

function updateDisplay(value = state.currentValue) {
  display.textContent = value;
}

function inputNumber(number) {
  if (state.shouldResetDisplay) {
    state.currentValue = number === "." ? "0." : number;
    state.shouldResetDisplay = false;
    updateDisplay();
    return;
  }

  if (number === "." && state.currentValue.includes(".")) {
    return;
  }

  if (state.currentValue === "0" && number !== ".") {
    state.currentValue = number;
  } else {
    state.currentValue += number;
  }

  updateDisplay();
}

function chooseOperator(operator) {
  if (state.operator && !state.shouldResetDisplay) {
    calculate();
  }

  state.storedValue = Number(state.currentValue);
  state.operator = operator;
  state.shouldResetDisplay = true;
}

function calculate() {
  if (!state.operator || state.storedValue === null) {
    return;
  }

  const currentNumber = Number(state.currentValue);
  const operation = operations[state.operator];

  try {
    const result = operation(state.storedValue, currentNumber);
    state.currentValue = formatResult(result);
    state.storedValue = null;
    state.operator = null;
    state.shouldResetDisplay = true;
    updateDisplay();
  } catch (error) {
    resetCalculator("Error");
  }
}

function formatResult(number) {
  if (!Number.isFinite(number)) {
    return "Error";
  }

  return Number.parseFloat(number.toFixed(10)).toString();
}

function deleteLastDigit() {
  if (state.shouldResetDisplay || state.currentValue.length === 1) {
    state.currentValue = "0";
    state.shouldResetDisplay = false;
  } else {
    state.currentValue = state.currentValue.slice(0, -1);
  }

  updateDisplay();
}

function resetCalculator(displayValue = "0") {
  state.currentValue = displayValue === "Error" ? "0" : displayValue;
  state.storedValue = null;
  state.operator = null;
  state.shouldResetDisplay = displayValue === "Error";
  updateDisplay(displayValue);
}

function handleButtonClick(event) {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  if (button.dataset.number) {
    inputNumber(button.dataset.number);
    return;
  }

  if (button.dataset.operator) {
    chooseOperator(button.dataset.operator);
    return;
  }

  if (button.dataset.action === "clear") {
    resetCalculator();
    return;
  }

  if (button.dataset.action === "delete") {
    deleteLastDigit();
    return;
  }

  if (button.dataset.action === "calculate") {
    calculate();
  }
}

function handleKeyboardInput(event) {
  const { key } = event;

  if (/^[0-9.]$/.test(key)) {
    inputNumber(key);
    return;
  }

  if (["+", "-", "*", "/", "%"].includes(key)) {
    chooseOperator(key);
    return;
  }

  if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculate();
    return;
  }

  if (key === "Backspace") {
    deleteLastDigit();
    return;
  }

  if (key === "Escape") {
    resetCalculator();
  }
}

keypad.addEventListener("click", handleButtonClick);
window.addEventListener("keydown", handleKeyboardInput);
