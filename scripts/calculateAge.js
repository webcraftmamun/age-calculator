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

  // Calculate age in hours, minutes, and seconds
  const ageInHours = ageInTotalDays * 24;
  const ageInMinutes = ageInTotalDays * 24 * 60;
  const ageInSeconds = ageInTotalDays * 24 * 60 * 60;

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

  // Update results display
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
  updateResults("age-in-hours", `Age in hours: ${ageInHours}`, ageInHours);
  updateResults(
    "age-in-minutes",
    `Age in minutes: ${ageInMinutes}`,
    ageInMinutes
  );
  updateResults(
    "age-in-seconds",
    `Age in seconds: ${ageInSeconds}`,
    ageInSeconds
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
    daysUntilNextBirthday,
    ageInHours,
    ageInMinutes,
    ageInSeconds
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
