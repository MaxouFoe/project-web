document.addEventListener("DOMContentLoaded", () => {

    console.log('Le DOM est chargé')
    const resultDisplay = document.getElementById("resultat");
    const btnClear = document.getElementById("btn-clear");
    const btnEqual = document.getElementById("btn-equal");
    const buttons = document.querySelectorAll(".btn-number, .btn-operator");

    let currentInput = "";
    let firstOperand = "";
    let secondOperand = "";
    let currentOperation = null;

    function updateDisplay() {
        resultDisplay.textContent = currentInput || "0";
    }

    function handleNumberClick(number) {
        if (currentOperation) {
            secondOperand += number;
            currentInput = secondOperand;
        } else {
            firstOperand += number;
            currentInput = firstOperand;
        }
        updateDisplay();
    }

    function handleOperatorClick(operator) {
        if (firstOperand === "") return;
        if (secondOperand !== "") {
            calculateResult();
        }
        currentOperation = operator;
        currentInput = "";
    }

    function calculateResult() {
        if (firstOperand === "" || secondOperand === "") return;

        let num1 = parseFloat(firstOperand);
        let num2 = parseFloat(secondOperand);
        let result;

        switch (currentOperation) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                result = num2 !== 0 ? num1 / num2 : "❌ Erreur";
                break;
            default:
                result = "⚠️ Opération invalide";
        }

        resultDisplay.textContent = `${result}`;
        firstOperand = result.toString();
        secondOperand = "";
        currentOperation = null;
        currentInput = firstOperand;
    }

    function clearCalculator() {
        firstOperand = "";
        secondOperand = "";
        currentOperation = null;
        currentInput = "";
        updateDisplay();
    }

    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            const value = e.target.dataset.value;
            if (!isNaN(value)) {
                handleNumberClick(value);
            } else {
                handleOperatorClick(value);
            }
        });
    });

    btnEqual.addEventListener("click", calculateResult);
    btnClear.addEventListener("click", clearCalculator);

    updateDisplay();
});