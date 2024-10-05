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
    startButton.remove();

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

    // Vérifier si la réponse est correcte
    if (userAnswer.toLowerCase() === currentPerson.name.toLowerCase()) {
        // Afficher la réponse correcte
        const result = document.getElementById("result");
        result.innerText = "Bravo ! C'était bien " + currentPerson.name;

        // Incrémentation du nombre de réponses justes
        correctAnswers++;

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
        } else {
            // Afficher le résultat si toutes les images ont été affichées
            const result = document.getElementById("result");
            result.innerText = "Tu as perdu. La personne était " + currentPerson.name;

            // Afficher le bouton "Suivant"
            const nextButton = document.getElementById("next-btn");
            nextButton.style.display = "block";
        }
    }
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

        // Ajouter le bouton "Rejouer" à l'élément #game-container
        const gameContainer = document.getElementById("game-container");
        gameContainer.innerHTML = "";
        gameContainer.appendChild(result);
        gameContainer.appendChild(replayButton);
    } else {
        // Supprimer le texte de résultat
        const result = document.getElementById("result");
        result.innerText = "";

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