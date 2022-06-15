const {fire,checkForShip} = require('./ship_methods');

// regular player methods
exports.validateLocation = (player, locations) => {
    const x = locations[0];
    const y = locations[1];

    const available = !!checkForShip(player, locations); /* not occupied means false */

    if((x >= 0 && x <= 9) && (y >= 0 && y <= 9) && !available) return true;
    return false;
};

exports.validateLocations = (player, locations) => {
    for (const loc of locations) {
        const valid = this.validateLocation(player, loc);
        if(!valid) return false;
    }
    return true;
};

exports.placeShip = (player, ship, coordinates, direction) => {
    if(!direction) throw new Error('Direction is missing.');

    let proposedLocations = [];
    let rowNumber = coordinates[0];
    let colNumber = coordinates[1];

    for (let i=0; i<ship.size; i++) {
        proposedLocations.push([rowNumber, colNumber]);
        direction == 'horizontal' ? colNumber++ : rowNumber++;
    }

    const isOk = this.validateLocations(player, proposedLocations);

    if(isOk) {
        ship.locations = proposedLocations;
        return true;
    }

    return false;
};

exports.generateRandomCoordinates = () => {
    const x = Math.floor(Math.random() * 9);
    const y = Math.floor(Math.random() * 9);
    return [x,y];
}

exports.generateRandomDirection = () => {
    return Math.random() > 0.5 ? 'horizontal' : 'vertical';
}

// computer methods
exports.computerFire = (player, coordinates=null) => {
    coordinates = !coordinates ? this.generateRandomCoordinates() : coordinates;
    fire(player, coordinates);
}

exports.computerPlaceShip = (player, ship, coordinates=null, direction=null) => {
    direction = !direction ? this.generateRandomDirection() : direction;
    coordinates = !coordinates ? this.generateRandomCoordinates() : coordinates;
    this.placeShip(player, ship, coordinates, direction);
}