function saveResultsToLocal(
  chronologicalAge,
  runningAge,
  ageInYears,
  ageInMonths,
  ageInWeeks,
  ageInDays,
  daysUntilNextBirthday,
  ageInHours,
  ageInMinutes,
  ageInSeconds
) {
  const results = {
    chronologicalAge,
    runningAge,
    ageInYears,
    ageInMonths,
    ageInWeeks,
    ageInDays,
    daysUntilNextBirthday,
    ageInHours,
    ageInMinutes,
    ageInSeconds,
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
      "age-in-hours",
      `Age in hours: ${results.ageInHours}`,
      results.ageInHours
    );
    updateResults(
      "age-in-minutes",
      `Age in minutes: ${results.ageInMinutes}`,
      results.ageInMinutes
    );
    updateResults(
      "age-in-seconds",
      `Age in seconds: ${results.ageInSeconds}`,
      results.ageInSeconds
    );
    updateResults(
      "days-until-next-birthday",
      `Days until next birthday: ${results.daysUntilNextBirthday}`,
      results.daysUntilNextBirthday
    );

    document.getElementById("results").classList.remove("hidden");
  }
}
