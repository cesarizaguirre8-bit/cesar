const modules = [
  "Plano mental de la riqueza",
  "Fluir para ganar en el trading",
  "Integración al trading",
];

const modulesContainer = document.getElementById("modulesContainer");
const loginModal = document.getElementById("loginModal");
const openLogin = document.getElementById("openLogin");
const loginForm = document.getElementById("loginForm");
const loginStatus = document.getElementById("loginStatus");

function renderModules() {
  modules.forEach((moduleName, moduleIndex) => {
    const moduleCard = document.createElement("article");
    moduleCard.className = "module-card";

    const title = document.createElement("h3");
    title.textContent = `Módulo ${moduleIndex + 1}: ${moduleName}`;
    moduleCard.appendChild(title);

    const lessons = document.createElement("div");
    lessons.className = "lessons";

    for (let i = 1; i <= 10; i += 1) {
      const lesson = document.createElement("div");
      lesson.className = "lesson";
      lesson.innerHTML = `
        <h4>Lección ${i}</h4>
        <div class="actions">
          <button class="action video" type="button">Ver vídeo ${i}</button>
          <button class="action meditation" type="button">Meditación ${i}</button>
        </div>
      `;
      lessons.appendChild(lesson);
    }

    moduleCard.appendChild(lessons);
    modulesContainer.appendChild(moduleCard);
  });
}

openLogin.addEventListener("click", () => loginModal.showModal());

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(loginForm);
  const email = data.get("email");
  loginStatus.textContent = `¡Bienvenido/a, ${email}! Tu acceso al curso está listo.`;

  setTimeout(() => loginModal.close(), 700);
});

renderModules();
