const MODULES = [
  "Plano mental de la riqueza",
  "Fluir para ganar en el trading",
  "Integración al trading",
];

const CLASSES = [
  { date: "2026-04-15", title: "Preparación mental pre-mercado", time: "19:00" },
  { date: "2026-04-17", title: "Fluir para ejecutar sin bloqueo", time: "19:00" },
  { date: "2026-04-20", title: "Integración mindset + estrategia", time: "18:30" },
  { date: "2026-04-22", title: "Q&A de casos reales", time: "19:00" },
];

const state = {
  currentModule: 0,
  user: localStorage.getItem("psicotradingUser"),
  progress: JSON.parse(localStorage.getItem("psicotradingProgress") || "{}"),
};

const dashboard = document.getElementById("dashboard");
const welcomeCard = document.getElementById("welcomeCard");
const moduleTabs = document.getElementById("moduleTabs");
const moduleDetail = document.getElementById("moduleDetail");
const progressLabel = document.getElementById("progressLabel");
const calendarLabel = document.getElementById("calendarLabel");
const calendarGrid = document.getElementById("calendarGrid");
const classList = document.getElementById("classList");

const loginModal = document.getElementById("loginModal");
const openLogin = document.getElementById("openLogin");
const cancelLogin = document.getElementById("cancelLogin");
const logoutButton = document.getElementById("logoutButton");
const loginForm = document.getElementById("loginForm");
const loginStatus = document.getElementById("loginStatus");

function lessonKey(moduleIndex, lessonNumber) {
  return `m${moduleIndex + 1}-l${lessonNumber}`;
}

function markComplete(moduleIndex, lessonNumber) {
  state.progress[lessonKey(moduleIndex, lessonNumber)] = true;
  localStorage.setItem("psicotradingProgress", JSON.stringify(state.progress));
  renderProgress();
  renderModuleDetail();
}

function countCompleted() {
  return Object.values(state.progress).filter(Boolean).length;
}

function renderProgress() {
  progressLabel.textContent = `${countCompleted()} / 30 lecciones completadas`;
}

function renderModuleTabs() {
  moduleTabs.innerHTML = "";
  MODULES.forEach((moduleName, index) => {
    const button = document.createElement("button");
    button.className = `tab ${state.currentModule === index ? "active" : ""}`;
    button.type = "button";
    button.textContent = `Módulo ${index + 1}`;
    button.title = moduleName;
    button.addEventListener("click", () => {
      state.currentModule = index;
      renderModuleTabs();
      renderModuleDetail();
    });
    moduleTabs.appendChild(button);
  });
}

function renderModuleDetail() {
  const moduleName = MODULES[state.currentModule];

  moduleDetail.innerHTML = `
    <h3>Módulo ${state.currentModule + 1}: ${moduleName}</h3>
    <p>10 lecciones prácticas. Cada lección incluye vídeo + meditación guiada.</p>
    <div class="lessons"></div>
  `;

  const lessonsContainer = moduleDetail.querySelector(".lessons");
  for (let i = 1; i <= 10; i += 1) {
    const done = state.progress[lessonKey(state.currentModule, i)] === true;
    const lesson = document.createElement("div");
    lesson.className = `lesson ${done ? "done" : ""}`;
    lesson.innerHTML = `
      <div>
        <h4>Lección ${i}</h4>
        <small>${done ? "Completada" : "Pendiente"}</small>
      </div>
      <div class="actions">
        <button type="button" class="action video">Ver vídeo ${i}</button>
        <button type="button" class="action meditation">Meditación ${i}</button>
        <button type="button" class="action complete">Marcar completada</button>
      </div>
    `;

    lesson.querySelector(".video").addEventListener("click", () => {
      alert(`Reproduciendo vídeo ${i} del ${moduleName}.`);
    });

    lesson.querySelector(".meditation").addEventListener("click", () => {
      alert(`Iniciando meditación ${i} del ${moduleName}.`);
    });

    lesson.querySelector(".complete").addEventListener("click", () => {
      markComplete(state.currentModule, i);
    });

    lessonsContainer.appendChild(lesson);
  }
}

function renderCalendar() {
  const viewDate = new Date("2026-04-01T00:00:00");
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const label = new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(viewDate);

  calendarLabel.textContent = label.charAt(0).toUpperCase() + label.slice(1);

  calendarGrid.innerHTML = "";
  ["L", "M", "X", "J", "V", "S", "D"].forEach((dayName) => {
    const day = document.createElement("div");
    day.className = "day-name";
    day.textContent = dayName;
    calendarGrid.appendChild(day);
  });

  const firstDay = new Date(year, month, 1);
  const offset = (firstDay.getDay() + 6) % 7;
  const totalDays = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < offset; i += 1) {
    const empty = document.createElement("div");
    calendarGrid.appendChild(empty);
  }

  const liveDays = new Set(CLASSES.map((item) => Number(item.date.slice(8, 10))));

  for (let day = 1; day <= totalDays; day += 1) {
    const dayCell = document.createElement("div");
    dayCell.className = `day ${liveDays.has(day) ? "live" : ""}`;
    dayCell.textContent = String(day);
    calendarGrid.appendChild(dayCell);
  }

  classList.innerHTML = "";
  CLASSES.forEach((item) => {
    const li = document.createElement("li");
    const dateText = new Date(`${item.date}T12:00:00`).toLocaleDateString("es-ES", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
    });
    li.textContent = `${dateText} · ${item.time} · ${item.title}`;
    classList.appendChild(li);
  });
}

function openDashboard() {
  welcomeCard.classList.add("hidden");
  dashboard.classList.remove("hidden");
  logoutButton.classList.remove("hidden");
  openLogin.classList.add("hidden");
  renderCalendar();
  renderModuleTabs();
  renderModuleDetail();
  renderProgress();
}

function closeDashboard() {
  welcomeCard.classList.remove("hidden");
  dashboard.classList.add("hidden");
  logoutButton.classList.add("hidden");
  openLogin.classList.remove("hidden");
}

openLogin.addEventListener("click", () => {
  loginStatus.textContent = "";
  loginModal.showModal();
});

cancelLogin.addEventListener("click", () => loginModal.close());

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(loginForm);
  const email = String(data.get("email") || "").trim();
  state.user = email;
  localStorage.setItem("psicotradingUser", email);
  loginStatus.textContent = `¡Bienvenido/a, ${email}!`;
  setTimeout(() => {
    loginModal.close();
    openDashboard();
  }, 350);
});

logoutButton.addEventListener("click", () => {
  state.user = null;
  localStorage.removeItem("psicotradingUser");
  closeDashboard();
});

if (state.user) {
  openDashboard();
}
