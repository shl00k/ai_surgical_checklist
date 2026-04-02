/* ========== TOAST ========== */
function showToast(msg, type = "info") {
  const c = document.getElementById("toast-container");
  const t = document.createElement("div");
  const icons = {
    ok: "fa-circle-check",
    warn: "fa-triangle-exclamation",
    crit: "fa-circle-xmark",
    info: "fa-circle-info",
  };
  t.className = `toast toast-${type}`;
  t.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}"></i><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(() => {
    t.style.animation = "toastOut .3s ease forwards";
    setTimeout(() => t.remove(), 300);
  }, 3500);
}

/* ========== SOUND TOGGLE ========== */
function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  const icon = document.querySelector("#sound-btn i");
  const surgIcon = document.querySelector("#surg-sound-btn i");
  if (icon) {
    icon.className = state.soundEnabled
      ? "fa-solid fa-volume-high text-navy-800 text-[14px]"
      : "fa-solid fa-volume-xmark text-gray-400 text-[14px]";
  }
  if (surgIcon) {
    surgIcon.className = state.soundEnabled
      ? "fa-solid fa-volume-high text-white/70 text-xs"
      : "fa-solid fa-volume-xmark text-white/70 text-xs";
  }
  showToast(state.soundEnabled ? "Sound enabled" : "Sound muted", "info");
}

/* ========== NOTIFICATIONS ========== */
function toggleNotifications() {
  document.getElementById("notif-dropdown").classList.toggle("show");
}
document.addEventListener("click", (e) => {
  if (!e.target.closest("#notif-btn") && !e.target.closest("#notif-dropdown")) {
    document.getElementById("notif-dropdown").classList.remove("show");
  }
});

/* ========== AUDIO ========== */
function playChime() {
  if (!state.soundEnabled) return;
  if (!state.audioCtx) {
    state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  const osc = state.audioCtx.createOscillator();
  const gain = state.audioCtx.createGain();
  osc.connect(gain);
  gain.connect(state.audioCtx.destination);
  osc.frequency.setValueAtTime(800, state.audioCtx.currentTime);
  osc.frequency.setValueAtTime(600, state.audioCtx.currentTime + 0.1);
  gain.gain.setValueAtTime(0.1, state.audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.01,
    state.audioCtx.currentTime + 0.3,
  );
  osc.start(state.audioCtx.currentTime);
  osc.stop(state.audioCtx.currentTime + 0.3);
}

/* ========== TIME FORMATTING ========== */
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

/* ========== AUDIO ========== */
function getAudioCtx() {
  if (!state.audioCtx)
    state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (state.audioCtx.state === "suspended") state.audioCtx.resume();
  return state.audioCtx;
}

function playAlertBeep() {
  if (!state.soundEnabled) return;
  try {
    const ctx = getAudioCtx(),
      t = ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const o = ctx.createOscillator(),
        g = ctx.createGain();
      o.type = "square";
      o.frequency.setValueAtTime(880, t + i * 0.25);
      g.gain.setValueAtTime(0.12, t + i * 0.25);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.25 + 0.15);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(t + i * 0.25);
      o.stop(t + i * 0.25 + 0.15);
    }
  } catch (e) {}
}

let alarmOscillators = [];
function playCriticalAlarm() {
  if (!state.soundEnabled) return;
  stopAlarm();
  try {
    const ctx = getAudioCtx();
    function beep() {
      const o = ctx.createOscillator(),
        g = ctx.createGain();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(600, ctx.currentTime);
      g.gain.setValueAtTime(0.1, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(ctx.currentTime);
      o.stop(ctx.currentTime + 0.3);
      alarmOscillators.push(o);
    }
    beep();
    state._alarmInterval = setInterval(beep, 500);
  } catch (e) {}
}

function stopAlarm() {
  if (state._alarmInterval) {
    clearInterval(state._alarmInterval);
    state._alarmInterval = null;
  }
  alarmOscillators = [];
}

function playSkipWarning() {
  if (!state.soundEnabled) return;
  try {
    const ctx = getAudioCtx(),
      t = ctx.currentTime;
    const o = ctx.createOscillator(),
      g = ctx.createGain();
    o.type = "triangle";
    o.frequency.setValueAtTime(440, t);
    o.frequency.linearRampToValueAtTime(330, t + 0.3);
    g.gain.setValueAtTime(0.15, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(t);
    o.stop(t + 0.4);
  } catch (e) {}
}

/* ========== SPEECH ========== */
function speak(text) {
  if (!state.soundEnabled) return;
  try {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.95;
      u.pitch = 1.0;
      u.volume = 0.65;
      const voices = window.speechSynthesis.getVoices();
      const preferred =
        voices.find(
          (v) => v.lang.startsWith("en") && v.name.includes("Google"),
        ) || voices.find((v) => v.lang.startsWith("en"));
      if (preferred) u.voice = preferred;
      window.speechSynthesis.speak(u);
    }
  } catch (e) {}
}
