exports.checkForShip = (player, coordinates) => {

    for (let i = 0; i<player.ships.length; i++) {
        const ship = player.ships[i];

        const presentShip = ship.locations.filter(c => c[0] === coordinates[0] && c[1] === coordinates[1])[0];
        if(presentShip) return ship;
    }

    return false;

}

exports.damageShip = (ship, coordinates) => {
    ship.damage.push(coordinates);
}

exports.fire = (target, coordinates) => {
    const ship = this.checkForShip(target, coordinates);
    if(ship) this.damageShip(ship, coordinates);
}