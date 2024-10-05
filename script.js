// Tableau des personnes, avec leurs noms et leurs images
const persons = [
    {
        name: "Tadej Pogacar",
        images: ["pogi-flou-1.jpg", "pogi-flou-2.jpg",  "pogi-flou-3.jpg", "pogi-nette.jpg"]
    },
    {
        name: "Mathieu Van der Poel",
        images: ["MVDP-flou-1.jpg", "MVDP-flou-2.jpg",  "MVDP-flou-3.jpg", "MVDP-nette.jpg"]
    },
    // Continue pour les autres personnes
];

// Variable pour stocker la personne actuelle
let currentPerson;

// Variable pour stocker l'étape actuelle
let currentStep;

// Variable pour stocker les personnes jouées
let playedPersons = [];

// Variable pour stocker le nombre de réponses justes
let correctAnswers = 0;

// Fonction pour commencer la partie
function startGame() {
    // Supprimer le bouton "Commencer la partie"
    const startButton = document.getElementById("start-btn");
    if (startButton) {
        startButton.remove();
    }

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

// Fonction pour vérifier la réponse
function checkAnswer() {
    // Récupérer la réponse saisie par l'utilisateur
    const userAnswer = document.getElementById("guess-input").value;

    // Vérifier si l'utilisateur a saisi au moins un caractère
    if (userAnswer.trim() === "") {
        alert("Veuillez saisir une réponse !");
        return;
    }
    // Split the current person's name into first name and last name
    const [firstName, lastName] = currentPerson.name.split(' ');

    // Vérifier si la réponse est correcte
    if (userAnswer.toLowerCase() === currentPerson.name.toLowerCase() ||
        userAnswer.toLowerCase() === firstName.toLowerCase() ||
        userAnswer.toLowerCase() === lastName.toLowerCase()) {
        // Afficher la réponse correcte
        let result = document.getElementById("result");
        if (!result) {
          result = document.createElement("p");
          result.id = "result";
          const gameContainer = document.getElementById("game-container");
          gameContainer.appendChild(result);
        }
        result.innerText = "Bravo ! C'était bien " + currentPerson.name;

        // Afficher la photo nette
        const personPhoto = document.getElementById("person-photo");
        personPhoto.src = currentPerson.images[currentPerson.images.length - 1];

        // Incrémentation du nombre de réponses justes
        correctAnswers++;
        // enlever le bouton  "Valider"
        const submitButton = document.getElementById("submit-btn");
        submitButton.style.display = "none";

        // Afficher le bouton "Suivant"
        const nextButton = document.getElementById("next-btn");
        nextButton.style.display = "block";
    } else {
        // Incrémentation de l'étape actuelle
        currentStep++;

        // Vérifier si l'étape actuelle est inférieure à la longueur du tableau d'images
        if (currentStep < currentPerson.images.length) {
            // Afficher l'image correspondante à l'étape actuelle
            const personPhoto = document.getElementById("person-photo");
            personPhoto.src = currentPerson.images[currentStep];

            // Supprimer le texte que l'utilisateur avait mis
            const guessInput = document.getElementById("guess-input");
            guessInput.value = "";
        } else {
            // Afficher le résultat si toutes les images ont été affichées
            let result = document.getElementById("result");
            if (!result) {
            result = document.createElement("p");
            result.id = "result";
            const gameContainer = document.getElementById("game-container");
            gameContainer.appendChild(result);
            }
            result.innerText = "Tu as perdu. La personne était " + currentPerson.name;

            // enlever le bouton "validé"
            const submitButton = document.getElementById("submit-btn");
            submitButton.style.display = "none";

            // Afficher le bouton "Suivant"
            const nextButton = document.getElementById("next-btn");
            nextButton.style.display = "block";
        }
        }
}

function replayGame() {
  // Réinitialisez l'état du jeu
  playedPersons = [];
  correctAnswers = 0;
  currentPerson = null;
  currentStep = 0;

  // Supprimez le bouton "Replay" et la phrase du score
  const replayButton = document.getElementById("replay-btn");
  if (replayButton) {
    replayButton.remove();
  }
  const result = document.getElementById("result");
  if (result) {
    result.remove();
  }

  // Supprimez le texte saisi dans l'élément guess-input
  const guessInput = document.getElementById("guess-input");
  guessInput.value = "";

  // Démarrez une nouvelle partie
  startGame();
}

// Fonction pour passer à la prochaine personne
function nextPerson() {
    // Ajouter la personne actuelle à la liste des personnes jouées
    playedPersons.push(currentPerson.name);

    // Vérifier si toutes les personnes ont été jouées
    if (playedPersons.length === persons.length) {
        // Afficher le résultat final
        const result = document.getElementById("result");
        result.innerText = "Tu as terminé la partie ! Tu as obtenu " + correctAnswers + " réponses justes sur " + persons.length;

        //afficher le bouton rejouer
        

        // Cacher le bouton "Suivant"
        const nextButton = document.getElementById("next-btn");
        nextButton.style.display = "none";

        // Cacher le champ de saisie pour la réponse
        const guessInput = document.getElementById("guess-input");
        guessInput.style.display = "none";

        // Cacher le bouton "Valider"
        const submitButton = document.getElementById("submit-btn");
        submitButton.style.display = "none";

        // Créer le bouton "Rejouer"
        const replayButton = document.createElement("button");
        replayButton.textContent = "Rejouer";
        replayButton.onclick = replayGame;
        replayButton.id = "replay-btn"; // Ajout de l'id "replay-btn"

        // Ajouter le bouton "Rejouer" à l'élément #game-container
        const gameContainer = document.getElementById("game-container");
        gameContainer.appendChild(result);
        gameContainer.appendChild(replayButton);
    } else {
        // Supprimer le texte de résultat
        const result = document.getElementById("result");
        result.innerText = "";

        // Afficher le bouton  "Validé"
        const submitButton = document.getElementById("submit-btn");
        submitButton.style.display = "block";


        // Sélectionner une nouvelle personne aléatoire
        currentPerson = persons[Math.floor(Math.random() * persons.length)];

        // Vérifier si la personne a déjà été jouée
        while (playedPersons.includes(currentPerson.name)) {
            currentPerson = persons[Math.floor(Math.random() * persons.length)];
        }

        // Réinitialiser l'étape actuelle
        currentStep = 0;

        // Afficher la première image floue de la nouvelle personne
        const personPhoto = document.getElementById("person-photo");
        personPhoto.src = currentPerson.images[0];

        // Cacher le bouton "Suivant"
        const nextButton = document.getElementById("next-btn");
        nextButton.style.display = "none";

        // Réinitialiser le champ de saisie
        const guessInput = document.getElementById("guess-input");
        guessInput.value = "";
    }
}
