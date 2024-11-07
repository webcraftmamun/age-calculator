document.getElementById("current-date").valueAsDate = new Date();

window.onload = function () {
  loadResultsFromLocal();
};

function checkInputs() {
  const birthDateValue = document.getElementById("birth-date").value;
  const currentDateValue = document.getElementById("current-date").value;
  const calculateButton = document.getElementById("calculate-button");

  calculateButton.disabled = !birthDateValue || !currentDateValue;
}

document.getElementById("birth-date").addEventListener("input", checkInputs);
document.getElementById("current-date").addEventListener("input", checkInputs);
