/* ========== DASHBOARD ========== */
function renderDashboard() {
  const el = document.getElementById("page-dashboard");
  const active = surgeries.filter((s) => s.status === "active");
  const inProgress = surgeries.filter((s) => s.status === "in-progress");
  const upcoming = surgeries.filter((s) => s.status === "upcoming");
  const completed = surgeries.filter((s) => s.status === "completed");

  el.innerHTML = `
    <div class="max-w-7xl mx-auto p-6">
      <div class="flex items-end justify-between mb-6">
        <div>
          <h1 class="font-display text-2xl font-bold text-navy-900 tracking-tight">Dashboard Overview</h1>
          <p class="text-sm text-gray-400 mt-1">${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
        <div class="flex gap-2">
          <button onclick="addPatient()" class="px-4 py-2 bg-pri-500 text-white rounded-lg text-[13px] font-semibold hover:bg-pri-600 transition flex items-center gap-2 shadow-sm">
            <i class="fa-solid fa-plus text-[11px]"></i>Add Patient
          </button>
          <button onclick="scheduleSurgery()" class="px-4 py-2 bg-white text-navy-900 border border-gray-200 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition flex items-center gap-2">
            <i class="fa-regular fa-calendar-plus text-[11px]"></i>Schedule Surgery
          </button>
        </div>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 font-medium">Active Surgeries</p>
              <p class="text-3xl font-bold text-navy-900 mt-1">${active.length}</p>
            </div>
            <div class="w-12 h-12 rounded-full bg-pri-50 flex items-center justify-center">
              <i class="fa-solid fa-heartbeat text-pri-500 text-lg"></i>
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm">
            <span class="text-green-600 font-medium">+12%</span>
            <span class="text-gray-400 ml-2">from last week</span>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 font-medium">In Progress</p>
              <p class="text-3xl font-bold text-navy-900 mt-1">${inProgress.length}</p>
            </div>
            <div class="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
              <i class="fa-solid fa-clock text-amber-500 text-lg"></i>
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm">
            <span class="text-amber-600 font-medium">2 ongoing</span>
            <span class="text-gray-400 ml-2">in ORs</span>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 font-medium">Completed Today</p>
              <p class="text-3xl font-bold text-navy-900 mt-1">${completed.length}</p>
            </div>
            <div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
              <i class="fa-solid fa-check text-green-500 text-lg"></i>
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm">
            <span class="text-green-600 font-medium">98.5%</span>
            <span class="text-gray-400 ml-2">success rate</span>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 font-medium">AI Interventions</p>
              <p class="text-3xl font-bold text-navy-900 mt-1">24</p>
            </div>
            <div class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <i class="fa-solid fa-robot text-blue-500 text-lg"></i>
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm">
            <span class="text-blue-600 font-medium">+8%</span>
            <span class="text-gray-400 ml-2">this month</span>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Surgery Status Chart -->
        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <h3 class="font-display font-semibold text-navy-900 text-lg mb-4">Surgery Status Overview</h3>
          <div class="h-64 flex items-center justify-center">
            <div class="text-center">
              <div class="w-32 h-32 mx-auto mb-4 relative">
                <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e5ec" stroke-width="2"></path>
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#0a6e8a" stroke-width="2" stroke-dasharray="40, 100"></path>
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ffb300" stroke-width="2" stroke-dasharray="25, 100" stroke-dashoffset="-40"></path>
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#43a047" stroke-width="2" stroke-dasharray="35, 100" stroke-dashoffset="-65"></path>
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-2xl font-bold text-navy-900">${active.length + inProgress.length + upcoming.length + completed.length}</span>
                </div>
              </div>
              <div class="flex justify-center gap-4 text-sm">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full bg-pri-500"></div>
                  <span>Active</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span>In Progress</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Performance Chart -->
        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <h3 class="font-display font-semibold text-navy-900 text-lg mb-4">Weekly Performance</h3>
          <div class="h-64 flex items-center justify-center">
            <div class="w-full">
              <div class="flex items-end justify-between h-32 gap-2">
                <div class="flex-1 flex flex-col items-center">
                  <div class="w-full bg-gray-200 rounded-t h-16 mb-2" style="height: 64px;"></div>
                  <span class="text-xs text-gray-500">Mon</span>
                </div>
                <div class="flex-1 flex flex-col items-center">
                  <div class="w-full bg-pri-500 rounded-t h-20 mb-2" style="height: 80px;"></div>
                  <span class="text-xs text-gray-500">Tue</span>
                </div>
                <div class="flex-1 flex flex-col items-center">
                  <div class="w-full bg-pri-500 rounded-t h-24 mb-2" style="height: 96px;"></div>
                  <span class="text-xs text-gray-500">Wed</span>
                </div>
                <div class="flex-1 flex flex-col items-center">
                  <div class="w-full bg-pri-500 rounded-t h-28 mb-2" style="height: 112px;"></div>
                  <span class="text-xs text-gray-500">Thu</span>
                </div>
                <div class="flex-1 flex flex-col items-center">
                  <div class="w-full bg-pri-500 rounded-t h-32 mb-2" style="height: 128px;"></div>
                  <span class="text-xs text-gray-500">Fri</span>
                </div>
                <div class="flex-1 flex flex-col items-center">
                  <div class="w-full bg-gray-200 rounded-t h-20 mb-2" style="height: 80px;"></div>
                  <span class="text-xs text-gray-500">Sat</span>
                </div>
                <div class="flex-1 flex flex-col items-center">
                  <div class="w-full bg-gray-200 rounded-t h-16 mb-2" style="height: 64px;"></div>
                  <span class="text-xs text-gray-500">Sun</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity & Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Surgeries -->
        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <h3 class="font-display font-semibold text-navy-900 text-lg mb-4">Recent Activity</h3>
          <div class="space-y-3">
            ${active
              .slice(0, 3)
              .map(
                (s) => `
              <div class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer" onclick="navigateTo('details',${s.id})">
                <div class="w-8 h-8 rounded-full bg-pri-50 flex items-center justify-center">
                  <span class="text-pri-700 font-semibold text-xs">${s.patient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-navy-900 truncate">${s.patient.name}</p>
                  <p class="text-xs text-gray-500 truncate">${s.surgeryType}</p>
                </div>
                <span class="text-xs text-pri-600 font-medium">${s.scheduledTime}</span>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <h3 class="font-display font-semibold text-navy-900 text-lg mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <button onclick="navigateTo('surgeries')" class="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-pri-50 transition text-left">
              <div class="w-8 h-8 rounded-full bg-pri-100 flex items-center justify-center">
                <i class="fa-solid fa-heartbeat text-pri-600 text-sm"></i>
              </div>
              <div>
                <p class="text-sm font-medium text-navy-900">View All Surgeries</p>
                <p class="text-xs text-gray-500">Manage surgical procedures</p>
              </div>
            </button>
            <button onclick="navigateTo('patients')" class="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition text-left">
              <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <i class="fa-solid fa-users text-blue-600 text-sm"></i>
              </div>
              <div>
                <p class="text-sm font-medium text-navy-900">Patient Records</p>
                <p class="text-xs text-gray-500">Access patient information</p>
              </div>
            </button>
            <button onclick="navigateTo('analytics')" class="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition text-left">
              <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <i class="fa-solid fa-chart-bar text-green-600 text-sm"></i>
              </div>
              <div>
                <p class="text-sm font-medium text-navy-900">Analytics</p>
                <p class="text-xs text-gray-500">View performance metrics</p>
              </div>
            </button>
          </div>
        </div>

        <!-- System Status -->
        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <h3 class="font-display font-semibold text-navy-900 text-lg mb-4">System Status</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">AI Assistant</span>
              <span class="flex items-center gap-2 text-sm text-green-600 font-medium">
                <div class="w-2 h-2 rounded-full bg-green-500"></div>
                Online
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">OR Cameras</span>
              <span class="flex items-center gap-2 text-sm text-green-600 font-medium">
                <div class="w-2 h-2 rounded-full bg-green-500"></div>
                Active
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Vital Signs Monitor</span>
              <span class="flex items-center gap-2 text-sm text-amber-600 font-medium">
                <div class="w-2 h-2 rounded-full bg-amber-500"></div>
                Maintenance
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const fixedButtons = document.getElementById("fixed-buttons");
  fixedButtons.innerHTML = `<button onclick="navigateTo('generation',${active[0]?.id || 1})" class="px-8 py-3.5 bg-pri-500 text-white rounded-xl text-[14px] font-semibold hover:bg-pri-600 transition shadow-lg shadow-pri-500/20 flex items-center gap-2.5">
    <i class="fa-solid fa-wand-magic-sparkles text-[13px]"></i>Generate AI Checklist & Continue
  </button>`;
}

function renderSurgeries() {
  const el = document.getElementById("page-surgeries");
  const active = surgeries.filter((s) => s.status === "active");
  const inProgress = surgeries.filter((s) => s.status === "in-progress");
  const upcoming = surgeries.filter((s) => s.status === "upcoming");
  const completed = surgeries.filter((s) => s.status === "completed");

  el.innerHTML = `
    <div class="max-w-7xl mx-auto p-6">
      <div class="flex items-end justify-between mb-6">
        <div>
          <h1 class="font-display text-2xl font-bold text-navy-900 tracking-tight">All Surgeries</h1>
          <p class="text-sm text-gray-400 mt-1">Manage and monitor all surgical procedures</p>
        </div>
        <button onclick="scheduleSurgery()" class="px-4 py-2 bg-pri-500 text-white rounded-lg text-[13px] font-semibold hover:bg-pri-600 transition flex items-center gap-2 shadow-sm">
          <i class="fa-solid fa-plus text-[11px]"></i>Schedule Surgery
        </button>
      </div>

      <!-- Active Surgeries -->
      <section class="mb-8">
        <div class="flex items-center gap-2 mb-4">
          <h2 class="font-display text-lg font-semibold text-navy-900">Active Surgeries</h2>
          <span class="badge badge-active">${active.length}</span>
        </div>
        <div class="surgery-grid grid grid-cols-1 md:grid-cols-2 gap-4">
          ${active
            .map(
              (s) => `
            <div class="surg-card" onclick="navigateTo('details',${s.id})" tabindex="0" role="button" aria-label="View ${s.patient.name} surgery">
              <div class="glow"></div>
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-pri-50 flex items-center justify-center">
                    <span class="text-pri-700 font-semibold text-sm">${s.patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}</span>
                  </div>
                  <div>
                    <p class="font-semibold text-navy-900 text-[14px]">${s.patient.name}</p>
                    <p class="text-[12px] text-gray-400">${s.patient.age} yrs, ${s.patient.gender} · ${s.patient.bloodGroup}</p>
                  </div>
                </div>
                <span class="badge badge-active"><span class="w-1.5 h-1.5 rounded-full bg-pri-500 pulse-dot"></span>Active</span>
              </div>
              <p class="text-[13px] font-medium text-navy-800 mb-1">${s.surgeryType}</p>
              <div class="flex items-center gap-4 text-[12px] text-gray-400 mt-2">
                <span><i class="fa-regular fa-clock mr-1"></i>${s.scheduledTime}</span>
                <span><i class="fa-solid fa-location-dot mr-1"></i>${s.room}</span>
                <span><i class="fa-regular fa-hourglass-half mr-1"></i>${s.duration}</span>
              </div>
              <div class="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <i class="fa-solid fa-user-doctor text-pri-400 text-[11px]"></i>
                <span class="text-[12px] text-gray-500">${s.doctor}</span>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
      </section>

      <!-- In Progress & Upcoming -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <section>
          <div class="flex items-center gap-2 mb-4">
            <h2 class="font-display text-lg font-semibold text-navy-900">In Progress</h2>
            <span class="badge badge-locked">${inProgress.length}</span>
          </div>
          ${
            inProgress.length === 0
              ? '<p class="text-sm text-gray-400 py-8 text-center">No surgeries in progress</p>'
              : inProgress
                  .map(
                    (s) => `
            <div class="surg-card locked" onclick="showToast('This surgery is currently locked by the attending team','warn')">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                  <i class="fa-solid fa-lock text-gray-400 text-xs"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-medium text-gray-500 text-[13px] truncate">${s.patient.name}</p>
                  <p class="text-[11px] text-gray-400 truncate">${s.surgeryType}</p>
                </div>
                <span class="badge badge-locked">Locked</span>
              </div>
              <p class="text-[11px] text-gray-400 mt-2"><i class="fa-solid fa-location-dot mr-1"></i>${s.room} · ${s.scheduledTime}</p>
            </div>
          `,
                  )
                  .join("")
          }
        </section>
        <section>
          <div class="flex items-center gap-2 mb-4">
            <h2 class="font-display text-lg font-semibold text-navy-900">Upcoming</h2>
          <span class="badge badge-upcoming">${upcoming.length}</span>
        </div>
        ${
          upcoming.length === 0
            ? '<p class="text-sm text-gray-400 py-8 text-center">No upcoming surgeries</p>'
            : upcoming
                .map(
                  (s) => `
            <div class="surg-card faded" onclick="showToast('This surgery has not started yet','info')">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center">
                  <span class="text-amber-700 font-semibold text-xs">${s.patient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-medium text-gray-600 text-[13px] truncate">${s.patient.name}</p>
                  <p class="text-[11px] text-gray-400 truncate">${s.surgeryType}</p>
                </div>
                <span class="badge badge-upcoming">${s.scheduledTime}</span>
              </div>
              <p class="text-[11px] text-gray-400 mt-2"><i class="fa-solid fa-location-dot mr-1"></i>${s.room} · ${s.doctor}</p>
            </div>
          `,
                )
                .join("")
        }
      </section>
    </div>

    <!-- History -->
    <section class="mb-8">
      <div class="flex items-center gap-2 mb-4">
        <h2 class="font-display text-lg font-semibold text-navy-900">History</h2>
        <span class="badge badge-completed">${completed.length}</span>
      </div>
      <div class="surgery-grid grid grid-cols-1 md:grid-cols-2 gap-4">
        ${completed
          .map(
            (s) => `
            <div class="surg-card" onclick="viewHistoryReport(${s.id})" tabindex="0" role="button" aria-label="View ${s.patient.name} report">
              <div class="flex items-start justify-between mb-2">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                    <i class="fa-solid fa-check text-ok text-sm"></i>
                  </div>
                  <div>
                    <p class="font-semibold text-navy-900 text-[14px]">${s.patient.name}</p>
                    <p class="text-[12px] text-gray-400">${s.surgeryType}</p>
                  </div>
                </div>
                <span class="badge badge-completed">Completed</span>
              </div>
              <div class="flex items-center gap-4 text-[12px] text-gray-400 mt-2">
                <span><i class="fa-regular fa-clock mr-1"></i>${s.completedDuration}</span>
                <span><i class="fa-solid fa-robot mr-1"></i>${s.aiInterventions} AI events</span>
                <span><i class="fa-solid fa-location-dot mr-1"></i>${s.room}</span>
              </div>
            </div>
          `,
          )
          .join("")}
      </div>
    </section>
  </div>
  `;
}

function renderPatients() {
  const el = document.getElementById("page-patients");
  // Get unique patients from surgeries
  const patientMap = new Map();
  surgeries.forEach((s) => {
    if (!patientMap.has(s.patient.mrn)) {
      patientMap.set(s.patient.mrn, {
        ...s.patient,
        lastSurgery: s.surgeryType,
        surgeryDate: s.scheduledTime,
        hasSurgery: true,
      });
    }
  });
  // Add standalone patients
  patients.forEach((p) => {
    if (!patientMap.has(p.mrn)) {
      patientMap.set(p.mrn, {
        ...p,
        lastSurgery: "No surgery scheduled",
        surgeryDate: "N/A",
        hasSurgery: false,
      });
    }
  });
  const allPatients = Array.from(patientMap.values());

  el.innerHTML = `
    <div class="max-w-7xl mx-auto p-6">
      <div class="flex items-end justify-between mb-6">
        <div>
          <h1 class="font-display text-2xl font-bold text-navy-900 tracking-tight">Patient Records</h1>
          <p class="text-sm text-gray-400 mt-1">Access and manage patient information</p>
        </div>
        <button onclick="addPatient()" class="px-4 py-2 bg-pri-500 text-white rounded-lg text-[13px] font-semibold hover:bg-pri-600 transition flex items-center gap-2 shadow-sm">
          <i class="fa-solid fa-plus text-[11px]"></i>Add Patient
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${allPatients
          .map(
            (patient) => `
          <div class="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition">
            <div class="flex items-start gap-3 mb-3">
              <div class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <span class="text-blue-700 font-semibold text-sm">${patient.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}</span>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-navy-900 text-[14px] truncate">${patient.name}</h3>
                <p class="text-[12px] text-gray-400">${patient.age} yrs, ${patient.gender}</p>
              </div>
            </div>
            <div class="space-y-2 text-[12px]">
              <div class="flex justify-between">
                <span class="text-gray-500">Blood Type:</span>
                <span class="font-semibold text-crit">${patient.bloodGroup}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">MRN:</span>
                <span class="font-mono">${patient.mrn}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Last Surgery:</span>
                <span class="text-navy-800 truncate">${patient.lastSurgery}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Date:</span>
                <span>${patient.surgeryDate}</span>
              </div>
            </div>
            <div class="mt-4 pt-3 border-t border-gray-100">
              <button onclick="showToast('Patient details available in full version','info')" class="w-full px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-[12px] font-semibold hover:bg-blue-100 transition">
                View Full Record
              </button>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderAnalytics() {
  const el = document.getElementById("page-analytics");
  el.innerHTML = `
    <div class="max-w-7xl mx-auto p-6">
      <div class="flex items-end justify-between mb-6">
        <div>
          <h1 class="font-display text-2xl font-bold text-navy-900 tracking-tight">Analytics & Insights</h1>
          <p class="text-sm text-gray-400 mt-1">View performance metrics and analytics</p>
        </div>
        <div class="flex gap-2">
          <button onclick="showToast('Available in the full clinical version','info')" class="px-4 py-2 bg-white text-navy-900 border border-gray-200 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition flex items-center gap-2">
            <i class="fa-solid fa-download text-[11px]"></i>Export Report
          </button>
        </div>
      </div>

      <div class="bg-white rounded-xl p-8 border border-gray-200 text-center">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
          <i class="fa-solid fa-chart-bar text-green-500 text-2xl"></i>
        </div>
        <h3 class="font-display font-semibold text-navy-900 text-xl mb-2">Advanced Analytics</h3>
        <p class="text-gray-500 mb-6">Comprehensive analytics and reporting features are available in the full clinical version.</p>
        <button onclick="showToast('Available in the full clinical version','info')" class="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition">
          Upgrade to Full Version
        </button>
      </div>
    </div>
  `;
}

function renderReports() {
  const el = document.getElementById("page-reports");
  el.innerHTML = `
    <div class="max-w-7xl mx-auto p-6">
      <div class="flex items-end justify-between mb-6">
        <div>
          <h1 class="font-display text-2xl font-bold text-navy-900 tracking-tight">Reports & Documentation</h1>
          <p class="text-sm text-gray-400 mt-1">Generate and manage surgical reports</p>
        </div>
        <button onclick="showToast('Available in the full clinical version','info')" class="px-4 py-2 bg-pri-500 text-white rounded-lg text-[13px] font-semibold hover:bg-pri-600 transition flex items-center gap-2 shadow-sm">
          <i class="fa-solid fa-plus text-[11px]"></i>Generate Report
        </button>
      </div>

      <div class="bg-white rounded-xl p-8 border border-gray-200 text-center">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-50 flex items-center justify-center">
          <i class="fa-solid fa-file-medical text-purple-500 text-2xl"></i>
        </div>
        <h3 class="font-display font-semibold text-navy-900 text-xl mb-2">Report Generation</h3>
        <p class="text-gray-500 mb-6">Automated report generation and documentation tools are available in the full clinical version.</p>
        <button onclick="showToast('Available in the full clinical version','info')" class="px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition">
          Upgrade to Full Version
        </button>
      </div>
    </div>
  `;
}

function renderSettings() {
  const el = document.getElementById("page-settings");
  el.innerHTML = `
    <div class="max-w-7xl mx-auto p-6">
      <div class="flex items-end justify-between mb-6">
        <div>
          <h1 class="font-display text-2xl font-bold text-navy-900 tracking-tight">System Settings</h1>
          <p class="text-sm text-gray-400 mt-1">Configure system preferences and settings</p>
        </div>
      </div>

      <div class="bg-white rounded-xl p-8 border border-gray-200 text-center">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
          <i class="fa-solid fa-cog text-gray-500 text-2xl"></i>
        </div>
        <h3 class="font-display font-semibold text-navy-900 text-xl mb-2">System Configuration</h3>
        <p class="text-gray-500 mb-6">Advanced settings and configuration options are available in the full clinical version.</p>
        <button onclick="showToast('Available in the full clinical version','info')" class="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition">
          Upgrade to Full Version
        </button>
      </div>
    </div>
  `;
}

function viewHistoryReport(id) {
  const s = surgeries.find((x) => x.id === id);
  if (!s) return;
  state.isFromHistory = true;
  state.selectedSurgery = s;
  // Build mock timestamps for history
  const stepCount = s.surgeryType.includes("Bypass") ? 14 : 10;
  state.stepTimestamps = [];
  let t = 0;
  for (let i = 0; i < stepCount; i++) {
    const dur = 3000 + Math.random() * 5000;
    const status =
      s.missedSteps > 0 && i === Math.floor(stepCount * 0.6)
        ? "skipped"
        : s.aiInterventions > 0 && i === Math.floor(stepCount * 0.4)
          ? "ai-corrected"
          : "completed";
    state.stepTimestamps.push({
      stepId: i + 1,
      name: `Step ${i + 1}`,
      startTime: t,
      endTime: t + dur,
      status,
    });
    t += dur;
  }
  state.aiInterventions = s.aiInterventions;
  state.surgeryStartTime = Date.now() - t;
  navigateTo("report");
}

/* ========== SURGERY DETAILS ========== */
function renderDetails(surgeryId) {
  const s = surgeries.find((x) => x.id === surgeryId);
  if (!s) return;
  state.selectedSurgery = s;
  const el = document.getElementById("page-details");

  el.innerHTML = `
    <div class="max-w-6xl mx-auto p-6">
      <button onclick="navigateTo('dashboard')" class="flex items-center gap-2 text-sm text-gray-400 hover:text-pri-600 transition mb-4">
        <i class="fa-solid fa-arrow-left text-xs"></i>Back to Dashboard
      </button>
      <div class="flex items-center gap-3 mb-4">
        <h1 class="font-display text-xl font-bold text-navy-900">Surgery Details</h1>
        <span class="badge badge-active"><span class="w-1.5 h-1.5 rounded-full bg-pri-500 pulse-dot"></span>Active</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <!-- Left Side: Patient Details -->
        <div class="space-y-4">
          <div class="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <h3 class="font-display font-semibold text-navy-900 text-[15px] mb-4 flex items-center gap-2">
              <i class="fa-solid fa-user text-pri-400 text-sm"></i>Patient Details
            </h3>

            <!-- Patient Image Placeholder -->
            <div class="flex justify-center mb-4">
              <div class="w-24 h-24 rounded-full bg-gray-100 border-4 border-white shadow-lg flex items-center justify-center">
                <i class="fa-solid fa-user text-gray-400 text-3xl"></i>
              </div>
            </div>

            <div class="space-y-2">
              ${[
                ["Full Name", s.patient.name],
                [
                  "Date of Birth",
                  "March 15, 1985 (Age: " + s.patient.age + ")",
                ],
                ["Gender", s.patient.gender],
                [
                  "Blood Type",
                  `<span class="font-semibold text-crit">${s.patient.bloodGroup}</span>`,
                ],
                [
                  "Medical Record Number",
                  `<span class="font-mono text-[13px]">${s.patient.mrn}</span>`,
                ],
                ["Contact Number", "+91 98765 43210"],
                ["Emergency Contact", "Rajesh Kumar (+91 87654 32109)"],
                ["Allergies", "None documented"],
                ["Current Medications", "Lisinopril 10mg daily"],
                ["Pre-existing Conditions", "Hypertension"],
                ["Insurance Provider", "Star Health Insurance"],
                ["Insurance ID", "SHI-123456789"],
              ]
                .map(
                  ([label, val]) => `
                <div class="flex justify-between items-start py-2 border-b border-gray-50 last:border-0">
                  <span class="text-[12px] text-gray-500 font-medium w-1/3">${label}</span>
                  <span class="text-[12px] font-medium text-navy-900 text-right w-2/3">${val}</span>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
        </div>

        <!-- Right Side: Surgery Information and Team -->
        <div class="space-y-4">
          <!-- Surgery Information -->
          <div class="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <h3 class="font-display font-semibold text-navy-900 text-[15px] mb-4 flex items-center gap-2">
              <i class="fa-solid fa-heart-pulse text-pri-400 text-sm"></i>Surgery Information
            </h3>
            <div class="space-y-2">
              ${[
                ["Procedure Type", s.surgeryType],
                [
                  "Scheduled Date & Time",
                  new Date().toLocaleDateString() + " at " + s.scheduledTime,
                ],
                ["Operating Room", s.room],
                ["Estimated Duration", s.duration],
                ["Anesthesia Type", "General Anesthesia"],
                ["Procedure Priority", "Elective"],
                [
                  "Pre-op Requirements",
                  "NPO after midnight, IV antibiotics 30 min prior",
                ],
                ["Post-op Care Unit", "Surgical Ward - Room 204"],
                ["Expected Discharge", "2-3 days post-op"],
                ["Follow-up Appointment", "2 weeks post-discharge"],
                ["Clinical Notes", s.notes],
                ["Special Equipment", "Laparoscopic tower, Harmonic scalpel"],
                ["Blood Products Ordered", "2 units PRBC on hold"],
              ]
                .map(
                  ([label, val]) => `
                <div class="flex justify-between items-start py-2 border-b border-gray-50 last:border-0">
                  <span class="text-[12px] text-gray-500 font-medium w-1/3">${label}</span>
                  <span class="text-[12px] font-medium text-navy-900 text-right w-2/3">${val}</span>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>

          <!-- Surgical Team -->
          <div class="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <h3 class="font-display font-semibold text-navy-900 text-[15px] mb-4 flex items-center gap-2">
              <i class="fa-solid fa-people-group text-pri-400 text-sm"></i>Surgical Team
            </h3>
            <div class="space-y-3">
              <!-- Lead Surgeon -->
              <div class="flex items-center gap-3 p-3 bg-pri-50 rounded-lg border border-pri-100">
                <div class="w-10 h-10 rounded-full bg-pri-500 flex items-center justify-center">
                  <span class="text-white font-bold text-sm">${s.doctor
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}</span>
                </div>
                <div class="flex-1">
                  <p class="text-[13px] font-semibold text-navy-900">${s.doctor}</p>
                  <p class="text-[11px] text-pri-700 font-medium">Lead Surgeon</p>
                  <p class="text-[10px] text-gray-500 mt-1">Board Certified General Surgeon</p>
                </div>
                <div class="text-right">
                  <div class="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  <p class="text-[9px] text-gray-500 mt-1">Available</p>
                </div>
              </div>

              <!-- Team Members -->
              <div class="grid grid-cols-1 gap-2">
                ${s.team
                  .map((member, index) => {
                    const role =
                      index === 0
                        ? "Second Surgeon"
                        : index === 1
                          ? "Anesthetist"
                          : index === 2
                            ? "Anesthesia Technician"
                            : index === 3
                              ? "Surgical Nurse"
                              : "Circulating Nurse";
                    const initials = member
                      .split(" ")
                      .filter((w) => w.length > 1)
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2);
                    const status =
                      index === 0 ? "green" : index === 1 ? "green" : "amber";
                    const statusText =
                      status === "green" ? "Available" : "In Prep";

                    return `
                    <div class="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-100">
                      <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span class="text-gray-600 font-bold text-xs">${initials}</span>
                      </div>
                      <div class="flex-1">
                        <p class="text-[12px] font-medium text-navy-900">${member}</p>
                        <p class="text-[10px] text-gray-500">${role}</p>
                      </div>
                      <div class="text-right">
                        <div class="w-2 h-2 rounded-full bg-${status}-500"></div>
                        <p class="text-[9px] text-gray-500 mt-0.5">${statusText}</p>
                      </div>
                    </div>
                    `;
                  })
                  .join("")}
              </div>

              <!-- Additional Staff -->
              <div class="mt-3 pt-3 border-t border-gray-100">
                <h4 class="text-[12px] font-semibold text-navy-900 mb-2">Additional Staff</h4>
                <div class="grid grid-cols-2 gap-1 text-[10px]">
                  <div class="flex items-center gap-1.5">
                    <div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span class="text-gray-600">Circulating Nurse</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span class="text-gray-600">OR Assistant</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span class="text-gray-600">Anesthesia Tech</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span class="text-gray-600">Equipment Tech</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const fixedButtons = document.getElementById("fixed-buttons");
  fixedButtons.innerHTML = `<button onclick="navigateTo('generation',${s.id})" class="px-8 py-3.5 bg-pri-500 text-white rounded-xl text-[14px] font-semibold hover:bg-pri-600 transition shadow-lg shadow-pri-500/20 flex items-center gap-2.5">
    <i class="fa-solid fa-wand-magic-sparkles text-[13px]"></i>Generate AI Checklist & Continue
  </button>`;
}

/* ========== AI GENERATION ========== */
function renderGeneration(surgeryId) {
  const s = surgeries.find((x) => x.id === surgeryId);
  if (!s) {
    s = state.selectedSurgery;
  }
  const el = document.getElementById("page-generation");

  el.innerHTML = `
    <div class="max-w-2xl mx-auto pt-12 p-6">
      <div class="text-center mb-8">
        <div class="w-14 h-14 rounded-2xl bg-pri-50 flex items-center justify-center mx-auto mb-4">
          <i class="fa-solid fa-brain text-pri-500 text-xl"></i>
        </div>
        <h1 class="font-display text-xl font-bold text-navy-900">AI Checklist Generation</h1>
        <p class="text-sm text-gray-400 mt-1.5">Analyzing procedure and building surgical checklist</p>
      </div>
      <div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <span id="gen-status" class="text-[13px] font-medium text-pri-600">Initializing...</span>
          <span id="gen-pct" class="text-[13px] font-semibold text-navy-900 tabular-nums">0%</span>
        </div>
        <div class="gen-progress mb-6"><div id="gen-bar" class="gen-progress-fill"></div></div>
        <div id="gen-logs" class="bg-navy-900 rounded-lg p-4 h-[220px] overflow-y-auto font-mono text-[12px] leading-relaxed"></div>
      </div>
      <div id="gen-checklist" class="mt-6 hidden"></div>
    </div>
  `;

  runGeneration(s);
}

/* ========== LIVE SURGERY PAGE ========== */
function renderSurgeryPage() {
  const s = state.selectedSurgery;
  const el = document.getElementById("page-surgery");

  el.innerHTML = `
    <!-- Surgery top bar -->
    <div class="bg-navy-900 text-white px-5 py-2.5 flex items-center justify-between flex-shrink-0">
      <div class="flex items-center gap-3">
        <div class="w-7 h-7 rounded-lg bg-pri-500/20 flex items-center justify-center"><i class="fa-solid fa-shield-halved text-pri-300 text-xs"></i></div>
        <div>
          <p class="text-[13px] font-semibold">${s.patient.name} — ${s.surgeryType}</p>
          <p class="text-[10px] text-gray-400">${s.room} · Dr. Ashok Seth</p>
        </div>
      </div>
      <div class="flex items-center gap-5">
        <div class="ecg-container w-32">
          <div class="ecg-line">
            <svg viewBox="0 0 400 32" width="400" height="32" preserveAspectRatio="none">
              <polyline points="0,16 60,16 70,16 80,4 90,28 100,16 110,12 120,16 180,16 240,16 250,16 260,4 270,28 280,16 290,12 300,16 360,16 400,16" fill="none" stroke="#43A047" stroke-width="1.5" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div class="text-center">
          <p class="text-[10px] text-gray-400 uppercase tracking-wider">Elapsed</p>
          <p id="surgery-timer" class="text-lg font-display font-bold tabular-nums text-green-400">00:00</p>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span class="text-[11px] text-green-400 font-semibold">LIVE</span>
        </div>
        <button id="surg-sound-btn" onclick="toggleSound()" class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition" aria-label="Toggle sound">
          <i class="fa-solid fa-volume-high text-white/70 text-xs"></i>
        </button>
      </div>
    </div>

    <!-- Main layout -->
    <div class="flex flex-1 overflow-hidden" style="height:calc(100vh - 46px);">
      <!-- Camera grid -->
      <div class="flex-1 p-3 overflow-hidden">
        <div class="cam-grid grid grid-cols-2 gap-2 h-full">
          <div class="cam-feed cam-feed-1">
            <div class="cam-bg"></div>
            <div class="cam-overlay">
              <span class="cam-label">Cam 01 — Overhead</span>
              <div class="cam-rec"><span class="dot"></span>REC</div>
              <span class="cam-time cam-ts">--:--:--</span>
              <div class="cam-vignette"></div>
            </div>
          </div>
          <div class="cam-feed cam-feed-2">
            <div class="cam-bg"></div>
            <div class="cam-overlay">
              <span class="cam-label">Cam 02 — Side View</span>
              <div class="cam-rec"><span class="dot"></span>REC</div>
              <span class="cam-time cam-ts">--:--:--</span>
              <div class="cam-vignette"></div>
            </div>
          </div>
          <div class="cam-feed cam-feed-3 col-span-2">
            <div class="cam-bg"></div>
            <div class="cam-overlay">
              <span class="cam-label">Cam 03 — Close-up</span>
              <div class="cam-rec"><span class="dot"></span>REC</div>
              <span class="cam-time cam-ts">--:--:--</span>
              <div class="cam-vignette"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Checklist panel -->
      <div class="checklist-panel w-[340px] bg-white border-l border-gray-100 flex flex-col flex-shrink-0 overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 flex-shrink-0">
          <div class="flex items-center justify-between">
            <h3 class="font-display font-semibold text-navy-900 text-[14px]">Surgical Checklist</h3>
            <span id="step-counter" class="text-[11px] font-semibold text-gray-400">0/${state.generatedChecklist.length}</span>
          </div>
          <div class="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden"><div id="checklist-progress" class="h-full bg-pri-500 rounded-full transition-all duration-500" style="width:0%"></div></div>
        </div>
        <div id="checklist-container" class="flex-1 overflow-y-auto p-3 space-y-1"></div>
        <div id="ai-status-bar" class="px-4 py-2.5 border-t border-gray-100 bg-pri-50/50 flex items-center gap-2 flex-shrink-0">
          <i class="fa-solid fa-robot text-pri-400 text-[11px]"></i>
          <span id="ai-status-text" class="text-[12px] text-pri-600 font-medium">AI monitoring active</span>
        </div>
      </div>
    </div>
  `;

  renderChecklist();
  startSurgeryTimer();
  startCameraTimestamps();
  setTimeout(() => processNextStep(), 1500);
}

function renderChecklist() {
  const container = document.getElementById("checklist-container");
  container.innerHTML = state.generatedChecklist
    .map(
      (step, i) => `
    <div id="step-${i}" class="checklist-step">
      <div id="step-icon-${i}" class="step-icon pending"><i class="fa-solid fa-circle text-[6px]"></i></div>
      <div class="flex-1 min-w-0">
        <p id="step-name-${i}" class="text-[13px] text-navy-800">${step.name}</p>
        <p id="step-meta-${i}" class="text-[11px] text-gray-400 mt-0.5"></p>
      </div>
    </div>
  `,
    )
    .join("");
}

/* ========== REPORT ========== */
function renderReport() {
  const s = state.selectedSurgery;
  if (!s) return;
  const el = document.getElementById("page-report");

  const totalDuration = state.surgeryStartTime
    ? formatTime(Date.now() - state.surgeryStartTime)
    : s.completedDuration || "N/A";
  const completedCount = state.stepTimestamps.filter(
    (t) => t.status === "completed",
  ).length;
  const skippedCount = state.stepTimestamps.filter(
    (t) => t.status === "skipped",
  ).length;
  const aiCorrectedCount = state.stepTimestamps.filter(
    (t) => t.status === "ai-corrected",
  ).length;
  const totalSteps = state.stepTimestamps.length;

  const statusColors = {
    completed: "bg-ok",
    skipped: "bg-crit",
    "ai-corrected": "bg-warn",
  };
  const statusIcons = {
    completed: "fa-check",
    skipped: "fa-forward",
    "ai-corrected": "fa-robot",
  };
  const statusLabels = {
    completed: "Completed",
    skipped: "Skipped",
    "ai-corrected": "AI Corrected",
  };

  el.innerHTML = `
    <div class="max-w-4xl mx-auto pt-4 p-6">
      <button onclick="navigateTo('dashboard')" class="flex items-center gap-2 text-sm text-gray-400 hover:text-pri-600 transition mb-6">
        <i class="fa-solid fa-arrow-left text-xs"></i>Return to Dashboard
      </button>

      <div class="text-center mb-8">
        <div class="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4">
          <i class="fa-solid fa-circle-check text-ok text-2xl"></i>
        </div>
        <h1 class="font-display text-2xl font-bold text-navy-900">Surgery Report</h1>
        <p class="text-sm text-gray-400 mt-1">${s.patient.name} — ${s.surgeryType}</p>
      </div>

      <!-- Summary cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        ${[
          {
            label: "Total Duration",
            value: totalDuration,
            icon: "fa-clock",
            color: "pri",
          },
          {
            label: "Steps Completed",
            value: `${completedCount}/${totalSteps}`,
            icon: "fa-list-check",
            color: "ok",
          },
          {
            label: "AI Interventions",
            value: state.aiInterventions,
            icon: "fa-robot",
            color: "warn",
          },
          {
            label: "Steps Skipped",
            value: skippedCount,
            icon: "fa-forward",
            color: skippedCount > 0 ? "crit" : "ok",
          },
        ]
          .map(
            (c) => `
          <div class="bg-white rounded-xl border border-gray-100 p-4 text-center shadow-sm">
            <div class="w-8 h-8 rounded-lg bg-${c.color === "pri" ? "pri-50" : c.color === "ok" ? "green-50" : c.color === "warn" ? "amber-50" : "red-50"} flex items-center justify-center mx-auto mb-2">
              <i class="fa-solid ${c.icon} text-${c.color === "pri" ? "pri-500" : c.color === "ok" ? "ok" : c.color === "warn" ? "warn" : "crit"} text-xs"></i>
            </div>
            <p class="font-display font-bold text-navy-900 text-lg">${c.value}</p>
            <p class="text-[11px] text-gray-400 mt-0.5">${c.label}</p>
          </div>
        `,
          )
          .join("")}
      </div>

      <!-- Timeline -->
      <div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm mb-8">
        <h3 class="font-display font-semibold text-navy-900 text-[15px] mb-5">Step Timeline</h3>
        <div class="space-y-0">
          ${state.stepTimestamps
            .map(
              (ts, i) => `
            <div class="timeline-item">
              <div class="timeline-line"></div>
              <div class="timeline-dot ${statusColors[ts.status]} text-white">
                <i class="fa-solid ${statusIcons[ts.status]} text-[9px]"></i>
              </div>
              <div class="flex-1 pb-5">
                <div class="flex items-center justify-between">
                  <p class="text-[13px] font-medium text-navy-900">${ts.name}</p>
                  <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${ts.status === "completed" ? "bg-green-50 text-green-700" : ts.status === "skipped" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}">${statusLabels[ts.status]}</span>
                </div>
                <div class="flex items-center gap-3 mt-1">
                  <span class="text-[11px] text-gray-400"><i class="fa-regular fa-clock mr-1"></i>${formatTime(ts.startTime)} — ${formatTime(ts.endTime)}</span>
                  <span class="text-[11px] text-gray-300">|</span>
                  <span class="text-[11px] text-gray-400">${formatTime(ts.endTime - ts.startTime)} duration</span>
                </div>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>

        </div>
      </div>
    </div>
  `;

  const fixedButtons = document.getElementById("fixed-buttons");
  fixedButtons.innerHTML = `<div class="flex justify-center gap-3">
    <button onclick="downloadReport()" class="px-6 py-3 bg-pri-500 text-white rounded-xl text-[13px] font-semibold hover:bg-pri-600 transition shadow-sm flex items-center gap-2">
      <i class="fa-solid fa-download text-[11px]"></i>Download Report
    </button>
    <button onclick="navigateTo('dashboard')" class="px-6 py-3 bg-white text-navy-900 border border-gray-200 rounded-xl text-[13px] font-semibold hover:bg-gray-50 transition flex items-center gap-2">
      <i class="fa-solid fa-grid-2 text-[11px]"></i>Return to Dashboard
    </button>
  </div>`;
}
