
/**
 * Dependencies.
 */

const character = require('./character')
const Mind = require('../../..')

/**
 * Letters.
 *
 * - Imagine these # and . represent black and white pixels.
 */

const chars =[
  {
    input: character(
      '.#####.' +
      '#.....#' +
      '#.....#' +
      '#######' +
      '#.....#' +
      '#.....#' +
      '#.....#'
    ),
    output: map('a')
  },

  {
    input: character(
      '######.' +
      '#.....#' +
      '#.....#' +
      '######.' +
      '#.....#' +
      '#.....#' +
      '######.'
    ),
    output: map('b')
  },

  {
    input: character(
      '#######' +
      '#......' +
      '#......' +
      '#......' +
      '#......' +
      '#......' +
      '#######'
    ),
    output: map('c')
  },
]
/**
 * Learn the letters A through C.
 */

const mind = new Mind({ activator: 'sigmoid' })
  .learn(chars)

/**
 * Predict the letter C, even with a pixel off.
 */



var avg = 0.0
for (i = 0; i < 1000; i++) {
  const result = mind.predict(character(
    '#######' +
    '#......' +
    '#......' +
    '##.....' +
    '#......' +
    '#......' +
    '#######'
  ))
  avg = avg + result[0]
}

avg = Math.abs(avg / 1000)

console.log(avg)

ME_A = 0.1 - avg
ME_B = 0.3 - avg
ME_C = 0.5 - avg

console.log("A: " + ME_A.toFixed(8) ) 
console.log("B: " + ME_B.toFixed(8) ) 
console.log("C: " + ME_C.toFixed(8) ) 





// avg = avg / 100



/**
 * Map the letter to a number.
 */

function map (letter) {
  if (letter === 'a') return [ 0.1 ]
  if (letter === 'b') return [ 0.3 ]
  if (letter === 'c') return [ 0.5 ]
  return 0
}
