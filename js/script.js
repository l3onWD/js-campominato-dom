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


    //*** GET FORMATTED SCORE ***//
    const getFormattedScore = (score) => {

        const hundreds = Math.floor(score / 100);
        const tens = Math.floor((score % 100) / 10);
        const unit = score % 10;

        return `${hundreds}${tens}${unit}`;
    }


    //*** ON CELL CLICK ***//
    const onCellClick = (ev) => {

        /* --------------
        * FUNCTIONS
        ----------------*/

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

        //*** GET ADJACENT CELLS INDEX ***//
        const getAdjacentCellsIndex = (cellIndex, cols) => {

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

            // Get cell coords from index
            const coords = getCoordsFromIndex(cellIndex, cols);

            // Get cell row and col
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

                        // Get current cell index from coords
                        const currentCellIndex = getIndexFromCoords(i, j, cols);

                        // Add to cells list
                        adjacentCellsIndex.push(currentCellIndex);
                    }
                }
            }
            
            return adjacentCellsIndex;
        }


        //*** GET BOMB PROXIMITY ***//
        const getBombProximity = (cellsIndex, bombs) => {

            let bombProximityNum = 0;

            for (let i = 0; i < cellsIndex.length; i++) {

                const currentCellIndex = cellsIndex[i];
                
                // Check if is a bomb
                if(bombs.includes(currentCellIndex)) bombProximityNum ++
                
            }

            return bombProximityNum;

        }


        //*** SHOW CELL ***//
        const showCell = (cellIndex, bombs) => {

            /* --------------
            * INIT
            ----------------*/
            // Get cell data
            const cells = document.querySelectorAll('.game-cell');
            const cell = cells[cellIndex];
            const adjacentCellsIndex = getAdjacentCellsIndex(cellIndex, cellsPerRow);


            /* --------------
            * LOGIC
            ----------------*/
            // Click cell
            cell.classList.add('clicked');

            // Add to score
            score++;

            // Calculate bomb proximity
            const bombProximityNum = getBombProximity(adjacentCellsIndex, bombs);

            cell.innerText = bombProximityNum;

            // Auto click empty cells
            if(bombProximityNum === 0) {

                cell.innerText = '';

                for (let i = 0; i < adjacentCellsIndex.length; i++) {

                    const adjacentCellIndex = adjacentCellsIndex[i];
                    const adjacentCell = cells[adjacentCellIndex];

                    const isClicked = adjacentCell.classList.contains('clicked');

                    if (!isClicked) showCell(adjacentCellIndex, bombs);// ! recursion
                }
                
            }

        }


        //*** SHOW ALL CELLS ***//
        const showAllCells = (bombs) => {

            /* --------------
            * INIT
            ----------------*/
            // Get all cells
            const cells = document.querySelectorAll('.game-cell');


            /* --------------
            * LOGIC
            ----------------*/
            for (let i = 0; i < cells.length; i++) {

                // Get current cell data
                const currentCell = cells[i];
                const currentCellIndex = parseInt(currentCell.dataset.index);
                const adjacentCellsIndex = getAdjacentCellsIndex(currentCellIndex, cellsPerRow);

                // Click cell
                currentCell.classList.add('clicked');// is clicked

                // Check if is a bomb
                if(bombs.includes(currentCellIndex)) {

                    currentCell.classList.add('bomb');

                } else {

                    // Calculate bomb proximity
                    const bombProximityNum = getBombProximity(adjacentCellsIndex, bombs);

                    currentCell.innerText = bombProximityNum;

                    if(bombProximityNum === 0) currentCell.innerText = '';

                }
            }
        }


        /* --------------
        * LOGIC
        ----------------*/
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


            // Show cell
            showCell(cellNumber, bombs);

            
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

        // Show score
        scoreElem.innerText = getFormattedScore(score);
        
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

    // Show score
    scoreElem.innerText = getFormattedScore(score);
    scoreElem.classList.remove('d-none');

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
const scoreElem = document.getElementById('game-score');


// ! Log
console.log('----------- INIT -----------');
console.log('### Elementi DOM:');
console.log('Select: ' + difficultyElem);
console.log('Bottone: ' + playBtn);
console.log('Grid: ' + gridElem);
console.log('Modale: ' + messageElem);
console.log('Punteggio: ' + scoreElem);
console.log('----------- INIT DONE -----------');



/* -----------------------------------------
* LOGIC
-------------------------------------------*/

//*** CLICK PLAY ***//
playBtn.addEventListener('click', playGame);