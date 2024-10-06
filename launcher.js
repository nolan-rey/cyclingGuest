// launcher.js
function startGame() {
    // Code pour démarrer le jeu
    window.location.href = '/jeux.html';
    // Sélectionner une personne aléatoire
    currentPerson = persons[Math.floor(Math.random() * persons.length)];

    // Vérifier si la personne a déjà été jouée
    while (playedPersons.includes(currentPerson.name)) {
        currentPerson = persons[Math.floor(Math.random() * persons.length)];
    }

    // Initialiser l'étape actuelle
    currentStep = 0;

    // Afficher la première image floue de la personne
    const personPhoto = document.getElementById("person-photo");
    personPhoto.src = currentPerson.images[0];

    // Afficher le champ de saisie pour la réponse
    const guessInput = document.getElementById("guess-input");
    guessInput.style.display = "block";

    // Afficher le bouton "Valider"
    const submitButton = document.getElementById("submit-btn");
    submitButton.style.display = "block";
  }