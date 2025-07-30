// Variables globales
let firstValue = "";
let secondValue = "";
let operator = null;
let isSecondValue = false;
let isError = false;

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
    isError = false;
  });
}
clear();

// Fonction pour supprimer le dernier caractère
function back() {
  let backButton = document.getElementById("return");
  backButton.addEventListener("click", () => {
    let screenResult = document.getElementById("result");
    screenResult.textContent = screenResult.textContent.slice(0, -1);
    // Si un opérateur est présent, on sépare l'affichage pour mettre à jour firstValue et secondValue
    if (operator !== null && screenResult.textContent.includes(operator)) {
      let [newFirstValue, newSecondValue] =
        screenResult.textContent.split(operator);
      firstValue = newFirstValue;
      secondValue = newSecondValue;
    } else {
      // Sinon, on met à jour uniquement firstValue et on réinitialise les autres valeurs
      firstValue = screenResult.textContent;
      secondValue = "";
      operator = null;
      isSecondValue = false;
    }
    // Si l'écran est vide alors on réinitialise tout à la valeur par défaut.
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
      if (isError) return; // Si une erreur est présente, on ne peut pas entrer de nombre
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
      // Si le nombre entré par l'utilisateur est supérieur à 10 alors on le limite à 10 chiffres.
      if (screenResult.textContent.length > 10) {
        screenResult.textContent = screenResult.textContent.slice(0, 10);
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
        if (firstValue === "0" || secondValue === "0") {
          screenResult.textContent = "Error";
          screenResult.style.color = "red";
        } else {
          screenResult.textContent =
            parseFloat(firstValue) / parseFloat(secondValue);
          screenResult.style.color = "green";
        }
        break;
      default:
        break;
    }
    if (screenResult.textContent !== "Error") {
      screenResult.style.color = "green";
    }
    // Impossible d'entrer un opérateur ou un nombre après une erreur
    if (screenResult.textContent === "Error") {
      isSecondValue = false;
      firstValue = "";
      secondValue = "";
      isError = true;
      return;
    }
    // Réinitialisation des variables après le calcul
    firstValue = screenResult.textContent;
    operator = null;
    secondValue = "";
    isSecondValue = false;
    isError = false;
  });
}
calculate();

// Fonction pour gérer le point décimal
function decimalPoint() {
  let decimal = document.getElementById("decimal");
  decimal.addEventListener("click", () => {
    let screenResult = document.getElementById("result");
    if (isError) return; // Pas de point en cas d'erreur
    if (!screenResult.textContent.includes(".")) {
      screenResult.textContent += ".";
      if (!isSecondValue) {
        firstValue += ".";
      } else {
        secondValue += ".";
      }
    }
    screenResult.style.color = "green";
  });
}

