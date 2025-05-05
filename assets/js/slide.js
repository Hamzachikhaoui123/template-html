const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');
const tabContainer = document.querySelector('.tab-container');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

let currentPosition = 0; // Position actuelle pour les onglets
let activeContent = 0; // Index de contenu actif

// Gestion du défilement des onglets
leftButton.addEventListener('click', () => {
  if (currentPosition > 0) {
    currentPosition--;
    tabContainer.style.transform = `translateX(-${currentPosition * 150}px)`; // Ajuste 150px selon la taille des onglets
  }
});

rightButton.addEventListener('click', () => {
  if (currentPosition < tabs.length - 1) {
    currentPosition++;
    tabContainer.style.transform = `translateX(-${currentPosition * 150}px)`;
  }
});

// Gestion de l'affichage du contenu avec effet de sliding
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Mise à jour des onglets actifs
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Slide pour le contenu des onglets
    tabContents[activeContent].classList.remove('active');
    if (index > activeContent) {
      tabContents[activeContent].classList.add('slide-left');
    } else {
      tabContents[activeContent].classList.add('slide-right');
    }

    // Rendre actif le contenu cliqué
    activeContent = index;
    tabContents[activeContent].classList.remove('slide-left', 'slide-right');
    tabContents[activeContent].classList.add('active');
  });
});
