const images = document.querySelectorAll(".image");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");
const word = document.getElementById("word");
const words = [ "Cacahuète", "Café", "Cerise", "Raisin"];
const imagePaths = [ 
    "images/cacahuete.jpeg",
    "images/cafe.jpeg",
    "images/cerise.jpeg",
    "images/raisin.jpeg",
];
let correctImageIndex = 0;
let attemps = 0;

function initializeGame(){
    attemps = 0;
    correctImageIndex = Math.floor(Math.random() * words.length);
    console.log(correctImageIndex);
    
    word.textContent = words[correctImageIndex];

    images.forEach((img, index) => {
        img.src = imagePaths[(index + correctImageIndex) % words.length];
        img.alt = words[(index + correctImageIndex) % words.length];
        img.classList.add("hidden");
    });
    message.textContent = "";
    message.classList.remove("correct", "incorrect");
}

initializeGame();

//Verification du clic sur une image
images.forEach((img, index) => {
    img.addEventListener("click", () => {
        //Verifie si l'image est encore masquée
        if(!img.classList.contains("hidden")) return;
        
        if(index === correctImageIndex) {
            revealImages();
            message.textContent = "Correct ! Les images sont dévoilées."
            message.classList.remove("incorrect");
            message.classList.remove("correct");
        } else {
            attemps++;
            if(attemps >= 3){
                revealImages();
                message.textContent = "Vous avez échoué trois fois.Les images sont dévoilés."
                message.classList.remove("correct");
                message.classList.add("incorrect");
            } else {
                message.textContent = `Incorrect, essayez encore ! Vous avez (${
                    3 - attemps
                } tentatives restantes.)`;
                message.classList.remove("correct");
                message.classList.add("incorrect");
            }
        }
        
    });    
});

function revealImages() {
    images.forEach((img) => {
        img.classList.remove("hidden");
    });
}

// Reinitialistion du jeu
resetButton.addEventListener("click", () => {
    initializeGame();
    message.textContent = "";
    message.classList.remove("correct", "incorrect");
});
