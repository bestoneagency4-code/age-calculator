// Breed size ageing factors (post-2 years)
const weightFactor = [4.6, 5.3, 5.6, 5.8, 6.0];

// Life-stage mapping
const lifeStage = (h) => {
  if (h < 30) return "Puppy / Adolescent";
  if (h < 50) return "Young Adult";
  if (h < 65) return "Mature Adult";
  if (h < 80) return "Senior";
  return "Geriatric";
};

// Care tips per stage
const tips = {
  "Puppy / Adolescent": "Focus on training, vaccinations, and nutrition.",
  "Young Adult": "Maintain annual vet exams and regular exercise.",
  "Mature Adult": "Add dental care and joint support.",
  "Senior": "Schedule twice-yearly vet checks and blood work.",
  "Geriatric": "Use orthopedic bedding and monitor mobility closely."
};

/* -------------------------------
   DOB INPUT CONSTRAINT (PRIMARY)
-------------------------------- */
const dobInputEl = document.getElementById("dob");

if (dobInputEl) {
  const max = new Date();
  max.setDate(max.getDate() - 7); // must be at least 7 days old
  dobInputEl.max = max.toISOString().split("T")[0];
}

/* -------------------------------
   CALCULATE HANDLER
-------------------------------- */
document.getElementById("calcBtn").addEventListener("click", () => {
  const dobValue = dobInputEl.value;

  // 1️⃣ Empty check
  if (!dobValue) {
    alert("Please select your dog’s birth date.");
    return;
  }

  const dob = new Date(dobValue);
  const today = new Date();

  // Normalize time (prevents timezone bugs)
  dob.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  // 2️⃣ Invalid date guard
  if (isNaN(dob.getTime())) {
    alert("Invalid birth date.");
    return;
  }

  // 3️⃣ Future-date guard
  if (dob >= today) {
    alert("Birth date cannot be today or in the future.");
    return;
  }

  // 4️⃣ Minimum age guard (7 days)
  const minAllowed = new Date(today);
  minAllowed.setDate(minAllowed.getDate() - 7);

  if (dob > minAllowed) {
    alert("Dog must be at least 7 days old.");
    return;
  }

  // Breed
  const breed = parseInt(document.getElementById("breed").value, 10);

  // Age calculation (years)
  const age =
    (today - dob) / (365.25 * 24 * 60 * 60 * 1000);

  // Human age conversion
  let humanAge;
  if (age <= 1) {
    humanAge = Math.round(31 * age);
  } else if (age <= 2) {
    humanAge = Math.round(31 + (age - 1) * 11);
  } else {
    humanAge = Math.round(42 + (age - 2) * weightFactor[breed]);
  }

  const stage = lifeStage(humanAge);

  // Output
  document.getElementById("hy").textContent = humanAge;
  document.getElementById("stage").textContent = stage;
  document.getElementById("tip").textContent = tips[stage];
  document.getElementById("result").classList.remove("hidden");
});
