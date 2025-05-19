// Variables globales
let firstValue = "";
let secondValue = "";
let operator = null;
let isSecondValue = false;

// Ajout d'une valeur par défaut
function defaultValue() {
  let defaultValue = 0;

  let screenResult = document.getElementById("result");
  screenResult.textContent = defaultValue;
  screenResult.style.color = "grey";
}

defaultValue();

// Fonction pour effacer les données et revenir à la valeur par défaut
function clear() {
  let clearButton = document.getElementById("clear");
  clearButton.addEventListener("click", () => {
    defaultValue();
    firstValue = "";
    secondValue = "";
    operator = null;
    isSecondValue = false;
  });
}
clear();

// Fonction pour supprimer le dernier caractère
function back() {
  let backButton = document.getElementById("return");
  backButton.addEventListener("click", () => {
    let screenResult = document.getElementById("result");
    screenResult.textContent = screenResult.textContent.slice(0, -1);
    screenResult.textContent.split(operator);
    if (operator !== null && screenResult.textContent.includes(operator)) {
      let [newFirstValue, newSecondValue] =
        screenResult.textContent.split(operator);
      firstValue = newFirstValue;
      secondValue = newSecondValue;
    } else {
      firstValue = screenResult.textContent;
      secondValue = "";
      operator = null;
      isSecondValue = false;
    }
    if (!screenResult.textContent.includes(operator)) {
      operator = null;
      isSecondValue = false;
    }
    if (screenResult.textContent === "") {
      defaultValue();
      firstValue = "";
      secondValue = "";
      operator = null;
      isSecondValue = false;
    }
  });
}

back();

// Fonction pour récupérer tous les boutons "number"
function numbers() {
  let numbers = document.querySelectorAll(".number");
  numbers.forEach((number) => {
    number.addEventListener("click", () => {
      let screenResult = document.getElementById("result");
      if (screenResult.textContent === "0") {
        screenResult.textContent = number.textContent;
      } else {
        screenResult.textContent += number.textContent;
      }
      screenResult.style.color = "black";
      if (!isSecondValue) {
        firstValue += number.textContent;
      } else {
        secondValue += number.textContent;
      }
    });
  });
}
numbers();

// Fonction pour récupérer tous les boutons "operator"
function operators() {
  let operators = document.querySelectorAll(".operator");
  operators.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {
      let screenResult = document.getElementById("result");
      if (operator !== null) return;
      screenResult.textContent += operatorButton.textContent;
      operator = operatorButton.textContent;
      screenResult.style.color = "black";
      isSecondValue = true;
    });
  });
}
operators();

// Fonction de calcul
function calculate() {
  let screenResult = document.getElementById("result");
  let equalButton = document.getElementById("equal");
  equalButton.addEventListener("click", () => {
    switch (operator) {
      case "+":
        screenResult.textContent =
          parseFloat(firstValue) + parseFloat(secondValue);
        break;
      case "-":
        screenResult.textContent =
          parseFloat(firstValue) - parseFloat(secondValue);
        break;
      case "*":
        screenResult.textContent =
          parseFloat(firstValue) * parseFloat(secondValue);
        break;
      case "/":
        screenResult.textContent =
          parseFloat(firstValue) / parseFloat(secondValue);
        break;
      default:
        break;
    }
    firstValue = screenResult.textContent;
    secondValue = "";
    isSecondValue = false;
    screenResult.style.color = "green";
  });
}
calculate();

