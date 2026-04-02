/* ========== NAVIGATION ========== */
function navigateTo(pageId, data) {
  // Update sidebar active state
  document.querySelectorAll(".sidebar-nav-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  const activeBtn = document.querySelector(
    `.sidebar-nav-btn[data-page="${pageId}"]`,
  );
  if (activeBtn) {
    activeBtn.classList.add("active");
  }

  const cur = document.querySelector(".page.active");
  if (cur) {
    cur.classList.remove("active");
  }
  state.currentPage = pageId;
  const next = document.getElementById("page-" + pageId);
  next.classList.add("active");
  next.scrollTop = 0;

  // Show/hide navbar during surgery
  const nav = document.getElementById("navbar");
  if (pageId === "surgery") {
    nav.classList.add("hidden-nav");
  } else {
    nav.classList.remove("hidden-nav");
  }

  // Render page content
  const fixedButtons = document.getElementById("fixed-buttons");
  fixedButtons.innerHTML = "";
  if (pageId === "dashboard") renderDashboard();
  else if (pageId === "surgeries") renderSurgeries();
  else if (pageId === "patients") renderPatients();
  else if (pageId === "analytics") renderAnalytics();
  else if (pageId === "reports") renderReports();
  else if (pageId === "settings") renderSettings();
  else if (pageId === "details") renderDetails(data);
  else if (pageId === "generation") renderGeneration(data);
  else if (pageId === "surgery") renderSurgeryPage(data);
  else if (pageId === "report") renderReport();

  // Handle fixed buttons
  fixedButtons.className = "fixed-bottom-actions";
  if (pageId === "details") {
    fixedButtons.classList.add("content-max-w-6xl");
    fixedButtons.classList.remove("hidden");
  } else if (pageId === "generation") {
    fixedButtons.classList.add("content-max-w-2xl");
    fixedButtons.classList.remove("hidden");
  } else if (pageId === "report") {
    fixedButtons.classList.add("content-max-w-4xl");
    fixedButtons.classList.remove("hidden");
  } else {
    fixedButtons.classList.add("hidden");
  }
}

/* ========== SIDEBAR ========== */
function renderSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = `
    <div class="sidebar-header">
      <div class="logo">
        <i class="fa-solid fa-shield-halved text-pri-400 text-lg"></i>
        <span class="font-display font-bold text-navy-900">MerakiAI</span>
      </div>
      <p class="text-xs text-gray-400 mt-1">Surgical Intelligence</p>
    </div>
    <nav class="sidebar-nav">
      <button class="sidebar-nav-btn active" data-page="dashboard" onclick="navigateTo('dashboard')">
        <i class="fa-solid fa-house text-sm"></i>
        <span>Dashboard</span>
      </button>
      <button class="sidebar-nav-btn" data-page="surgeries" onclick="navigateTo('surgeries')">
        <i class="fa-solid fa-calendar-days text-sm"></i>
        <span>All Surgeries</span>
      </button>
      <button class="sidebar-nav-btn" data-page="patients" onclick="navigateTo('patients')">
        <i class="fa-solid fa-users text-sm"></i>
        <span>Patients</span>
      </button>
      <button class="sidebar-nav-btn" data-page="analytics" onclick="navigateTo('analytics')">
        <i class="fa-solid fa-chart-bar text-sm"></i>
        <span>Analytics</span>
      </button>
      <button class="sidebar-nav-btn" data-page="reports" onclick="navigateTo('reports')">
        <i class="fa-solid fa-file-medical text-sm"></i>
        <span>Reports</span>
      </button>
      <button class="sidebar-nav-btn" data-page="settings" onclick="navigateTo('settings')">
        <i class="fa-solid fa-cog text-sm"></i>
        <span>Settings</span>
      </button>
    </nav>
    <div class="sidebar-footer">
      <div class="user-info">
        <div class="w-8 h-8 rounded-full bg-pri-100 flex items-center justify-center">
          <i class="fa-solid fa-user-doctor text-pri-600 text-xs"></i>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-navy-900 truncate">Dr. Ashok Seth</p>
          <p class="text-xs text-gray-400">Lead Surgeon</p>
        </div>
      </div>
    </div>
  `;
}
