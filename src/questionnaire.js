window.onload = () => {
    afficherQuestion(0); // Charge les questions
    const bruteforceBtn = document.getElementById("bruteforce-btn");
    
    if (bruteforceBtn) {
        bruteforceBtn.addEventListener("click", bruteforce);
    } else {
        console.error("Le bouton bruteforce-btn n'existe pas !");
    }
};

const originalConsoleError = console.error;
console.error = function (message) {
    if (!message.includes("ERR_ABORTED") && !message.includes("404")) {
        originalConsoleError.apply(console, arguments);
    }
};


const questionnaire = [
    {
        qlabel: "En quelle année Frances Tiafoe a-t-il remporté son premier titre ATP ?",
        qid: 1,
        reponses: [
            { rlabel: "2016", rid: 1 },
            { rlabel: "2018", rid: 2 },
            { rlabel: "2020", rid: 3 },
            { rlabel: "2022", rid: 4 }
        ]
    },
    {
        qlabel: "Quelle est la nationalité de Frances Tiafoe ?",
        qid: 2,
        reponses: [
            { rlabel: "Britannique", rid: 1 },
            { rlabel: "Américaine", rid: 2 },
            { rlabel: "Canadienne", rid: 3 },
            { rlabel: "Australienne", rid: 4 }
        ]
    },
    {
        qlabel: "D'où viennent les parents de Frances Tiafoe ?",
        qid: 3,
        reponses: [
            { rlabel: "Nigéria", rid: 1 },
            { rlabel: "Sierra Leone", rid: 2 },
            { rlabel: "Ghana", rid: 3 },
            { rlabel: "Côte d'Ivoire", rid: 4 }
        ]
    },
    {
        qlabel: "Quel est le meilleur résultat de Frances Tiafoe à l'US Open ?",
        qid: 4,
        reponses: [
            { rlabel: "Demi-finale", rid: 1 },
            { rlabel: "Quart de finale", rid: 2 },
            { rlabel: "Finale", rid: 3 },
            { rlabel: "Huitième de finale", rid: 4 }
        ]
    }
];

const bonnesReponses = "A1_2-A2_2-A3_2-A4_1";
let reponses = "";
let questionIndex = 0;

function afficherQuestion(index) {
    const question = questionnaire[index];
    const questionElement = document.getElementById("question");
    const reponseElement = document.getElementById("reponses");
    const resultElement = document.getElementById("result");

    questionElement.innerHTML = question.qlabel;
    reponseElement.innerHTML = "";
    resultElement.innerHTML = "";

    question.reponses.forEach((reponse) => {
        const button = document.createElement("button");
        button.textContent = reponse.rlabel;
        button.className = "btn btn-primary";
        button.onclick = () => handleReponseClick(question.qid, reponse.rid);
        reponseElement.appendChild(button);
    });
}

function handleReponseClick(qid, rid) {
    reponses += (reponses ? "-" : "") + `A${qid}_${rid}`;
    questionIndex++;

    if (questionIndex < questionnaire.length) {
        afficherQuestion(questionIndex);
    } else {
        verifierReponses();
    }
}

function verifierReponses() {
    const resultElement = document.getElementById("result");
    const questionElement = document.getElementById("question");
    const reponseElement = document.getElementById("reponses");

    if (reponses === bonnesReponses) {
        location.href = reponses + ".html";
    } else {
        resultElement.innerHTML = `<p class="text-red-600 font-bold text-center">Tu n'as pas les bonnes réponses pour me contacter.</p>`;
        questionElement.innerHTML = "";
        const bruteforceBtn = document.getElementById("bruteforce-btn");
        bruteforceBtn.classList.add("hidden");
        reponseElement.innerHTML = "";

        const retryButton = document.createElement("button");
        retryButton.textContent = "Recommencer";
        retryButton.className = "cursor-pointer rounded-md mt-6 bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2";
        retryButton.onclick = recommencer;
        resultElement.appendChild(retryButton);
    }
}

function recommencer() {
    const bruteforceBtn = document.getElementById("bruteforce-btn");
    bruteforceBtn.classList.remove("hidden");
    reponses = "";
    questionIndex = 0;
    afficherQuestion(0);
}
document.getElementById('bruteforce-btn').addEventListener('click', bruteforce);

function bruteforce() {
    const maxValues = [4, 4, 4, 4];
    const resultDiv = document.getElementById("result");
    const divquest = document.getElementById("divquest");
    const spinner = document.getElementById("spinner");
    const questionDiv = document.getElementById("question");
    const reponsesDiv = document.getElementById("reponses");
    const bruteforceBtn = document.getElementById("bruteforce-btn");
    const countdownDiv = document.getElementById("countdown"); // Le div pour le compte à rebours

    // Réinitialiser les réponses et cacher le bouton bruteforce
    if (reponsesDiv) reponsesDiv.innerHTML = "";
    if (bruteforceBtn) bruteforceBtn.classList.add("hidden");

    // Changer la question en "Bruteforce en cours"
    if (questionDiv) {
        questionDiv.textContent = "Bruteforce en cours..."; // Change le texte de la question
    }

    // Retirer la classe 'hidden' pour afficher le spinner
    spinner.classList.remove("hidden");
    divquest.classList.add("items-center");
    
    // Initialisation du compte à rebours
    let countdown = 5; // 5 secondes pour la redirection
    

    let delay = 0;
    let found = false;
    let total = 0;

    for (let i1 = 1; i1 <= maxValues[0]; i1++) {
        for (let i2 = 1; i2 <= maxValues[1]; i2++) {
            for (let i3 = 1; i3 <= maxValues[2]; i3++) {
                for (let i4 = 1; i4 <= maxValues[3]; i4++) {
                    const fileName = `A1_${i1}-A2_${i2}-A3_${i3}-A4_${i4}.html`;
                    const combination = `${fileName}`;

                    setTimeout(() => {
                        if (found) return;

                        total++;

                        if (verifierFichierExiste(fileName)) {
                            found = true;
                            resultDiv.innerHTML = `
                                ✅ Trouvé !<br>
                                ${combination}<br>
                                🔍 ${total} tests effectués
                            `;
                            spinner.classList.add("hidden");
                            questionDiv.textContent = "Bruteforce réussi !";
                            countdownDiv.textContent = `Redirection dans ${countdown}s...`;
                            // Démarrer le compte à rebours pour la redirection
                            const countdownInterval = setInterval(() => {
                                countdown--;
                                countdownDiv.textContent = `Redirection dans ${countdown}s...`;

                                if (countdown <= 0) {
                                    clearInterval(countdownInterval);
                                    window.location.href = fileName; // Redirection
                                }
                            }, 1000); // Le compte à rebours est mis à jour toutes les secondes

                        } else {
                            resultDiv.innerHTML = `
                                ❌ A1_${i1}-A2_${i2}-A3_${i3}-A4_${i4} - Test n°${total}
                            `;
                        }
                    }, delay);

                    delay += 50;
                }
            }
        }
    }
}




// Vérifie l'existence d'un fichier via requête HEAD synchrone
function verifierFichierExiste(fileName) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", fileName, false);
    try {
        xhr.send();
        return xhr.status === 200;
    } catch (err) {
        return false;
    }
}
