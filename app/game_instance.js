const fire = require('./ship_methods').fire;

exports.checkGameStatus = () => {
    return false;
}

exports.takeTurn = (opponent, guessFunction) => {
    const coordinates = guessFunction();
    fire(opponent, coordinates);

    const gameOver = this.checkGameStatus();
    return gameOver;
}