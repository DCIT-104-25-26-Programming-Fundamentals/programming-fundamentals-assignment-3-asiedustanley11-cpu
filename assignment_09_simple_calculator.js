// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 9
// =============================================================================
//
// TASK: Console-Based Simple Calculator
//
// Build a calculator program that runs in the console and performs basic
// arithmetic operations based on the user's input.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_09_simple_calculator.js
//
// -----------------------------------------------------------------------------
// OPERATIONS YOUR CALCULATOR MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Addition          ( + )    e.g.  10 + 3  =  13
//   2. Subtraction       ( - )    e.g.  10 - 3  =  7
//   3. Multiplication    ( * )    e.g.  10 * 3  =  30
//   4. Division          ( / )    e.g.  10 / 3  =  3.33
//   5. Modulus           ( % )    e.g.  10 % 3  =  1  (remainder)
//   6. Exponentiation    ( ** )   e.g.  2 ** 8  =  256
//   7. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ============================
//        SIMPLE CALCULATOR
//   ============================
//   1. Addition
//   2. Subtraction
//   3. Multiplication
//   4. Division
//   5. Modulus
//   6. Exponentiation
//   7. Quit
//   Select an operation (1-7):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Select an operation (1-7): 4
//   Enter first number : 10
//   Enter second number: 3
//   Result: 10 / 3 = 3.33
//
//   Select an operation (1-7): 4
//   Enter first number : 5
//   Enter second number: 0
//   Error: Cannot divide by zero.
//
//   Select an operation (1-7): 7
//   Goodbye!
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Each arithmetic operation MUST be written as its own function.
// - Use a loop so the calculator keeps running until the user selects Quit.
// - Division by zero must be caught and handled with a clear error message
//   (do NOT let the program crash).
// - Display results to 2 decimal places using .toFixed(2).
// - Handle invalid menu choices gracefully.
//

//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================


const readlineSync = require("readline-sync");

function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
    return firstNumber / secondNumber;
}

function modulus(firstNumber, secondNumber) {
    return firstNumber % secondNumber;
}

function exponentiate(firstNumber, secondNumber) {
    return firstNumber ** secondNumber;
}

function showMenu() {
    console.log("\n============================");
    console.log("      SIMPLE CALCULATOR");
    console.log("============================");
    console.log("1. Addition");
    console.log("2. Subtraction");
    console.log("3. Multiplication");
    console.log("4. Division");
    console.log("5. Modulus");
    console.log("6. Exponentiation");
    console.log("7. Quit");
}

function getOperationSymbol(choice) {
    switch (choice) {
        case "1":
            return "+";
        case "2":
            return "-";
        case "3":
            return "*";
        case "4":
            return "/";
        case "5":
            return "%";
        case "6":
            return "**";
        default:
            return "";
    }
}

function calculate(choice, firstNumber, secondNumber) {
    switch (choice) {
        case "1":
            return add(firstNumber, secondNumber);
        case "2":
            return subtract(firstNumber, secondNumber);
        case "3":
            return multiply(firstNumber, secondNumber);
        case "4":
            return divide(firstNumber, secondNumber);
        case "5":
            return modulus(firstNumber, secondNumber);
        case "6":
            return exponentiate(firstNumber, secondNumber);
        default:
            return null;
    }
}

function runCalculator() {
    let running = true;

    while (running) {
        showMenu();

        const choice = readlineSync.question("Select an operation (1-7): ");

        if (choice === "7") {
            console.log("Goodbye!");
            running = false;
            continue;
        }

        if (!["1", "2", "3", "4", "5", "6"].includes(choice)) {
            console.log("Error: Please select a valid operation from 1 to 7.");
            continue;
        }

        const firstNumber = Number(
            readlineSync.question("Enter first number: ")
        );
        const secondNumber = Number(
            readlineSync.question("Enter second number: ")
        );

        if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
            console.log("Error: Please enter valid numbers.");
            continue;
        }

        if (
            (choice === "4" || choice === "5") &&
            secondNumber === 0
        ) {
            if (choice === "4") {
                console.log("Error: Cannot divide by zero.");
            } else {
                console.log("Error: Cannot calculate a modulus by zero.");
            }

            continue;
        }

        const result = calculate(choice, firstNumber, secondNumber);
        const symbol = getOperationSymbol(choice);

        console.log(
            `Result: ${firstNumber} ${symbol} ${secondNumber} = ${result.toFixed(2)}`
        );
    }
}

runCalculator();