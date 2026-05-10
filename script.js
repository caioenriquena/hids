const quizAnswers = {
  zero: {
    label: "Possível ataque de dia zero",
    text:
      "Pode ser uma ameaça nova. A defesa observa o comportamento, soma sinais suspeitos e procura mudanças consistentes antes de disparar o alerta.",
  },
  ransom: {
    label: "Possível ransomware",
    text:
      "Quando muitos arquivos ficam ilegíveis rapidamente, o host deixa rastros diferentes. Um HIDS pode usar essa mudança de comportamento como sinal de risco.",
  },
  auc: {
    label: "Ótimo desempenho do Transformer",
    text:
      "AUC 0,990 indica uma curva muito próxima do comportamento ideal: alta detecção com baixa taxa de falso alarme.",
  },
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

const revealElements = document.querySelectorAll(".reveal");

function showVisibleReveals() {
  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const isOnScreen = rect.top < window.innerHeight && rect.bottom > 0;

    if (isOnScreen) {
      element.classList.add("visible");
      revealObserver.unobserve(element);
    }
  });
}

revealElements.forEach((element) => revealObserver.observe(element));
showVisibleReveals();
window.addEventListener("load", showVisibleReveals);
window.addEventListener("hashchange", showVisibleReveals);

const result = document.querySelector(".quiz-result");
const options = document.querySelectorAll(".quiz-option");

options.forEach((button) => {
  button.addEventListener("click", () => {
    const answer = quizAnswers[button.dataset.answer];

    options.forEach((option) => {
      option.classList.remove("active");
      option.setAttribute("aria-selected", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-selected", "true");

    result.innerHTML = `
      <span class="result-label">${answer.label}</span>
      <p>${answer.text}</p>
    `;
  });
});

document.querySelectorAll("[data-replay]").forEach((button) => {
  button.addEventListener("click", () => {
    const stage = document.querySelector(`[data-animation="${button.dataset.replay}"]`);

    if (!stage) return;

    stage.classList.add("replay");
    stage.classList.remove("play");

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        stage.classList.add("play");
        window.setTimeout(() => {
          stage.classList.remove("replay", "play");
        }, 80);
      });
    });
  });
});
