/*
Il computer deve generare 16 numeri casuali nello stesso range della difficltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell'array delle bombe non potranno esserci due numeri uguali

In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati abbiamo calpestato una bomba. La cella si colora di rosso e la partita termina. Altrimenti, la cella cliccata si colora di azzurro e l'utente può continuare  a cliccare sulle altre celle.

LA partita termina quando il giocatore clicca su una bomba o quando raggiunger il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).

Al termine della partita, il software deve comunicare il punteggio, cioè il numero di volte che l'utente ha cliccato su una cella che non era una bomba


# MILESTONE 1
    - Prepariamo "Qualcosa" per tenere il punteggio dell'utente.
    - Quando l'utente clicca su una cella, incrementiamo il punteggio.
    - Se riusciamo, facciamo anche in modo da non poter più cliccare sulla stessa cella

# MILESTONE 2
    - Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
    - Generiamoli e stampiamo in console per essere certi che siano corretti

# MILESTONE 3
    - Quando l'utente clicca su una cella, verrifichiamo se ha calpestato una bomba, controllando se il numero di cella è presente nell'array di bombe.
    - Se si, la cella diventa rossa (raccogliamo il punteggio e scriviamo in console che la patita termina) altrimenti diventa azzurra e dobbiamo incrementare il punteggio.

# MILESTONE 4
    - Quando l'utente clicca su una cella, e questa non è una bomba, dobbiamo controllare se il punteggio incrementato ha raggiunto l punteggio massimo, perchè in quel caso la partita termina. Raccogliamo quindi il messaggio e scriviamo un messaggio appropriato.

# MILESTONE 5
    - Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata una bomba o seperchè l'utente ha raggiunto il punteggio massimo(ossia ha vinto). Dobbiamo poi in ogni caso stampare lin pagina il punteggio raggiunto ed il messaggio adeguato in caso di vittoria o sconfitta.

# BONUS
    - Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà (come le istruzioni di ieri se non già fatto)

# SUPERBONUS
    - Colorare tutte le celle bomba quando la partita finisce
*/

/* -----------------------------------------
* FUNCTIONS
-------------------------------------------*/

