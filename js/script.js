/*
    Se una cella viene cliccata controlla tutte le 8 celle circostanti e clicca tutte quelle senza bombe
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
    const createCell = (index) => {

        // Create node
        const cell = document.createElement('div');
    
        // Set properties
        cell.classList.add('game-cell');
        //cell.append(index + 1);
        cell.dataset.index = index;
        
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
                randomNumber = Math.floor(Math.random() * maxCells);

            } while (bombs.includes(randomNumber));

            // Add unique cell inside the list
            bombs.push(randomNumber);
        }

        return bombs;
    }


    //*** SHOW END MESSAGE ***//
    const showEndMessage = (score, hasWon) => {
      
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
            const cellNumber = parseInt(cell.dataset.index);

            // Change properties
            cell.classList.add('clicked');// is clicked

            if(bombs.includes(cellNumber)) cell.classList.add('bomb');// is a bomb
        }
    }


    //*** SHOW CELLS BLOCK ***//
    const showCellsBlock = (cellIndex, bombs) => {

        /* EXTERNAL VARIABLES
            - cellsPerRow
        */

        /* --------------
        * FUNCTIONS
        ----------------*/

        //*** GET ADJACENT CELLS INDEX ***//
        const getCellsBlockIndex = (cellIndex, cols) => {

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

            let adjacentCellsIndex = [];

            // Get coords from index
            const coords = getCoordsFromIndex(cellIndex, cols);

            // Get row and col
            const row = coords[0];
            const col = coords[1];


            /* --------------
            * LOGIC
            ----------------*/

            // Cicle through adjacent cells (3x3)
            for (let i = row - 1; i <= row + 1; i++) {
                
                for (let j = col - 1; j <= col + 1; j++) {

                    // Check if index is inside the grid
                    if(isInsideGrid(i, j, cols, cols)) {

                        // Get index from coords
                        const currentCellIndex = getIndexFromCoords(i, j, cols);

                        // Add to cells list
                        adjacentCellsIndex.push(currentCellIndex);
                    }
                }
            }
            
            return adjacentCellsIndex;
        }


        /* --------------
        * INIT
        ----------------*/
        
        // Get cells block indexes (current cell included)
        const cellsBlockIndex = getCellsBlockIndex(cellIndex, cellsPerRow);

        // Get all cells
        const cells = document.querySelectorAll('.game-cell');


        /* --------------
        * LOGIC
        ----------------*/

        for (let i = 0; i < cellsBlockIndex.length; i++) {

            const currentCellIndex = cellsBlockIndex[i];
            const currentCell = cells[currentCellIndex];
            
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


        //*** CHECK IF IS A BOMB ***//
        // Get cell number
        const cellNumber = parseInt(cell.dataset.index);

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


            // Show cells block
            showCellsBlock(cellNumber, bombs);
            console.log('Score: ' + score);

            
            //*** GAME WON ***//
            if(score === maxScore) {
                // End Game
                gameEnded = true;

                // Show all cells
                showAllCells(bombs);

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
    for (let i = 0; i < cellsTotalNumber; i++) {
       
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