const readlineSync = require("readline-sync");

const students = [];

function showMenu() {
    console.log("\n================================");
    console.log("     STUDENT RECORD SYSTEM MENU");
    console.log("================================");
    console.log("1. Add student");
    console.log("2. Display all students");
    console.log("3. Calculate average score");
    console.log("4. Quit");
}

function isPositiveInteger(value) {
    return Number.isInteger(value) && value > 0;
}

function calculateAverage(scores) {
    let total = 0;

    for (let i = 0; i < scores.length; i++) {
        total += scores[i];
    }

    return total / scores.length;
}

function addStudent() {
    const name = readlineSync.question("Student name: ").trim();

    if (name === "") {
        console.log("Error: Student name cannot be empty.");
        return;
    }

    const id = Number(readlineSync.question("Student ID: "));

    if (!Number.isInteger(id) || id <= 0) {
        console.log("Error: Student ID must be a positive integer.");
        return;
    }

    const existingStudent = students.find(function (student) {
        return student.id === id;
    });

    if (existingStudent) {
        console.log("Error: A student with that ID already exists.");
        return;
    }

    const scoreCount = Number(
        readlineSync.question("How many scores? ")
    );

    if (!isPositiveInteger(scoreCount)) {
        console.log("Error: The number of scores must be a positive integer.");
        return;
    }

    const scores = [];

    for (let i = 0; i < scoreCount; i++) {
        const score = Number(
            readlineSync.question(`Enter score ${i + 1}: `)
        );

        if (!Number.isFinite(score)) {
            console.log("Error: Scores must be valid numbers.");
            return;
        }

        scores.push(score);
    }

    const student = {
        name: name,
        id: id,
        scores: scores
    };

    students.push(student);
    console.log(`Student "${name}" added successfully.`);
}

function displayAllStudents() {
    if (students.length === 0) {
        console.log("No students have been added yet.");
        return;
    }

    console.log("\nAll Students:");

    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        const average = calculateAverage(student.scores);

        console.log(`\nName: ${student.name}`);
        console.log(`ID: ${student.id}`);
        console.log(`Scores: ${student.scores.join(", ")}`);
        console.log(`Average: ${average.toFixed(2)}`);
    }
}

function displayStudentAverage() {
    const id = Number(readlineSync.question("Enter student ID: "));

    if (!Number.isInteger(id)) {
        console.log("Error: Student ID must be a valid number.");
        return;
    }

    let foundStudent = null;

    for (let i = 0; i < students.length; i++) {
        if (students[i].id === id) {
            foundStudent = students[i];
            break;
        }
    }

    if (foundStudent === null) {
        console.log("Error: Student ID not found.");
        return;
    }

    const average = calculateAverage(foundStudent.scores);
    console.log(
        `${foundStudent.name}'s average score: ${average.toFixed(2)}`
    );
}

function runStudentRecordSystem() {
    let running = true;

    while (running) {
        showMenu();

        const choice = readlineSync.question("Enter your choice (1-4): ");

        switch (choice) {
            case "1":
                addStudent();
                break;

            case "2":
                displayAllStudents();
                break;

            case "3":
                displayStudentAverage();
                break;

            case "4":
                console.log("Goodbye!");
                running = false;
                break;

            default:
                console.log("Error: Please choose an option from 1 to 4.");
        }
    }
}

runStudentRecordSystem();