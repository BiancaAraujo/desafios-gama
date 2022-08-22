const keysButton = document.querySelector('.calc-keys');
var displayExpression = document.getElementById('display-expression');
var displayNumber = document.getElementById('display-number');
var previousKey = ''
var isResult = false;

const updateDisplay = (key, keyClass) => {
    if (isResult) {
        displayExpression.textContent = key;
        displayNumber.textContent = key;
        isResult = false;
    }

    else if (displayNumber.textContent === '0') {
        displayExpression.textContent = displayExpression.textContent.slice(0, -1) + key;
        displayNumber.textContent = key;
    }

    else {
        displayExpression.textContent += key;

        if (keyClass !== 'op') {
            if (previousKey === 'op')
                displayNumber.textContent = key;
            else
                displayNumber.textContent += key;
        }
    }

    previousKey = keyClass;
};

const clearAllDisplay = () => {
    displayExpression.textContent = '0';
    displayNumber.textContent = '0';
};

const clearDisplay = () => {
    var textExpression = displayExpression.textContent.slice(0, -1);
    var textNumber = displayNumber.textContent.slice(0, -1);

    displayExpression.textContent = (textExpression !== '') ? textExpression : '0';
    displayNumber.textContent = (textNumber !== '') ? textNumber : '0';
};

const calculate = (expression) => {
    isResult = true;
    expression = expression.replace(',', '.');
    console.log(expression);
    updateDisplay(eval(expression), '');
};


keysButton.addEventListener('click', e => {
    if (!e.target.matches('button')) return;

    const key = e.target.textContent;
    const keyClass = e.target.className;
    console.log(e.target.className)

    if (key === '=')
        calculate(displayExpression.textContent);
    else if (key === 'CE')
        clearAllDisplay();
    else if (key === '«')
        clearDisplay();
    else
        updateDisplay(key, keyClass);
})