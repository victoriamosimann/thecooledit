// AURA Daily — main.js

// ── Filtro de categorias ──────────────────────────────
const tags = document.querySelectorAll('.tag');
const cards = document.querySelectorAll('[data-cat]');

tags.forEach(tag => {
  tag.addEventListener('click', e => {
    e.preventDefault();
    const cat = tag.dataset.cat;
    tags.forEach(t => t.classList.remove('active'));
    tag.classList.add('active');
    cards.forEach(card => {
      if (cat === 'todos' || card.dataset.cat === cat) {
        card.classList.remove('card--hidden');
      } else {
        card.classList.add('card--hidden');
      }
    });
  });
});

// ── Newsletter via Vercel Function ────────────────────
async function inscreverBrevo(email, btn, input) {
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (data.success) {
      btn.textContent = '✓ Inscrita!';
      btn.style.background = '#4a7c59';
      input.value = '';
    } else {
      throw new Error('Erro');
    }
  } catch (err) {
    btn.textContent = 'Tente novamente';
    btn.disabled = false;
    console.error(err);
  }
}

document.querySelectorAll('.hero-form, .newsletter-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const btn = form.querySelector('button');
    const email = input.value.trim();
    if (!email) return;
    inscreverBrevo(email, btn, input);
  });
});
