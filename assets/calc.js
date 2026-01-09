<script>
  // Breed size ageing factors (post-2 years)
  const weightFactor = [4.6, 5.3, 5.6, 5.8, 6.0];

  const lifeStage = (h) => {
    if (h < 30) return "Puppy / Adolescent";
    if (h < 50) return "Young Adult";
    if (h < 65) return "Mature Adult";
    if (h < 80) return "Senior";
    return "Geriatric";
  };

  const tips = {
    "Puppy / Adolescent": "Focus on training, vaccinations, and nutrition.",
    "Young Adult": "Maintain annual vet exams and regular exercise.",
    "Mature Adult": "Add dental care and joint support.",
    "Senior": "Schedule twice-yearly vet checks and blood work.",
    "Geriatric": "Use orthopedic bedding and monitor mobility closely."
  };

  // 👇 ADD THIS: Set max date on page load
  document.addEventListener("DOMContentLoaded", () => {
    const dobInput = document.getElementById("dob");
    if (dobInput) {
      const today = new Date();
      const maxDate = new Date(today);
      maxDate.setDate(today.getDate() - 7);
      dobInput.max = maxDate.toISOString().split('T')[0];
      dobInput.value = "";
    }
  });

  // 👇 REPLACE YOUR EXISTING CLICK HANDLER WITH THIS ONE
  document.getElementById("calcBtn").addEventListener("click", () => {
    const dobInput = document.getElementById("dob").value;
    if (!dobInput) {
      alert("Please select your dog’s birth date.");
      return;
    }

    const dob = new Date(dobInput);
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);

    if (dob > now) {
      alert("Birth date cannot be in the future.");
      return;
    }
    if (dob > sevenDaysAgo) {
      alert("Your dog must be at least one week old. Please select an earlier date.");
      return;
    }

    const breed = parseInt(document.getElementById("breed").value);
    const today = new Date();
    const age = (today - dob) / (365.25 * 24 * 60 * 60 * 1000);

    let humanAge;
    if (age <= 1) {
      humanAge = Math.round(31 * age);
    } else if (age <= 2) {
      humanAge = Math.round(31 + (age - 1) * 11);
    } else {
      humanAge = Math.round(42 + (age - 2) * weightFactor[breed]);
    }

    const stage = lifeStage(humanAge);
    document.getElementById("hy").textContent = humanAge;
    document.getElementById("stage").textContent = stage;
    document.getElementById("tip").textContent = tips[stage];
    document.getElementById("result").classList.remove("hidden");
  });
</script>
