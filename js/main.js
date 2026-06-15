// Filtro por categoria
const tags = document.querySelectorAll('.tag');
const cards = document.querySelectorAll('[data-cat]');

tags.forEach(tag => {
  tag.addEventListener('click', (e) => {
    e.preventDefault();
    tags.forEach(t => t.classList.remove('active'));
    tag.classList.add('active');

    const cat = tag.dataset.cat;
    cards.forEach(card => {
      if (cat === 'todos' || card.dataset.cat === cat) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Formulários newsletter — feedback visual
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => {
    const btn = form.querySelector('button');
    btn.textContent = 'Enviando...';
    btn.disabled = true;
  });
});
