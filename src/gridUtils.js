//export const gridSize = 4;
const CLEARED_MESSAGE = "**CLEARED**";

export const planets =
    [
        {name: "Mercury", distance: "36.8"},
        {name: "Venus", distance: "67.2"},
        {name: "Earth", distance: "93"},
        {name: "Mars", distance: "141.6"},
        {name: "Jupiter", distance: "483.6"},
        {name: "Saturn", distance: "886.5"},
        {name: "Uranus", distance: "1,783.7"},
        {name: "Neptune", distance: "2,795.2"},
        {name: "Pluto", distance: "3,670.1"},
    ];

export function populateGrid(body, gridSize) {

    //if (body === undefined) {
    //    console.log('need to create body');
    //}

    //need to place arrayWidth * arrayHeight / 2 pairs in the  grid
    for (var i = 0; i < (gridSize * gridSize / 2); i++) {

        var randomPlanet = planets[Math.floor(Math.random() * planets.length)];
        console.log("picking random planet: " + randomPlanet.name + ' distance: ' + randomPlanet.distance);

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
        element.front = randomPlanet.name;
        element.display = element.back;

        //find an available element for planet distance
        do {
            randomRow = Math.floor(Math.random() * gridSize);
            randomCol = Math.floor(Math.random() * gridSize);
            element = body[randomRow][randomCol];
        } while (element.front != "");

        console.log('found element for distance:' + element.key);
        element.front = randomPlanet.distance;
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

export function checkForMatch(card1, val) {
    for (var j = 0; j < planets.length; j++) {
        if ((planets[j].name == card1.display || planets[j].name == val.display)&&
            (planets[j].distance == card1.display || planets[j].distance == val.display)) {
            return true;
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
