window.onload = function() {
    startGame();  // Le jeu commence automatiquement
};

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
    {
        name: "Wout van art",
        images: ["VA-flou-1.jpg", "VA-flou-2.jpg",  "VA-flou-3.jpg", "VA-nette.jpg"]
    },
    {
        name: "Tom Pidcock",
        images: ["pidcock-flou-1.jpg", "pidcock-flou-2.jpg",  "pidcock-flou-3.jpg", "pidcock-nette.jpg"]
    },
    {
        name: "Jasper Philipsen",
        images: ["philipsen-flou-1.jpg", "philipsen-flou-2.jpg",  "philipsen-flou-3.jpg", "philipsen-nette.jpg"]
    },
    {
        name: "Julian Alaphilipe",
        images: ["julian-flou-1.jpg", "julian-flou-2.jpg",  "julian-flou-3.jpg", "julian-nette.jpg"]
    },
    {
        name: "Primoz Roglic",
        images: ["roglic-flou-1.jpg", "roglic-flou-2.jpg",  "roglic-flou-3.jpg", "roglic-nette.jpg"]
    },
    {
        name: "Remco Evenepoel",
        images: ["remco-flou-1.jpg", "remco-flou-2.jpg",  "remco-flou-3.jpg", "remco-nette.jpg"]
    },
    {
        name: "Mads Pedersen",
        images: ["pedersen-flou-1.jpg", "pedersen-flou-2.jpg",  "pedersen-flou-3.jpg", "pedersen-nette.jpg"]
    },
    {
        name: "Jonas Vingegaard",
        images: ["jonas-flou-1.jpg", "jonas-flou-2.jpg",  "jonas-flou-3.jpg", "jonas-nette.jpg"]
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

// Variable pour stocker le score actuel
let currentScore = 0;

// Fonction pour commencer la partie
function startGame() {
    // Supprimer le bouton "Commencer la partie"
    const startButton = document.getElementById("start-btn");
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
    if (userAnswer.toLowerCase() === currentPerson.name.toLowerCase()) {
        // 10 points pour le nom et le prénom
        currentScore += 10;
        let result = document.getElementById("result");
        if (!result) {
          result = document.createElement("p");
          result.id = "result";
          const gameContainer = document.getElementById("game-container");
          gameContainer.appendChild(result);
        }
        result.innerText = "Bravo ! C'était bien " + currentPerson.name + " (+10 points)";
    } else if (userAnswer.toLowerCase() === firstName.toLowerCase()) {
        // 2 points pour le prénom
        currentScore += 2;
        let result = document.getElementById("result");
        if (!result) {
          result = document.createElement("p");
          result.id = "result";
          const gameContainer = document.getElementById("game-container");
          gameContainer.appendChild(result);
        }
        result.innerText = "Bravo ! C'était bien " + currentPerson.name + " (+2 points)";
    } else if (userAnswer.toLowerCase() === lastName.toLowerCase()) {
        // 1 point pour le nom
        currentScore += 1;
        let result = document.getElementById("result");
        if (!result) {
          result = document.createElement("p");
          result.id = "result";
          const gameContainer = document.getElementById("game-container");
          gameContainer.appendChild(result);
        }
        result.innerText = "Bravo ! C'était bien " + currentPerson.name + " (+1 point)";
    } else {
        // ...
    }

    // Afficher la photo nette et incrémenter le nombre de réponses justes si la réponse est correcte
    if (userAnswer.toLowerCase() === currentPerson.name.toLowerCase() || userAnswer.toLowerCase() === firstName.toLowerCase() || userAnswer.toLowerCase() === lastName.toLowerCase()) {
        const personPhoto = document.getElementById("person-photo");
        personPhoto.src = currentPerson.images[currentPerson.images.length - 1];

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
    currentScore = 0;
  
    // Supprimez le bouton "Replay" et la phrase du score
    const replayButton = document.getElementById("replay-btn");
    if (replayButton) {
      replayButton.remove();
    }
    const result = document.getElementById("result");
    if (result) {
      result.remove();
    }

    //supprimer le champs de saisis
    const guessInput = document.getElementById("guess-input");
    guessInput.value = "";
  
    // Démarrez une nouvelle partie
    startGame();
  }

// Fonction pour passer à la prochaine personne
// Fonction pour passer à la prochaine personne
function nextPerson() {
    // Ajouter la personne actuelle à la liste des personnes jouées
    playedPersons.push(currentPerson.name);

    // Vérifier si toutes les personnes ont été jouées
    if (playedPersons.length === persons.length) {
        // Afficher le résultat final
        const result = document.getElementById("result");
        result.innerHTML = "Tu as terminé la partie ! Tu as obtenu " + correctAnswers + " réponses justes sur " + persons.length + "<br>Ton score et de : " + currentScore + "/100";

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