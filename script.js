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

function calculateAge() {
  const birthDate = new Date(document.getElementById("birth-date").value);
  const currentDate = new Date(document.getElementById("current-date").value);

  if (!birthDate || !currentDate || currentDate < birthDate) {
    alert("Please enter valid dates.");
    return;
  }

  let ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
  let ageInMonths = currentDate.getMonth() - birthDate.getMonth();
  let ageInDays = currentDate.getDate() - birthDate.getDate();

  if (ageInDays < 0) {
    ageInMonths--;
    ageInDays += new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
  }

  if (ageInMonths < 0) {
    ageInYears--;
    ageInMonths += 12;
  }

  const ageInMilliseconds = currentDate - birthDate;
  const ageInTotalDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
  const ageInWeeks = Math.floor(ageInTotalDays / 7);
  const ageInMonthsTotal =
    (currentDate.getFullYear() - birthDate.getFullYear()) * 12 +
    currentDate.getMonth() -
    birthDate.getMonth();

  const chronologicalAge = `${ageInYears} years, ${ageInMonths} months, and ${ageInDays} days`;
  const runningAge = `${ageInYears + 1} years old`;

  const nextBirthday = new Date(
    currentDate.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );
  if (nextBirthday < currentDate) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }
  const daysUntilNextBirthday = Math.ceil(
    (nextBirthday - currentDate) / (1000 * 60 * 60 * 24)
  );

  updateResults(
    "chronological-age",
    `Chronological age: ${chronologicalAge}`,
    chronologicalAge
  );
  updateResults("running-age", `Running age: ${runningAge}`, runningAge);
  updateResults("age-in-years", `Age in years: ${ageInYears}`, ageInYears);
  updateResults(
    "age-in-months",
    `Age in months: ${ageInMonthsTotal}`,
    ageInMonthsTotal
  );
  updateResults("age-in-weeks", `Age in weeks: ${ageInWeeks}`, ageInWeeks);
  updateResults(
    "age-in-days",
    `Age in days: ${ageInTotalDays}`,
    ageInTotalDays
  );
  updateResults(
    "days-until-next-birthday",
    `Days until next birthday: ${daysUntilNextBirthday}`,
    daysUntilNextBirthday
  );

  document.getElementById("results").classList.remove("hidden");

  saveResultsToLocal(
    chronologicalAge,
    runningAge,
    ageInYears,
    ageInMonthsTotal,
    ageInWeeks,
    ageInTotalDays,
    daysUntilNextBirthday
  );
}

function updateResults(elementId, text, valueToCopy) {
  const element = document.getElementById(elementId);
  element.innerHTML = `<span>${text}</span> <button class="copy-button" onclick="copyToClipboard('${valueToCopy}')">Copy</button>`;
}

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Copied to clipboard");
    })
    .catch((err) => {
      alert("Failed to copy text: ", err.message);
    });
}

function saveResultsToLocal(
  chronologicalAge,
  runningAge,
  ageInYears,
  ageInMonths,
  ageInWeeks,
  ageInDays,
  daysUntilNextBirthday
) {
  const results = {
    chronologicalAge,
    runningAge,
    ageInYears,
    ageInMonths,
    ageInWeeks,
    ageInDays,
    daysUntilNextBirthday,
  };
  localStorage.setItem("ageCalculatorResults", JSON.stringify(results));
}

function loadResultsFromLocal() {
  const results = JSON.parse(localStorage.getItem("ageCalculatorResults"));
  if (results) {
    updateResults(
      "chronological-age",
      `Chronological age: ${results.chronologicalAge}`,
      results.chronologicalAge
    );
    updateResults(
      "running-age",
      `Running age: ${results.runningAge}`,
      results.runningAge
    );
    updateResults(
      "age-in-years",
      `Age in years: ${results.ageInYears}`,
      results.ageInYears
    );
    updateResults(
      "age-in-months",
      `Age in months: ${results.ageInMonths}`,
      results.ageInMonths
    );
    updateResults(
      "age-in-weeks",
      `Age in weeks: ${results.ageInWeeks}`,
      results.ageInWeeks
    );
    updateResults(
      "age-in-days",
      `Age in days: ${results.ageInDays}`,
      results.ageInDays
    );
    updateResults(
      "days-until-next-birthday",
      `Days until next birthday: ${results.daysUntilNextBirthday}`,
      results.daysUntilNextBirthday
    );

    document.getElementById("results").classList.remove("hidden");
  }
}
