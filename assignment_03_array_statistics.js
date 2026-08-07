// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 3
// =============================================================================
//
// TASK: Array Statistics Calculator
//
// Write a JavaScript program that reads a collection of numbers from the user
// and computes key statistical values using separate functions.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_03_array_statistics.js
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT / OUTPUT EXAMPLE
// -----------------------------------------------------------------------------
//
//   How many numbers? 5
//   Enter number 1: 4
//   Enter number 2: 7
//   Enter number 3: 2
//   Enter number 4: 9
//   Enter number 5: 1
//
//   Results:
//   Sum:     23
//   Average: 4.6
//   Maximum: 9
//   Minimum: 1
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - You MUST implement each calculation in its own function (see scaffold).
// - You may NOT use JavaScript's built-in array methods like reduce(),
//   Math.max(), or Math.min(). Implement the logic yourself using loops.
// - N must be a positive integer. If the user enters 0 or a negative number,
//   print an error message and stop.
//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================


const readlineSync = require("readline-sync");
 
/**
 * Returns the sum of all elements in the array.
 */
function getSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
 
/**
 * Returns the average of all elements in the array.
 */
function getAverage(arr) {
  const sum = getSum(arr);
  return sum / arr.length;
}
 
/**
 * Returns the largest value in the array.
 */
function getMax(arr) {
  let maxValue = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxValue) {
      maxValue = arr[i];
    }
  }
  return maxValue;
}
 
/**
 * Returns the smallest value in the array.
 */
function getMin(arr) {
  let minValue = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < minValue) {
      minValue = arr[i];
    }
  }
  return minValue;
}
 
function main() {
  const n = readlineSync.questionInt("How many numbers? ");
 
  if (n <= 0) {
    console.log("Error: N must be a positive integer.");
    return;
  }
 
  const numbers = [];
  for (let i = 0; i < n; i++) {
    const value = readlineSync.questionInt(`Enter number ${i + 1}: `);
    numbers.push(value);
  }
 
  const sum = getSum(numbers);
  const average = getAverage(numbers);
  const maximum = getMax(numbers);
  const minimum = getMin(numbers);
 
  console.log();
  console.log("Results:");
  console.log(`Sum:     ${sum}`);
  console.log(`Average: ${average}`);
  console.log(`Maximum: ${maximum}`);
  console.log(`Minimum: ${minimum}`);
}
 
main();