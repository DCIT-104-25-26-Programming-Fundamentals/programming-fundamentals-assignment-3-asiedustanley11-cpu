// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================


const readlineSync = require('readline-sync');
 
/**
 * Prompts the user to enter a matrix of the given size, one row at a
 * time (values separated by spaces), and returns it as an array of arrays.
 */
function readMatrix(rows, cols, label = "") {
  const matrix = [];
 
  for (let i = 0; i < rows; i++) {
    let row;
    while (true) {
      const line = readlineSync.question(`Enter row ${i + 1}${label}: `);
      row = line.trim().split(/\s+/).map(Number);
 
      // Make sure the row has exactly the right number of values,
      // and that every value converted to a valid number.
      if (row.length !== cols || row.some(isNaN)) {
        console.log(`Please enter exactly ${cols} numbers, separated by spaces.`);
        continue;
      }
      break;
    }
    matrix.push(row);
  }
 
  return matrix;
}
 
/**
 * Prints a matrix in a neat, aligned grid format.
 */
function displayMatrix(matrix, title) {
  console.log(`\n${title}:`);
  for (const row of matrix) {
    // padStart right-aligns each number within a fixed-width field so
    // columns stay lined up even as digit counts vary.
    const formattedRow = row.map((value) => String(value).padStart(6)).join("");
    console.log(formattedRow);
  }
}
 
// -----------------------------------------------------------------------------
// PART A — Transpose
// -----------------------------------------------------------------------------
/**
 * Returns the transpose of the given matrix (rows become columns).
 */
function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
 
  // Build an empty result matrix of size cols x rows.
  const result = [];
  for (let i = 0; i < cols; i++) {
    result.push(new Array(rows).fill(0));
  }
 
  // Nested loop: for every position (i, j) in the original, place the
  // value at position (j, i) in the result.
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[j][i] = matrix[i][j];
    }
  }
 
  return result;
}
 
// -----------------------------------------------------------------------------
// PART B — Addition
// -----------------------------------------------------------------------------
/**
 * Returns the element-wise sum of two matrices of the same size.
 */
function addMatrices(matrixA, matrixB) {
  const rows = matrixA.length;
  const cols = matrixA[0].length;
 
  const result = [];
  for (let i = 0; i < rows; i++) {
    result.push(new Array(cols).fill(0));
  }
 
  // Nested loop: add the matching elements from both matrices.
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[i][j] = matrixA[i][j] + matrixB[i][j];
    }
  }
 
  return result;
}
 
// -----------------------------------------------------------------------------
// PART C — Multiplication
// -----------------------------------------------------------------------------
/**
 * Returns the matrix product of matrixA (M x N) and matrixB (N x P).
 * The result is an M x P matrix.
 */
function multiplyMatrices(matrixA, matrixB) {
  const m = matrixA.length;      // rows in A
  const n = matrixA[0].length;   // columns in A (must equal rows in B)
  const p = matrixB[0].length;   // columns in B
 
  const result = [];
  for (let i = 0; i < m; i++) {
    result.push(new Array(p).fill(0));
  }
 
  // Triple nested loop:
  //   i -> each row of A
  //   j -> each column of B
  //   k -> walks along the shared dimension (columns of A / rows of B),
  //        multiplying and summing to get one entry of the result.
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < p; j++) {
      let total = 0;
      for (let k = 0; k < n; k++) {
        total += matrixA[i][k] * matrixB[k][j];
      }
      result[i][j] = total;
    }
  }
 
  return result;
}
 
/**
 * Asks the user for a positive whole number, re-prompting until valid.
 */
function getPositiveInt(prompt) {
  while (true) {
    const value = readlineSync.questionInt(prompt);
    if (value <= 0) {
      console.log("Please enter a positive whole number.");
      continue;
    }
    return value;
  }
}
 
function main() {
  console.log("=== MATRIX OPERATIONS ===");
 
  // -------------------------------------------------------------------
  // PART A — Transpose
  // -------------------------------------------------------------------
  console.log("\n--- Part A: Transpose a Matrix ---");
  const rows = getPositiveInt("Enter number of rows: ");
  const cols = getPositiveInt("Enter number of columns: ");
  const matrix = readMatrix(rows, cols);
 
  displayMatrix(matrix, "Original Matrix");
  const transposed = transposeMatrix(matrix);
  displayMatrix(transposed, "Transposed Matrix");
 
  // -------------------------------------------------------------------
  // PART B — Addition
  // -------------------------------------------------------------------
  console.log("\n--- Part B: Add Two Matrices ---");
  const rowsB = getPositiveInt("Enter number of rows for both matrices: ");
  const colsB = getPositiveInt("Enter number of columns for both matrices: ");
 
  console.log("Matrix A:");
  const matrixA = readMatrix(rowsB, colsB);
  console.log("Matrix B:");
  const matrixB = readMatrix(rowsB, colsB);
 
  displayMatrix(matrixA, "Matrix A");
  displayMatrix(matrixB, "Matrix B");
  const sumMatrix = addMatrices(matrixA, matrixB);
  displayMatrix(sumMatrix, "Sum (A + B)");
 
  // -------------------------------------------------------------------
  // PART C — Multiplication
  // -------------------------------------------------------------------
  console.log("\n--- Part C: Multiply Two Matrices ---");
  const m = getPositiveInt("Enter rows for Matrix A: ");
  const n = getPositiveInt("Enter columns for Matrix A (= rows for Matrix B): ");
  const p = getPositiveInt("Enter columns for Matrix B: ");
 
  console.log("Matrix A:");
  const matrixC = readMatrix(m, n);
  console.log("Matrix B:");
  const matrixD = readMatrix(n, p);
 
  displayMatrix(matrixC, "Matrix A");
  displayMatrix(matrixD, "Matrix B");
  const productMatrix = multiplyMatrices(matrixC, matrixD);
  displayMatrix(productMatrix, "Product (A x B)");
}
 
main();