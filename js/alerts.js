/* ========== ALERT SYSTEM ========== */
function showAlert(alert) {
  const overlay = document.getElementById("alert-overlay");
  const iconWrap = document.getElementById("alert-icon-wrap");
  const icon = document.getElementById("alert-icon");
  const typeLabel = document.getElementById("alert-type-label");
  const message = document.getElementById("alert-message");
  const btn1 = document.getElementById("alert-btn-1");
  const btn2 = document.getElementById("alert-btn-2");
  const btn3 = document.getElementById("alert-btn-3");
  const countdownText = document.getElementById("alert-countdown-text");
  const countdownBar = document.getElementById("alert-countdown-bar");

  const isCritical = alert.type === "critical";
  const timerSec = alert.timer || 8;

  iconWrap.className =
    "w-10 h-10 rounded-full flex items-center justify-center " +
    (isCritical ? "bg-red-100" : "bg-amber-100");
  icon.className =
    "text-lg " +
    (isCritical
      ? "fa-solid fa-triangle-exclamation text-crit"
      : "fa-solid fa-circle-exclamation text-warn");
  typeLabel.className =
    "text-[11px] font-semibold uppercase tracking-wider " +
    (isCritical ? "text-crit" : "text-amber-600");
  typeLabel.textContent = isCritical ? "Critical Alert" : "Warning";
  message.textContent = alert.message;

  btn1.textContent = "Already Done";
  btn2.textContent = "Mark Completed";
  btn3.textContent = "Skip Step";

  countdownText.textContent = timerSec + "s";
  countdownBar.style.width = "100%";

  // Red flash
  document.getElementById("page-surgery").classList.add("red-flash");
  setTimeout(
    () => document.getElementById("page-surgery").classList.remove("red-flash"),
    1500,
  );

  overlay.classList.add("show");
  state.alertAutoSkipped = false;

  // Sound
  if (isCritical) playCriticalAlarm();
  else playAlertBeep();

  // Countdown
  let remaining = timerSec * 10; // tenths of seconds
  state.alertCountdownInterval = setInterval(() => {
    remaining--;
    const pct = (remaining / (timerSec * 10)) * 100;
    countdownBar.style.width = pct + "%";
    countdownText.textContent = Math.ceil(remaining / 10) + "s";
    if (remaining <= 0) {
      clearInterval(state.alertCountdownInterval);
      autoSkipAlert();
    }
  }, 100);

  state.alertTimeoutId = setTimeout(
    () => {
      // Backup auto-skip
    },
    (timerSec + 0.5) * 1000,
  );
}

function autoSkipAlert() {
  if (state.alertAutoSkipped) return;
  state.alertAutoSkipped = true;
  stopAlarm();
  playSkipWarning();

  const overlay = document.getElementById("alert-overlay");
  overlay.classList.remove("show");

  const idx = state.currentStepIndex;
  const ts = state.stepTimestamps.find(
    (t) => t.stepId === state.generatedChecklist[idx].id,
  );
  if (ts) ts.status = "skipped";

  updateStepUI(
    idx,
    "skipped",
    '<i class="fa-solid fa-forward text-[9px]"></i>',
    "Auto-skipped",
  );
  showToast("Step auto-skipped due to timeout", "crit");
  state.isPaused = false;

  setTimeout(() => processNextStep(), 1200);
}

function handleAlertResponse(response) {
  if (state.alertAutoSkipped) return;
  state.alertAutoSkipped = true;

  clearInterval(state.alertCountdownInterval);
  clearTimeout(state.alertTimeoutId);
  stopAlarm();

  const overlay = document.getElementById("alert-overlay");
  overlay.classList.remove("show");

  const idx = state.currentStepIndex;
  const ts = state.stepTimestamps.find(
    (t) => t.stepId === state.generatedChecklist[idx].id,
  );

  if (response === "already_done") {
    // AI mistake - keep as completed
    updateStepUI(
      idx,
      "completed",
      '<i class="fa-solid fa-check text-[9px]"></i>',
      (ts ? formatTime(ts.endTime) : "") + " · AI corrected",
    );
    if (ts) ts.status = "ai-corrected";
    showToast("Step confirmed — AI alert dismissed", "ok");
    speak("Alert dismissed. Step confirmed as completed.");
  } else if (response === "mark_completed") {
    updateStepUI(
      idx,
      "completed",
      '<i class="fa-solid fa-check text-[9px]"></i>',
      (ts ? formatTime(ts.endTime) : "") + " · Manually confirmed",
    );
    if (ts) ts.status = "completed";
    showToast("Step marked as completed", "ok");
    playChime();
    speak("Step marked as completed.");
  } else {
    // Skip
    updateStepUI(
      idx,
      "skipped",
      '<i class="fa-solid fa-forward text-[9px]"></i>',
      "Skipped",
    );
    if (ts) ts.status = "skipped";
    showToast("Step skipped", "warn");
    playSkipWarning();
  }

  state.isPaused = false;
  setTimeout(() => processNextStep(), 1200);
}
