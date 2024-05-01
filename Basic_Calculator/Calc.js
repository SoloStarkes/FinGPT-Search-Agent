const showCalculatorBtn = document.getElementById('showCalculator');
const calculatorContainer = document.getElementById('calculatorContainer');
const calculatorDisplay = document.getElementById('calculatorDisplay');
const buttons = document.querySelectorAll('.btn');

showCalculatorBtn.addEventListener('click', () => {
  calculatorContainer.classList.remove('hidden');
});

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    if (value === '=') {
      calculatorDisplay.value = eval(calculatorDisplay.value);
    } else {
      calculatorDisplay.value += value;
    }
  });
});
