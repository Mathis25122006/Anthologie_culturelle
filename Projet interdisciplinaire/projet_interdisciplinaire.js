window.addEventListener("DOMContentLoaded", () => {
  // Carrousel
  document.querySelectorAll('.carousel-container').forEach(container => {
    const slides = container.querySelectorAll('.carousel-slide');
    const nextBtn = container.querySelector('.next');
    const prevBtn = container.querySelector('.prev');
    let current = 0;
    let timer;
  
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      current = index;
    }
  
    function nextSlide() {
      const next = (current + 1) % slides.length;
      showSlide(next);
    }
  
    function prevSlide() {
      const prev = (current - 1 + slides.length) % slides.length;
      showSlide(prev);
    }
  
    function startAutoSlide() {
      timer = setInterval(nextSlide, 5000);
    }
  
    function resetTimer() {
      clearInterval(timer);
      startAutoSlide();
    }
  
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
      });
    }
  
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
      });
    }
  
    if (slides.length > 0) {
      showSlide(0);
      startAutoSlide();
    }
  });

  // Modale - gestion de l'ouverture sur l'image Wajdi (avec onclick dans HTML)
  // Pas besoin d'ajouter d'event ici, car l'image a déjà onclick="openModal()" dans le HTML

  // Ajout gestion fermeture modale au clic sur overlay (fond)
  const modalOverlay = document.getElementById('modal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (event) => {
      // ferme la modale uniquement si clic sur l'overlay, pas sur contenu
      if (event.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Fermeture modale au clic sur bouton close s'il existe (pas dans ton HTML, à ajouter si besoin)
  const closeBtn = document.getElementById('close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Fermeture modale à la touche Echap
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('modal');
      if (modal && modal.style.display === 'flex') {
        closeModal();
      }
    }
  });
});

// Fonction toggleMenu
function toggleMenu() {
  const menu = document.getElementById("diagonalMenu");
  menu.classList.toggle("open");
}

// Fonctions expandSection et resetSections
function expandSection(id) {
  const left = document.getElementById('dedans');
  const right = document.getElementById('dehors');

  if (id === 'dedans') {
    left.classList.add('expand-full');
    right.classList.add('hide');
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = 'dedans.html';
    }, 1000);

  } else if (id === 'dehors') {
    right.classList.add('expand-right');
    left.classList.add('hide');
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = 'dehors.html';
    }, 1000);
  }
}

function resetSections() {
  const left = document.getElementById('dedans');
  const right = document.getElementById('dehors');
  const contentDedans = document.getElementById('content-dedans');
  const contentDehors = document.getElementById('content-dehors');

  left.classList.remove('expand-full', 'hide');
  right.classList.remove('expand-full', 'hide');
  if (contentDedans) contentDedans.classList.add('hidden');
  if (contentDehors) contentDehors.classList.add('hidden');
}

// Fonction modale statique
function openModal(figure) {
  const modal = document.getElementById('modal');

  const title = figure.dataset.title || '';
  const author = figure.dataset.author || '';
  const description = figure.dataset.description || '';
  const img = figure.querySelector('img');

  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-author').textContent = author;
  document.getElementById('modal-description').textContent = description;

  const modalImg = document.getElementById('modal-img');
  modalImg.src = img.src;
  modalImg.alt = img.alt;

  modal.style.display = 'flex'; // ou selon ta méthode d’affichage
}

function closeModal(event) {
  if (event.target.id === 'modal') {
    event.target.style.display = 'none';
  }
}

document.querySelectorAll('.art-sidebar > ul > li > a').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetHref = link.getAttribute('href');

    // Si le lien est une ancre (ex: #petitpalais)
    if (targetHref && targetHref.startsWith('#')) {
      e.preventDefault(); // On empêche le comportement par défaut

      const targetId = targetHref.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }

    // Optionnel : toggle d’un sous-menu si présent
    const li = link.parentElement;
    li.classList.toggle('open');
  });
});