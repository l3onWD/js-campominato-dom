/*
    Se una cella viene cliccata controlla tutte le 8 celle circostanti e clicca tutte quelle senza bombe
*/

/* -----------------------------------------
* FUNCTIONS
-------------------------------------------*/

//*** START GAME ***//
const playGame = () => {
    /* EXTERNAL VARIABLES
        - all DOM elements
    */

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

            // Add unique cell inside the list
            bombs.push(randomNumber);
        }

        return bombs;
    }


    //*** SHOW END MESSAGE ***//
    const showEndMessage = (score, hasWon) => {
        /* EXTERNAL VARIABLES
            - messageElem
        */

        // Prepare paragraphs
        let msg = '<p class="mb-2">HAI VINTO!!</p>';
        const scoreMsg = `<p>Il tuo punteggio è ${score} punti!</p>`
        
        // Check if is a lost
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


    //*** SHOW ADJACENT CELLS ***//
    const showAdjacentCells = (cellIndex, bombs) => {

        /* EXTERNAL VARIABLES
            - cellsPerRow
        */

        /* --------------
        * FUNCTIONS
        ----------------*/

        //*** GET ADJACENT CELLS INDEX ***//
        const getAdjacentCellsIndex = (cellIndex, cellsPerRow) => {

            /* --------------
            * FUNCTIONS
            ----------------*/

            //*** GET COORDS FROM INDEX ***//
            const getCoordsFromIndex = (index, cols) => {
                const row = Math.floor(index / cols);
                const col = index % cols;

                return [row, col];
            }


            //*** GET INDEX FROM COORDS ***//
            const getIndexFromCoords = (row, col, cols) => row * cols + col;


            //*** IS INSIDE GRID ***//
            const isInsideGrid = (row, col, rowMax, colMax) => row >= 0 && row < rowMax && col >= 0 && col < colMax;


            /* --------------
            * INIT
            ----------------*/

            // Translate index basic value from 1 to 0
            const translatedCellIndex = cellIndex - 1;

            // Get coords from index
            const coords = getCoordsFromIndex(translatedCellIndex, cellsPerRow);

            // Get row and col
            const row = coords[0];
            const col = coords[1];


            /* --------------
            * LOGIC
            ----------------*/
            // Get cells
            let adjacentCellsIndex = [];

            // Cicle vertical
            for (let i = row - 1; i <= row + 1; i++) {
                
                // Cicle horizontal
                for (let j = col - 1; j <= col + 1; j++) {


                    // Check if inside the grid
                    if(isInsideGrid(i, j, cellsPerRow, cellsPerRow)) {

                        // Get index from coords
                        const cellIndex = getIndexFromCoords(i, j, cellsPerRow);

                        // Translate index basic value and add to cells list
                        adjacentCellsIndex.push(cellIndex + 1);
                    }
                }
            }
            
            return adjacentCellsIndex;
        }


        /* --------------
        * INIT
        ----------------*/
        
        // Get surround cells indexes
        const surroundCellsIndexes = getAdjacentCellsIndex(cellIndex, cellsPerRow);

        // Get all cells
        const cells = document.querySelectorAll('.game-cell');


        /* --------------
        * LOGIC
        ----------------*/

        for (let i = 0; i < surroundCellsIndexes.length; i++) {

            const currentCellIndex = surroundCellsIndexes[i];
            const currentCell = cells[currentCellIndex - 1];// Translate min index from 1 to 0
            
            // Check if is cliccable
            if(!currentCell.classList.contains('clicked') &&  !bombs.includes(currentCellIndex)) {

                // Click the cell
                currentCell.classList.add('clicked');

                // Add to score
                score++;
            }
            
        }
    }


    //*** ON CELL CLICK ***//
    const onCellClick = (ev) => {

        /* EXTERNAL VARIABLES
            - gameEnded
            - bombs
            - maxScore
            - score
        */

        //*** CHECK IF GAME ENDED ***//
        if(gameEnded) return;


        //*** CHECK IF ALREADY CLICKED ***//
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

        // Is a bomb cell 
        if(bombs.includes(cellNumber)) {

            //*** GAME LOST ***//
            // End Game
            gameEnded = true;

            // Show all cells
            showAllCells(bombs);

            // Show a message
            showEndMessage(score, false);

        } // Is a normal cell 
        else {
            
            // Increment score
            score++;

            // Show adjacent cells 
            showAdjacentCells(cellNumber, bombs);
            console.log('Score: ' + score);

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

    //*** PARAMETERS ***//
    // Game difficulty
    const cellsPerRowEasy = 10;
    const cellsPerRowMedium = 9;
    const cellsPerRowHard = 7;

    // Game bombs
    const maxBombs = 16;

    // Game score
    let score = 0;

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

    
    //*** INIT GAME ***//
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

    // Change Button text
    playBtn.innerText = 'Ricomincia';


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