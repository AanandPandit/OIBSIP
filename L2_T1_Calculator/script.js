document.addEventListener('DOMContentLoaded', function () {
  const inputField = document.getElementById('input');
  const resultField = document.getElementById('result');
  const historyList = document.getElementById('history-list');
  let history = '';

  function calculateResult() {
    try {
      const expression = inputField.value;
      const result = eval(expression);

      if (isNaN(result)) {
        resultField.textContent = 'Invalid Input';
      } else if (result === Infinity || result === -Infinity) {
        resultField.textContent = "Can't divide by zero";
      } else {
        resultField.textContent = result;
        history += `${expression} = ${result}<br><hr>`;
        historyList.innerHTML = `<li>${history}</li>`;
      }
    } catch (error) {
      resultField.textContent = 'Incorrect Expression';
    }
  }

  document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', function () {
      const value = button.textContent;
      if (value === '=') {
        calculateResult();
      } else if (value === 'C') {
        inputField.value = '';
        resultField.textContent = '0';
      } else if (value === '←') {
        inputField.value = inputField.value.slice(0, -1);
      } else {
        inputField.value += value;
      }
    });
  });

  // Handle keyboard input
  document.addEventListener('keydown', function (event) {
    const key = event.key;
    if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
      inputField.value += key;
    } else if (key === 'Enter') {
      event.preventDefault();
      calculateResult();
    } else if (key === 'Delete') {
      inputField.value = '';
      resultField.textContent = '0';
    } else if (key === 'Backspace') {
      inputField.value = inputField.value.slice(0, -1);
    }
  });
});
