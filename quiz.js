// LUMIÈRE — fictional skincare ritual recommendation demo
(() => {
  const root = document.getElementById('lumiere-quiz');
  if (!root) return;
  const question = root.querySelector('[data-quiz-question]');
  const choices = root.querySelector('[data-quiz-choices]');
  const next = root.querySelector('[data-quiz-next]');
  const back = root.querySelector('[data-quiz-back]');
  const progress = root.querySelector('[data-quiz-progress]');
  const fill = root.querySelector('[data-quiz-fill]');
  const stage = root.querySelector('[data-quiz-stage]');
  const result = root.querySelector('[data-quiz-result]');
  const restart = root.querySelector('[data-quiz-restart]');
  const resultTitle = root.querySelector('[data-quiz-result-title]');
  const resultText = root.querySelector('[data-quiz-result-text]');
  const steps = [
    { title: 'What would you love more of?', options: ['A luminous glow', 'A comforting feel', 'A fresh, simple reset'] },
    { title: 'Which texture sounds most inviting?', options: ['A lightweight serum', 'A soft, rich cream', 'A refreshing cleanser'] },
    { title: 'When is your favorite moment to unwind?', options: ['A bright morning', 'A peaceful evening', 'Whenever I need a pause'] }
  ];
  const products = [
    { name: 'Éclat Radiance Serum', description: 'Your ritual starts with a little radiance. Explore Éclat as the glow-focused step in your fictional LUMIÈRE routine.' },
    { name: 'Nuage Cloud Cream', description: 'A moment of softness. Explore Nuage as the comforting finishing step in your fictional LUMIÈRE routine.' },
    { name: 'Calme Gentle Cleanser', description: 'Begin with a gentle reset. Explore Calme as the cleansing step in your fictional LUMIÈRE routine.' }
  ];
  let index = 0;
  const answers = [null, null, null];
  function render() {
    stage.hidden = false;
    result.hidden = true;
    question.textContent = steps[index].title;
    progress.textContent = `Question ${index + 1} of ${steps.length}`;
    fill.style.width = `${(index + 1) / steps.length * 100}%`;
    choices.replaceChildren();
    steps[index].options.forEach((label, choiceIndex) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'ritual-quiz__choice';
      button.textContent = label;
      button.setAttribute('aria-pressed', String(answers[index] === choiceIndex));
      button.addEventListener('click', () => {
        answers[index] = choiceIndex;
        choices.querySelectorAll('button').forEach((item, i) => item.setAttribute('aria-pressed', String(i === choiceIndex)));
        next.disabled = false;
      });
      choices.append(button);
    });
    next.disabled = answers[index] === null;
    next.textContent = index === steps.length - 1 ? 'Reveal my ritual →' : 'Continue →';
    back.hidden = index === 0;
  }
  next.addEventListener('click', () => {
    if (answers[index] === null) return;
    if (index < steps.length - 1) { index++; render(); question.focus(); return; }
    // Goal and texture preferences determine the demo recommendation.
    const scores = [0, 0, 0];
    scores[answers[0]] += 2;
    scores[answers[1]] += 1;
    const highest = scores.indexOf(Math.max(...scores));
    resultTitle.textContent = products[highest].name;
    resultText.textContent = products[highest].description;
    stage.hidden = true;
    result.hidden = false;
    resultTitle.focus();
  });
  back.addEventListener('click', () => { if (index > 0) { index--; render(); question.focus(); } });
  restart.addEventListener('click', () => { index = 0; answers.fill(null); render(); question.focus(); });
  render();
})();
