/* ========== SURGERY FLOW ========== */
function startSurgeryFlow() {
  state.generatedChecklist = [...lapAppendectomySteps];
  state.currentStepIndex = -1;
  state.stepTimestamps = [];
  state.aiInterventions = 0;
  state.surgeryCompleted = false;
  state.isPaused = false;
  navigateTo("surgery");
}

/* ========== STEP PROCESSING ========== */
function processNextStep() {
  if (state.surgeryCompleted) return;
  state.currentStepIndex++;
  const idx = state.currentStepIndex;

  if (idx >= state.generatedChecklist.length) {
    completeSurgery();
    return;
  }

  const step = state.generatedChecklist[idx];
  const startT = Date.now() - state.surgeryStartTime;

  // Update UI - set active
  updateStepUI(
    idx,
    "pending",
    '<i class="fa-solid fa-spinner fa-spin text-[10px]"></i>',
    "In progress...",
  );

  // Update counter
  const counter = document.getElementById("step-counter");
  if (counter)
    counter.textContent = `${idx}/${state.generatedChecklist.length}`;

  // AI status
  const aiStatus = document.getElementById("ai-status-text");
  if (aiStatus) aiStatus.textContent = `Monitoring: ${step.name}`;

  // After half duration, speak detection
  setTimeout(() => {
    if (state.surgeryCompleted) return;
    speak(step.voice);
  }, step.duration * 0.5);

  // After full duration, complete step
  state._stepTimeout = setTimeout(() => {
    if (state.surgeryCompleted) return;
    const endT = Date.now() - state.surgeryStartTime;
    state.stepTimestamps.push({
      stepId: step.id,
      name: step.name,
      startTime: startT,
      endTime: endT,
      status: "completed",
    });

    updateStepUI(
      idx,
      "completed",
      '<i class="fa-solid fa-check text-[9px]"></i>',
      formatTime(endT),
    );
    playChime();

    // Update progress
    const prog = document.getElementById("checklist-progress");
    if (prog)
      prog.style.width =
        ((idx + 1) / state.generatedChecklist.length) * 100 + "%";
    if (counter)
      counter.textContent = `${idx + 1}/${state.generatedChecklist.length}`;

    // Check for alert
    if (step.alert) {
      setTimeout(() => {
        if (state.surgeryCompleted) return;
        state.isPaused = true;
        state.aiInterventions++;
        showAlert(step.alert);
      }, 600);
    } else {
      setTimeout(() => processNextStep(), 800);
    }
  }, step.duration);
}

function updateStepUI(index, statusClass, iconHTML, metaText) {
  const step = document.getElementById("step-" + index);
  const icon = document.getElementById("step-icon-" + index);
  const meta = document.getElementById("step-meta-" + index);
  if (!step || !icon) return;

  step.className =
    "checklist-step step-" +
    (statusClass === "pending" ? "active" : statusClass);
  icon.className =
    "step-icon " + (statusClass === "pending" ? "active" : statusClass);
  icon.innerHTML = iconHTML;
  if (meta) meta.textContent = metaText;

  // Scroll into view
  step.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* ========== SURGERY TIMER ========== */
function startSurgeryTimer() {
  state.surgeryStartTime = Date.now();
  const timerEl = document.getElementById("surgery-timer");
  state.surgeryTimerInterval = setInterval(() => {
    if (state.surgeryCompleted) return;
    const elapsed = Math.floor((Date.now() - state.surgeryStartTime) / 1000);
    const m = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const s = String(elapsed % 60).padStart(2, "0");
    if (timerEl) timerEl.textContent = m + ":" + s;
  }, 1000);
}

function startCameraTimestamps() {
  state.cameraInterval = setInterval(() => {
    document.querySelectorAll(".cam-ts").forEach((el) => {
      el.textContent = new Date().toLocaleTimeString("en-US", {
        hour12: false,
      });
    });
    // Subtle brightness variation
    document.querySelectorAll(".cam-bg").forEach((el) => {
      const b = 0.93 + Math.random() * 0.14;
      el.style.filter = `brightness(${b})`;
    });
  }, 1000);
}

/* ========== COMPLETE SURGERY ========== */
function completeSurgery() {
  state.surgeryCompleted = true;
  clearInterval(state.surgeryTimerInterval);
  clearInterval(state.cameraInterval);
  clearTimeout(state._stepTimeout);
  stopAlarm();

  const aiStatus = document.getElementById("ai-status-text");
  if (aiStatus) aiStatus.textContent = "Surgery complete";

  speak("Surgery complete. Generating report.");

  // Update selected surgery status
  const s = state.selectedSurgery;
  if (s) {
    s.status = "completed";
    const elapsed = Date.now() - state.surgeryStartTime;
    s.completedDuration = formatTime(elapsed);
    s.aiInterventions = state.aiInterventions;
    s.missedSteps = state.stepTimestamps.filter(
      (t) => t.status === "skipped",
    ).length;
    // Move to end of surgeries array (for history ordering)
    const idx = surgeries.indexOf(s);
    if (idx > -1) {
      surgeries.splice(idx, 1);
      surgeries.push(s);
    }
  }

  playChime();
  setTimeout(() => playChime(), 300);

  setTimeout(() => {
    showToast("Surgery completed successfully", "ok");
    navigateTo("report");
  }, 2500);
}

/* ========== DOWNLOAD REPORT ========== */
function downloadReport() {
  const s = state.selectedSurgery;
  if (!s) return;
  const completedCount = state.stepTimestamps.filter(
    (t) => t.status === "completed",
  ).length;
  const skippedCount = state.stepTimestamps.filter(
    (t) => t.status === "skipped",
  ).length;
  const totalDuration = state.surgeryStartTime
    ? formatTime(Date.now() - state.surgeryStartTime)
    : s.completedDuration || "N/A";

  let text = `AI SURGICAL CHECKLIST SYSTEM — SURGERY REPORT\n`;
  text += `${"=".repeat(50)}\n\n`;
  text += `Patient: ${s.patient.name}\n`;
  text += `MRN: ${s.patient.mrn}\n`;
  text += `Age: ${s.patient.age} | Gender: ${s.patient.gender} | Blood: ${s.patient.bloodGroup}\n\n`;
  text += `Procedure: ${s.surgeryType}\n`;
  text += `Room: ${s.room}\n`;
  text += `Lead Surgeon: ${s.doctor}\n`;
  text += `Date: ${new Date().toLocaleDateString()}\n`;
  text += `Duration: ${totalDuration}\n\n`;
  text += `SUMMARY\n${"-".repeat(30)}\n`;
  text += `Total Steps: ${state.stepTimestamps.length}\n`;
  text += `Completed: ${completedCount}\n`;
  text += `Skipped: ${skippedCount}\n`;
  text += `AI Interventions: ${state.aiInterventions}\n\n`;
  text += `STEP TIMELINE\n${"-".repeat(30)}\n`;
  state.stepTimestamps.forEach((ts, i) => {
    text += `${i + 1}. ${ts.name}\n`;
    text += `   Time: ${formatTime(ts.startTime)} - ${formatTime(ts.endTime)} | Status: ${ts.status.toUpperCase()}\n`;
  });
  text += `\n${"=".repeat(50)}\n`;
  text += `Generated by AI Surgical Checklist System v2.4\n`;

  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Surgery_Report_${s.patient.name.replace(/\s/g, "_")}_${new Date().toISOString().slice(0, 10)}.txt`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("Report downloaded", "ok");
}
