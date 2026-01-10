// AAHA-informed aging factors (post-2 years)
const aahaFactors = [4, 5, 6, 7]; // small → giant

// Life stage labels
function lifeStageByHumanAge(h) {
  if (h < 15) return "Puppy";
  if (h < 30) return "Young Adult";
  if (h < 50) return "Adult";
  if (h < 65) return "Mature Adult";
  if (h < 80) return "Senior";
  return "Geriatric";
}

// Care tips
const tips = {
  "Neonatal Puppy": "This puppy is in the neonatal stage. Focus on warmth, nursing, and veterinary guidance.",
  "Early Puppy": "This is a critical socialization period. Focus on gentle handling, vaccinations, and safe exploration.",
  "Puppy": "Your puppy is growing rapidly! Continue training, socialization, and balanced puppy-specific nutrition.",
  "Young Adult": "Maintain regular exercise and annual vet checkups.",
  "Adult": "Monitor dental health and weight closely.",
  "Mature Adult": "Add joint care and regular blood screening.",
  "Senior": "Schedule twice-yearly veterinary exams.",
  "Geriatric": "Focus on comfort, mobility support, and quality of life."
};

// Calculate the date exactly 7 days ago from today
const todayDate = new Date();
const fourteenDaysAgo = new Date(todayDate);
fourteenDaysAgo.setDate(todayDate.getDate() - 7);

// Format to YYYY-MM-DD for the HTML input
const maxDate = fourteenDaysAgo.toISOString().split("T")[0];

// Apply the restriction to the date picker
const dateInput = document.getElementById("dob");
dateInput.setAttribute("max", maxDate);

// Rest of your existing logic starts here...

document.getElementById("calcBtn").addEventListener("click", () => {
  const dobInput = document.getElementById("dob").value;
  if (!dobInput) {
    alert("Please select your dog’s birth date.");
    return;
  }

  const dob = new Date(dobInput);
  const today = new Date();
  
  // Calculate difference in days
  const ageDays = (today - dob) / (1000 * 60 * 60 * 24);

  // If the user bypasses the UI restriction somehow:
  if (ageDays < 7) {
    alert("This calculator is designed for puppies 7 days and older.");
    return;
  }
  const ageWeeks = ageDays / 7;
  const ageMonths = ageDays / 30.44; // Average days in a month
  const ageYears = ageDays / 365.25;
  const breed = parseInt(document.getElementById("breed").value);

  const headline = document.getElementById("headline");
  const stageEl = document.getElementById("stage");
  const tipEl = document.getElementById("tip");

  // 🍼 Neonatal: under 8 weeks
  if (ageWeeks < 8) {
    headline.textContent = "Developmental Stage: Neonatal";
    stageEl.textContent = "Neonatal Puppy";
    tipEl.textContent = tips["Neonatal Puppy"];
  }

  // 🐾 Early puppy: 8–16 weeks
  else if (ageWeeks < 16) {
    headline.textContent = "Comparable to a human infant";
    stageEl.textContent = "Early Puppy";
    tipEl.textContent = tips["Early Puppy"];
  }

  // 🐕 Puppy: 16 weeks to 12 months (Descriptive only)
  else if (ageYears < 1) {
    headline.textContent = "Comparable to a human toddler/child";
    stageEl.textContent = "Puppy";
    tipEl.textContent = tips["Puppy"];
  }

  // 🐕 Adults (1 year and older)
  else {
    let humanAge;

    if (ageYears < 2) {
      // 1 to 2 years old
      humanAge = Math.round(15 + (ageYears - 1) * 9);
    } else {
      // 2+ years old
      humanAge = Math.round(24 + (ageYears - 2) * aahaFactors[breed]);
    }

    const stage = lifeStageByHumanAge(humanAge);
    headline.textContent = `Your dog is approximately ${humanAge} human years old`;
    stageEl.textContent = stage;
    tipEl.textContent = tips[stage];
  }

  document.getElementById("result").classList.remove("hidden");
});