//*** START GAME ***//
const playGame = () => {

    /* --------------
    * FUNCTIONS
    ----------------*/

    //*** CREATE CELL ***//
    const createCell = (number) => {

        // Create node
        const cell = document.createElement('div');
    
        // Set properties
        cell.classList.add('game-cell');
        cell.append(number);
        
        return cell;
    }


    //*** GENERATE UNIQUE BOMBS ***//
    const generateUniqueBombs = (number, maxCells) => {

        const bombs = [];

        // Populate list
        while (bombs.length < number) {

            let randomNumber;

            // Get a random cell until is unique
            do {
                randomNumber = Math.floor(Math.random() * maxCells) + 1;

            } while (bombs.includes(randomNumber));

            // Add unique number inside the list
            bombs.push(randomNumber);
        }

        return bombs;
    }


    //*** SHOW END MESSAGE ***//
    const showEndMessage = (score, hasWon) => {

        // Prepare paragraphs
        let msg = '<p class="mb-2">HAI VINTO!!</p>';
        const scoreMsg = `<p>Il tuo punteggio è ${score} punti!</p>`
        
        // Check if is a victory or a lost
        if(!hasWon) msg = '<p class="mb-2">HAI PERSO!!</p>';

        // Create message
        msg += scoreMsg;

        // Show message
        //console.log(msg);
        messageElem.innerHTML = msg;
        messageElem.classList.add('show');
    }


    //*** SHOW ALL CELLS ***//
    const showAllCells = (bombs) => {

        // Get all cells
        const cells = document.querySelectorAll('.game-cell');

        // Show all cells
        for (let i = 0; i < cells.length; i++) {

            // Get current cell data
            const cell = cells[i];
            const cellNumber = parseInt(cell.innerText);

            // Change properties
            cell.classList.add('clicked');// is clicked

            if(bombs.includes(cellNumber)) cell.classList.add('bomb');// is a bomb
        }
    }


    //*** ON CELL CLICK ***//
    const onCellClick = (ev) => {

        //*** CHECK IF GAME ENDED ***//
        if(gameEnded) return;


        //*** CHECK IF CLICKED ***//
        // Get current cell clicked
        const cell = ev.target;

        if(cell.classList.contains('clicked')) return;

        // Print content cell
        //console.log(cell.innerText);

        // Change cell color
        cell.classList.add('clicked');


        //*** CHECK IF IS A BOMB ***//
        // Get cell number
        const cellNumber = parseInt(cell.innerText);

        
        if(bombs.includes(cellNumber)) {

            //*** GAME LOST ***//
            // End Game
            gameEnded = true;

            // Show all cells
            showAllCells(bombs);

            cell.classList.add('bomb');

            // Show a message
            showEndMessage(score, false);

        } // Is a normal cell 
        else {
            
            // Increment score
            score++;


            //*** GAME WON ***//
            if(score === maxScore) {
                // End Game
                gameEnded = true;

                // Show a message
                showEndMessage(score, true);
            }
        }
        
    }


    /* --------------
    * INIT
    ----------------*/

    //*** DATA ***//
    // Game score
    let score = 0;

    // Game bombs
    const maxBombs = 16;

    // Game Status
    let gameEnded = false;


    //*** GET DIFFICULTY INPUT ***//
    const difficulty = parseInt(difficultyElem.value);
    let cellsPerRow;

    // Check difficulty chosen
    switch (difficulty) {
        // Easy
        case 1:
            cellsPerRow = cellsPerRowEasy;
            break;

        // Medium
        case 2:
            cellsPerRow = cellsPerRowMedium;
            break;

        // Hard
        default:
            cellsPerRow = cellsPerRowHard;
    }

    
    //*** INIT GRID ***//
    // Calculate Grid data
    const cellsTotalNumber = cellsPerRow * cellsPerRow;
    
    // Set cell size
    const root = document.querySelector(':root');
    root.style.setProperty('--grid-cols', cellsPerRow);

    // Generate bombs
    const bombs = generateUniqueBombs(maxBombs, cellsTotalNumber);
    console.log(bombs);

    // Calculate max score
    const maxScore = cellsTotalNumber - maxBombs;

    // Delete all previous cells
    gridElem.innerHTML = '';

    // Hide game messages
    messageElem.classList.remove('show');


    /* --------------
    * LOGIC
    ----------------*/

    //*** CREATE AND HANDLE CELLS ***//
    // Create all cell based on difficulty
    for (let i = 1; i <= cellsTotalNumber; i++) {
       
        // Get current cell
        const cell = createCell(i);
        
        // Append on click event
        cell.addEventListener('click', onCellClick);

        // Append current cell inside grid
        gridElem.appendChild(cell);
    }

}



/* -----------------------------------------
* INIT
-------------------------------------------*/

//*** DOM ELEMENTS ***//
const difficultyElem = document.getElementById('game-difficulty');
const playBtn = document.getElementById('game-play-btn');
const gridElem = document.getElementById('game-grid');
const messageElem = document.getElementById('game-message');


//*** PARAMETERS ***//
const cellsPerRowEasy = 10;
const cellsPerRowMedium = 9;
const cellsPerRowHard = 7;


// ! Log
console.log('----------- INIT -----------');
console.log('### Elementi DOM:');
console.log('Select: ' + difficultyElem);
console.log('Bottone: ' + playBtn);
console.log('Grid: ' + gridElem);
console.log('Modale: ' + messageElem);
console.log('----------- INIT DONE -----------');



/* -----------------------------------------
* LOGIC
-------------------------------------------*/

//*** CLICK PLAY ***//
playBtn.addEventListener('click', playGame);