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
    * INNER FUNCTIONS
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


    /* --------------
    * INIT
    ----------------*/

    //*** GET DIFFICULTY INOUT ***//
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

    // Delete all previous cells
    gridElem.innerHTML = '';


    /* --------------
    * LOGIC
    ----------------*/

    //*** CREATE AND HANDLE CELLS ***//
    // Create all cell based on difficulty
    for (let i = 1; i <= cellsTotalNumber; i++) {
       
        const cell = createCell(i);
        
        //*** CLICK CELL ***//
        cell.addEventListener('click', () => {
            
            // Print content cell
            console.log(cell.innerText);

            // Change cell color
            cell.classList.add('clicked');

        });

        // Append cell inside grid
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
console.log('----------- INIT DONE -----------');



/* -----------------------------------------
* LOGIC
-------------------------------------------*/

//*** CLICK PLAY ***//
playBtn.addEventListener('click', playGame);