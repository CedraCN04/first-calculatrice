// Ajout d'une valeur par défaut
function defaultValue() {
  let defaultValue = 0;

  let screenResult = document.getElementById("result");
  screenResult.textContent = defaultValue;
  screenResult.style.color = "grey";
}

defaultValue();

// Ajout d'une fonction pour effacer les données et revenir à la valeur par défaut
function clear() {
  let clearButton = document.getElementById("clear");
  clearButton.addEventListener("click", () => {
    defaultValue();
  });
}

// Ajout d'une fonction pour supprimer le dernier caractère
function back() {
  let backButton = document.getElementById("return");
  backButton.addEventListener(click, () => {
    let screenResult = document.getElementById("result");
    screenResult.textContent = screenResult.textContent.slice(0, -1);
  });
}

