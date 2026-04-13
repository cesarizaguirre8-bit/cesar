const modules = [
  {
    title: "Módulo 1 · Plano mental de la riqueza",
    description:
      "Reprograma creencias limitantes y desarrolla hábitos mentales de abundancia para operar con confianza.",
    progress: 35,
    className: "one",
  },
  {
    title: "Módulo 2 · Fluir para ganar en el trading",
    description:
      "Domina tu estado emocional antes, durante y después de operar para entrar en flow y ejecutar sin sabotaje.",
    progress: 10,
    className: "two",
  },
  {
    title: "Módulo 3 · Integración al trading",
    description:
      "Integra todo el sistema: rutina, psicología y estrategia para sostener resultados consistentes.",
    progress: 0,
    className: "three",
  },
];

const moduleGrid = document.getElementById("moduleGrid");

modules.forEach((module) => {
  const card = document.createElement("article");
  card.className = "program-card";
  card.innerHTML = `
    <div class="module-cover ${module.className}">${module.title.split("·")[0].trim()}</div>
    <div class="program-body">
      <h3>${module.title}</h3>
      <div class="progress"><span style="width:${module.progress}%"></span></div>
      <p>${module.description}</p>
      <div class="tag-list">
        <span class="tag video">10 vídeos</span>
        <span class="tag meditation">10 meditaciones</span>
      </div>
      <button>Ver programa</button>
    </div>
  `;

  moduleGrid.appendChild(card);
});
