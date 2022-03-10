const CLEARED_MESSAGE = "**CLEARED**";

export const bands =
    [
        {name: "The Doors", value: "Jim Morrison"},
        {name: "Black Sabbath", value: "Tony Iommi"},
        {name: "Pink Floyd", value: "David Gilmour"},
        {name: "Led Zeppelin", value: "Jimmy Page"},
        {name: "Nirvana", value: "Kurt Cobain"},
        {name: "Rush", value: "Geddy Lee"},
        {name: "The Rolling Stones", value: "Keith Richards"},
        {name: "The Beatles", value: "John Lennon"},
        {name: "Blondie", value: "Debbie Harry"},
        {name: "The Who", value: "Keith Moon"}
    ];

export const planets =
    [
        {name: "Mercury", value: "36.8 Million Miles"},
        {name: "Venus", value: "67.2  Million Miles"},
        {name: "Earth", value: "93  Million Miles"},
        {name: "Mars", value: "141.6  Million Miles"},
        {name: "Jupiter", value: "483.6  Million Miles"},
        {name: "Saturn", value: "886.5  Million Miles"},
        {name: "Uranus", value: "1,783.7  Million Miles"},
        {name: "Neptune", value: "2,795.2  Million Miles"},
        {name: "Pluto", value: "3,670.1  Million Miles"},
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
    for (let i = 0; i < (gridSize * gridSize / 2); i++) {
        let randomItem;
        if (gameType === 'bands') {
            randomItem = bands[Math.floor(Math.random() * bands.length)];
        } else if (gameType === 'planets') {
            randomItem = planets[Math.floor(Math.random() * planets.length)];
        } else if (gameType === 'books') {
            randomItem = books[Math.floor(Math.random() * books.length)];
        }

        let randomRow;
        let randomCol;
        let element;

        //find an available element for planet name
        do {
            randomRow = Math.floor(Math.random() * gridSize);
            randomCol = Math.floor(Math.random() * gridSize);
            element = body[randomRow][randomCol];
        } while (element.front !== "");

        console.log('found element for name: ' + element.key + ' row: ' + randomRow + ' col: ' + randomCol);
        element.front = randomItem.name;
        element.display = element.back;

        //find an available element for planet distance
        do {
            randomRow = Math.floor(Math.random() * gridSize);
            randomCol = Math.floor(Math.random() * gridSize);
            element = body[randomRow][randomCol];
        } while (element.front !== "");

        console.log('found element for value:' + element.key);
        element.front = randomItem.value;
        element.display = element.back;
    }
}

export function flipCardToFront(body, key, gridSize) {
    for (let row = 0; row < gridSize; row++)
         for (let col = 0; col < gridSize; col++) {
             if (body[row][col].key === key) {
                 body[row][col].display = body[row][col].front;
             }
         }
}

export function flipCardsBackOver(body, card1, val, gridSize) {
    for (let row = 0; row < gridSize; row++)
        for (let col = 0; col < gridSize; col++) {
            if ((body[row][col].key === card1.key) || (body[row][col].key === val.key)) {
                body[row][col].display = body[row][col].back;
            }
        }
}

export function markCardsAsCleared(body, card1, val, gridSize) {
    for (let row = 0; row < gridSize; row++)
        for (let col = 0; col < gridSize; col++) {
            if ((body[row][col].key === card1.key)||(body[row][col].key === val.key)) {
                body[row][col].display = CLEARED_MESSAGE;
            }
        }
}

export function checkForMatch(card1, val, gameType) {

    if (gameType === 'bands') {
        for (let j = 0; j < bands.length; j++) {
            if ((bands[j].name === card1.display || bands[j].name === val.display)&&
                (bands[j].value === card1.display || bands[j].value === val.display)) {
                return true;
            }
        }
    } else if (gameType === 'planets') {
        for (let j = 0; j < planets.length; j++) {
            if ((planets[j].name === card1.display || planets[j].name === val.display)&&
                (planets[j].value === card1.display || planets[j].value === val.display)) {
                return true;
            }
        }
    } else if (gameType === 'books') {
        for (let j = 0; j < books.length; j++) {
            if ((books[j].name === card1.display || books[j].name === val.display)&&
                (books[j].value === card1.display || books[j].value === val.display)) {
                return true;
            }
        }  
    }
    return false;
}

export function cardAlreadyCleared(body, val, gridSize) {
    for (let row = 0; row < gridSize; row++)
        for (let col = 0; col < gridSize; col++) {
            if (body[row][col].key === val.key) {
                if (body[row][col].display === CLEARED_MESSAGE) return true;
            }
        }
        return false;
}
