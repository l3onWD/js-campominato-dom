/* -----------------------------------------
* UTILITY FUNCTIONS
-------------------------------------------*/

//*** NUMBERS ***//

/**
 * Generate a random number from min to max params (included).
 * @param {Number} min minimum number
 * @param {Number} max maximum number
 * @returns {Number}
 */
function getRandomNumber(min = 1, max = 5) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

/**
 * Check if a number is eaven.
 * @param {Number} number the number to check
 * @returns {Boolean}
 */
function isEaven(number) {
    return number % 2 === 0;
}


//*** STRINGS ***//

/**
 * Check if a word is palindrome.
 * @param {String} word 
 * @returns {Boolean}
 */
function isPalindrome(word) {

    let reverseWord = '';

    // Create reversed word
    for(let i = word.length - 1; i >= 0; i--) {
        reverseWord += word.charAt(i);
    }

    // Check if is palindrome
    if(word === reverseWord) return true;

    return false;
}