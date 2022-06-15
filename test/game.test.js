const expect = require('chai').expect;

describe('GAME INSTANCE METHODS', () => {
    describe('checkGameStatus', () => {
        it('Should tell me when the game is over', () => {
            const checkGameStatus = require('../app/game_instance').checkGameStatus;

            let players = [
                {
                    ships: [
                        {
                            locations: [[0,0]],
                            damage: [[0,0]]
                        }
                    ]
                }
            ];

            const actual = checkGameStatus(players);
            expect(actual).to.be.false;
        });
    });

    describe('takeTurn', () => {
        const takeTurn = require('../app/game_instance').takeTurn;
        let guess, player;

        beforeEach(() => {
            guess = () => [0,0]; /* we don't know how the user will enter his guesses, so we just pretend we know it */
            player = {
                ships: [
                    {
                        locations: [[0,0]],
                        damage: []
                    }
                ]
            }
        });

        it('Should return false if the game ends', () => {
            // the game is over if the opponent guesses the last ship location
            const actual = takeTurn(player, guess);
            expect(actual).to.be.false;
        });
    });

    // saveGame
    function saveGame(callback) {
        setTimeout(() => {
            callback();
        }, 1000);
    }

    describe('saveGame', function() {
        it('Should update game status', function(done) {
            let status = 'Game not saved.';

            saveGame(() => {
                status = 'Game saved.';
                expect(status).to.equal('Game saved.');
                done();
            });
        })
    })
});