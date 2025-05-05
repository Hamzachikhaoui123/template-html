document.addEventListener("DOMContentLoaded", function() {
    const openPopupBtn = document.getElementById("openPopupBtn");
    const closePopupBtn = document.getElementById("closePopupBtn");
    const popup = document.getElementById("popup");
    const registrationForm = document.getElementById("registrationForm");
    const verificationForm = document.getElementById("verificationForm");
    const nextBtn = document.getElementById("nextBtn");

    openPopupBtn.addEventListener("click", function() {
        popup.style.display = "block";
    });

    closePopupBtn.addEventListener("click", function() {
        popup.style.display = "none";
        // Réinitialiser les formulaires lorsque le popup est fermé
        registrationForm.reset();
        verificationForm.reset();
        verificationForm.style.display = "none";
        registrationForm.style.display = "block";
    });

    nextBtn.addEventListener("click", function() {
        registrationForm.style.display = "none";
        verificationForm.style.display = "block";
    });

    verificationForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêcher l'envoi du formulaire
        // Ici, vous pouvez ajouter votre logique de traitement du formulaire de vérification
        alert("Formulaire de vérification soumis avec succès !");
        popup.style.display = "none";
        registrationForm.reset();
        verificationForm.reset();
        verificationForm.style.display = "none";
        registrationForm.style.display = "block";
    });
});
