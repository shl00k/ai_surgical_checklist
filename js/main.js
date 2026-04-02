/* ========== INIT ========== */
function init() {
  // Preload speech synthesis voices
  if ("speechSynthesis" in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () =>
      window.speechSynthesis.getVoices();
  }
  navigateTo("dashboard");
}

document.addEventListener("DOMContentLoaded", init);

// Close notification dropdown on outside click
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.getElementById("notif-dropdown").classList.remove("show");
    // Don't close alert modal with Escape (it's supposed to feel forced)
  }
});

/* ========== AI GENERATION ========== */
function runGeneration(s) {
  const logs = [
    { text: "Initializing surgical AI module...", delay: 300 },
    { text: `Loading procedure: ${s.surgeryType}`, delay: 500 },
    { text: "Cross-referencing patient medical history...", delay: 600 },
    {
      text: `Patient: ${s.patient.name} (${s.patient.age}y, ${s.patient.bloodGroup})`,
      delay: 400,
    },
    { text: "Analyzing 847 similar procedures in database...", delay: 800 },
    { text: "Generating risk assessment matrix...", delay: 600 },
    { text: "Identifying critical decision points...", delay: 500 },
    { text: "Building optimized step sequence...", delay: 700 },
    { text: "Applying WHO Surgical Safety Checklist protocols...", delay: 500 },
    {
      text: "Validating checklist against institutional guidelines...",
      delay: 600,
    },
    { text: "AI confidence score: 96.4%", delay: 400 },
    {
      text: `Validation complete. ${lapAppendectomySteps.length} steps generated.`,
      delay: 300,
    },
  ];

  const logContainer = document.getElementById("gen-logs");
  const bar = document.getElementById("gen-bar");
  const pct = document.getElementById("gen-pct");
  const statusEl = document.getElementById("gen-status");
  let totalDelay = 0;

  logs.forEach((log, i) => {
    totalDelay += log.delay;
    setTimeout(() => {
      const line = document.createElement("div");
      line.className = "log-line text-green-400/80";
      const time = new Date().toLocaleTimeString("en-US", { hour12: false });
      line.textContent = `[${time}] ${log.text}`;
      logContainer.appendChild(line);
      requestAnimationFrame(() => line.classList.add("show"));
      logContainer.scrollTop = logContainer.scrollHeight;

      const progress = ((i + 1) / logs.length) * 100;
      bar.style.width = progress + "%";
      pct.textContent = Math.round(progress) + "%";

      if (i === 2) statusEl.textContent = "Loading patient data...";
      else if (i === 4)
        statusEl.textContent = "Analyzing similar procedures...";
      else if (i === 7) statusEl.textContent = "Building checklist sequence...";
      else if (i === 9) statusEl.textContent = "Validating...";
      else if (i === logs.length - 1) statusEl.textContent = "Complete";
    }, totalDelay);
  });

  setTimeout(() => {
    showGeneratedChecklist(s);
  }, totalDelay + 800);
}

function showGeneratedChecklist(s) {
  const container = document.getElementById("gen-checklist");
  container.classList.remove("hidden");
  container.innerHTML = `
    <div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-display font-semibold text-navy-900 text-[15px]">Generated Surgical Checklist</h3>
        <span class="text-[12px] text-gray-400">${lapAppendectomySteps.length} steps</span>
      </div>
      <div class="space-y-1.5 pr-1">
        ${lapAppendectomySteps
          .map(
            (step, i) => `
          <div class="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 transition">
            <span class="w-6 h-6 rounded-full bg-pri-50 text-pri-600 text-[11px] font-semibold flex items-center justify-center flex-shrink-0">${i + 1}</span>
            <span class="text-[13px] text-navy-800 flex-1">${step.name}</span>
            ${step.alert ? '<span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ' + (step.alert.type === "critical" ? "bg-red-50 text-crit" : "bg-amber-50 text-amber-700") + '">AI MONITORED</span>' : ""}
          </div>
        `,
          )
          .join("")}
      </div>
      <div class="mt-6 flex justify-center">
        <button onclick="startSurgeryFlow()" class="px-8 py-3.5 bg-pri-500 text-white rounded-xl text-[14px] font-semibold hover:bg-pri-600 transition shadow-lg shadow-pri-500/20 flex items-center gap-2.5">
          <i class="fa-solid fa-play text-[12px]"></i>Begin Surgery
        </button>
      </div>
    </div>
  `;
  playChime();

  // Remove the fixed button since it's now inside
  const fixedButtons = document.getElementById("fixed-buttons");
  fixedButtons.innerHTML = "";
}

/* ========== SCHEDULE SURGERY ========== */
function scheduleSurgery() {
  document.getElementById("schedule-modal").classList.remove("hidden");
}

function closeScheduleModal() {
  document.getElementById("schedule-modal").classList.add("hidden");
  document.getElementById("schedule-form").reset();
}

// Close modal when clicking outside
document
  .getElementById("schedule-modal")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      closeScheduleModal();
    }
  });

document
  .getElementById("schedule-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newSurgery = {
      id: surgeries.length + 1,
      patient: {
        name: document.getElementById("patient-name").value,
        age: parseInt(document.getElementById("patient-age").value),
        gender: document.getElementById("patient-gender").value,
        bloodGroup: document.getElementById("patient-blood").value,
        mrn: `MRN-2024-${String(Math.floor(Math.random() * 100000)).padStart(5, "0")}`,
      },
      surgeryType: document.getElementById("surgery-type").value,
      scheduledTime: document.getElementById("scheduled-time").value,
      status: "upcoming",
      doctor: document.getElementById("doctor").value,
      team: [], // Can be added later
      room: document.getElementById("room").value,
      duration: document.getElementById("duration").value,
      notes: document.getElementById("notes").value || "",
    };

    surgeries.push(newSurgery);
    closeScheduleModal();
    showToast("Surgery scheduled successfully!", "success");

    // Re-render the current page to show the new surgery
    if (state.currentPage === "dashboard") {
      renderDashboard();
    } else if (state.currentPage === "surgeries") {
      renderSurgeries();
    }
  });
/* ========== ADD PATIENT ========== */
function addPatient() {
  document.getElementById("add-patient-modal").classList.remove("hidden");
}

function closeAddPatientModal() {
  document.getElementById("add-patient-modal").classList.add("hidden");
  document.getElementById("add-patient-form").reset();
}

// Close modal when clicking outside
document
  .getElementById("add-patient-modal")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      closeAddPatientModal();
    }
  });

document
  .getElementById("add-patient-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const newPatient = {
      name: document.getElementById("patient-full-name").value,
      age: parseInt(document.getElementById("patient-new-age").value),
      gender: document.getElementById("patient-new-gender").value,
      bloodGroup: document.getElementById("patient-new-blood").value,
      mrn: document.getElementById("patient-mrn").value,
      notes: document.getElementById("patient-new-notes").value || "",
    };

    patients.push(newPatient);
    closeAddPatientModal();
    showToast("Patient added successfully!", "success");

    // Re-render the patients page if currently viewing it
    if (state.currentPage === "patients") {
      renderPatients();
    }
  });
