//export const gridSize = 4;
const CLEARED_MESSAGE = "**CLEARED**";

export const planets =
    [
        {name: "Mercury", value: "36.8"},
        {name: "Venus", value: "67.2"},
        {name: "Earth", value: "93"},
        {name: "Mars", value: "141.6"},
        {name: "Jupiter", value: "483.6"},
        {name: "Saturn", value: "886.5"},
        {name: "Uranus", value: "1,783.7"},
        {name: "Neptune", value: "2,795.2"},
        {name: "Pluto", value: "3,670.1"},
    ];

export const books =
    [
        {name: "Stephen King", value: "The Stand"},
        {name: "Frank Herbert", value: "Dune"},
        {name: "Herman Melville", value: "Moby Dick"},
        {name: "Joseph Heller", value: "Catch-22"},
        {name: "George Orwell", value: "1984"},
        {name: " J. R. R. Tolkien", value: "Lord of the Rings"},
        {name: "Mary Shelly", value: "Frankenstein"},
        {name: "H.P. Lovecraft", value: "Mountains of Madness"},
        {name: "Madeleine L'Engle", value: "A Wrinkle in Time"},
        {name: "Ray Bradbury", value: "Fahrenheit 451"},
    ];

export function populateGrid(body, gridSize, gameType) {

    for (var i = 0; i < (gridSize * gridSize / 2); i++) {

        var randomItem;
        console.log('populating grid of type: ' + gameType);
        
        if (gameType == 'planets') {
            randomItem = planets[Math.floor(Math.random() * planets.length)];
        } else if (gameType == 'books') {
            randomItem = books[Math.floor(Math.random() * books.length)];
        }
        console.log("picking random item: " + randomItem.name + ' value: ' + randomItem.value);

        var randomRow;
        var randomCol;
        var element;

        //find an available element for planet name
        do {
            randomRow = Math.floor(Math.random() * gridSize);
            randomCol = Math.floor(Math.random() * gridSize);
            element = body[randomRow][randomCol];
        } while (element.front != "");

        console.log('found element for name: ' + element.key + ' row: ' + randomRow + ' col: ' + randomCol);
        element.front = randomItem.name;
        element.display = element.back;

        //find an available element for planet distance
        do {
            randomRow = Math.floor(Math.random() * gridSize);
            randomCol = Math.floor(Math.random() * gridSize);
            element = body[randomRow][randomCol];
        } while (element.front != "");

        console.log('found element for value:' + element.key);
        element.front = randomItem.value;
        element.display = element.back;
    }
}

export function flipCardToFront(body, key, gridSize) {
    for (var row = 0; row < gridSize; row++)
                 for (var col = 0; col < gridSize; col++) {

                     if (body[row][col].key === key) {
                         body[row][col].display = body[row][col].front;
                     }
                 }
}

export function flipCardsBackOver(body, card1, val, gridSize) {
    for (var row = 0; row < gridSize; row++)
        for (var col = 0; col < gridSize; col++) {
            if ((body[row][col].key == card1.key) || (body[row][col].key == val.key)) {
                body[row][col].display = body[row][col].back;
            }
        }
}

export function markCardsAsCleared(body, card1, val, gridSize) {
    for (var row = 0; row < gridSize; row++)
        for (var col = 0; col < gridSize; col++) {
            if ((body[row][col].key == card1.key)||(body[row][col].key == val.key)) {
                body[row][col].display = CLEARED_MESSAGE;
            }
        }
}

export function checkForMatch(card1, val, gameType) {

    if (gameType == 'planets') {
        for (var j = 0; j < planets.length; j++) {
            if ((planets[j].name == card1.display || planets[j].name == val.display)&&
                (planets[j].value == card1.display || planets[j].value == val.display)) {
                return true;
            }
        }
    } else if (gameType == 'books') {
        for (var j = 0; j < books.length; j++) {
            if ((books[j].name == card1.display || books[j].name == val.display)&&
                (books[j].value == card1.display || books[j].value == val.display)) {
                return true;
            }
        }  
    }
    return false;
}

export function cardAlreadyCleared(body, val, gridSize) {
    for (var row = 0; row < gridSize; row++)
        for (var col = 0; col < gridSize; col++) {
            if (body[row][col].key === val.key) {
                if (body[row][col].display === CLEARED_MESSAGE) return true;
            }
        }
        return false;
}
