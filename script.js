// --- Global State ---
let playerScore = 0;
let computerScore = 0;

// Mapping pilihan ke ikon Font Awesome
const choiceIcons = {
    'gunting': '<i class="fas fa-hand-scissors"></i>',
    'batu': '<i class="fas fa-hand-rock"></i>',
    'kertas': '<i class="fas fa-hand-paper"></i>'
};

// --- DOM Elements ---
const resultTextEl = document.getElementById('result-text');
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const playerChoiceIconEl = document.getElementById('player-choice-icon');
const computerChoiceIconEl = document.getElementById('computer-choice-icon');
const choiceButtons = document.querySelectorAll('.choice-btn');
const resetButton = document.getElementById('reset-button');

// --- Logika Utama Game ---

function getComputerChoice() {
    const choices = ['gunting', 'batu', 'kertas'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw'; // Seri
    }
    
    // Logika Menang: (Gunting > Kertas, Kertas > Batu, Batu > Gunting)
    if (
        (playerChoice === 'gunting' && computerChoice === 'kertas') ||
        (playerChoice === 'kertas' && computerChoice === 'batu') ||
        (playerChoice === 'batu' && computerChoice === 'gunting')
    ) {
        return 'win'; // Pemain menang
    } else {
        return 'lose'; // Pemain kalah (Komputer menang)
    }
}

function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);

    // 1. Update Tampilan Pilihan
    playerChoiceIconEl.innerHTML = choiceIcons[playerChoice];
    computerChoiceIconEl.innerHTML = choiceIcons[computerChoice];

    // 2. Update Skor dan Teks Hasil
    updateScoreAndResult(result, playerChoice, computerChoice);
}

function updateScoreAndResult(result, playerChoice, computerChoice) {
    // Reset kelas warna
    resultTextEl.className = 'result-text'; 

    let message = '';

    if (result === 'win') {
        playerScore++;
        message = `Anda menang! ${capitalize(playerChoice)} mengalahkan ${capitalize(computerChoice)}.`;
        resultTextEl.classList.add('win');
    } else if (result === 'lose') {
        computerScore++;
        message = `Anda kalah! ${capitalize(computerChoice)} mengalahkan ${capitalize(playerChoice)}.`;
        resultTextEl.classList.add('lose');
    } else {
        message = `Seri! Keduanya memilih ${capitalize(playerChoice)}.`;
        resultTextEl.classList.add('draw');
    }

    resultTextEl.textContent = message;
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
}

// --- Logika Utility ---

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
    resultTextEl.textContent = "Skor direset! Mainkan babak baru!";
    resultTextEl.className = 'result-text';
    playerChoiceIconEl.textContent = '?';
    computerChoiceIconEl.textContent = '?';
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// --- Event Listeners ---

choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.getAttribute('data-choice');
        playGame(playerChoice);
    });
});

resetButton.addEventListener('click', resetGame);

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    resultTextEl.textContent = "Siap untuk bermain? Pilih gerakan Anda!";
});