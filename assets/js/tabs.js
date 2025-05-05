// Sélectionner tous les onglets et contenus
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

// Fonction pour activer un onglet et son contenu
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // Retirer la classe 'active' de tous les onglets et contenus
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

    // Activer l'onglet cliqué
    tab.classList.add("active");
    
    // Trouver et activer le contenu correspondant
    const content = document.querySelector(`.tab-content[data-content="${tab.getAttribute("data-tab")}"]`);
    content.classList.add("active");
  });
});
