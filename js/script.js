/* -----------------------------------------
* FUNCTIONS
-------------------------------------------*/
/**
 * Create a squared cell.
 * @param {Number} size - the size of the cell in px
 * @param {Number} number - the number to show as content
 * @returns {Node}
 */
const createCell = (size, number) => {

    // Create node
    const cell = document.createElement('div');

    // Set size
    cell.style.width = size + 'px';
    cell.style.height = size + 'px';

    // Set properties
    cell.classList.add('game-cell');
    cell.append(number);
    
    return cell;
}



/* -----------------------------------------
* INIT
-------------------------------------------*/
console.log('----------- INIT -----------');

//*** DOM ELEMENTS ***//
const difficultyElem = document.getElementById('game-difficulty');
const playFormElem = document.getElementById('game-form');
const gridElem = document.getElementById('game-grid');


//*** PARAMETERS ***//
const gridSize = 400;
const cellsPerRowEasy = 10;
const cellsPerRowMedium = 9;
const cellsPerRowHard = 7;


//*** SET GRID SIZE ***//
gridElem.style.width = gridSize + 'px';
gridElem.style.height = gridSize + 'px';


// ! Log
console.log('### Elementi DOM:');
console.log('Select: ' + difficultyElem);
console.log('Form: ' + playFormElem);
console.log('Grid: ' + gridElem);
console.log('---------------');
console.log('### Dimensioni griglia:');
console.log('Larghezza: ' + gridSize + 'px');
console.log('Altezza: ' + gridSize + 'px');
console.log('----------- DONE -----------');



/* -----------------------------------------
* LOGIC
-------------------------------------------*/

//*** CLICK PLAY ***//
playFormElem.addEventListener('submit', (ev) => {

    // Prevent submit event
    ev.preventDefault();


    //*** GET DIFFICULTY ***//
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

    
    //*** POPULATE GRID ***//
    // Calculate Grid data
    let cellsTotalNumber = cellsPerRow * cellsPerRow;
    let cellsSize = gridSize / cellsPerRow;

    // Delete all previous cells
    gridElem.innerHTML = '';

    // Create all cell based on difficulty
    for (let i = 1; i <= cellsTotalNumber; i++) {
       
        const cell = createCell(cellsSize, i);
        
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

});