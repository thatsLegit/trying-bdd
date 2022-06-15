const expect = require('chai').expect;

describe('PLAYER_METHODS', () => {
    describe('validateLocations', () => {
        const validateLocations = require('../app/player_methods').validateLocations;
        let player;

        beforeEach(() => {
            player = {
                ships: [
                    {
                        locations: [[9,9]]
                    }
                ]
            }
        });

        it('Should confirm valid for unoccupied locations IN range', () => {
            const locations = [[1,1],[1,2],[1,3],[1,4]];
            expect(validateLocations(player, locations)).to.be.ok;
        });

        it('Should confirm INvalid for occupied locations IN of range', () => {
            const locations = [[9,9]];
            expect(validateLocations(player, locations)).to.be.false;
        });

        it('Should confirm INvalid for UNoccupied locations OUT of range', () => {
            const locationHigh = [[10,10]];
            const locationLow = [[-1,-1]];

            expect(validateLocations(player, locationHigh)).to.be.false;
            expect(validateLocations(player, locationLow)).to.be.false;
        });
    });

    describe('placeShip', () => {
        const placeShip = require('../app/player_methods').placeShip;
        let player;

        beforeEach(() => {
            player = {
                ships: [
                    {
                        size: 1,
                        locations: []
                    },
                    {
                        size: 2,
                        locations: [[1,0],[1,1]]
                    }
                ]
            }
        });

        it('Should update a ship with a valid starting location', () => {
            const ship = player.ships[0];
            const coordinates = [0,1];

            placeShip(player, ship, coordinates, 'horizontal');
            const actual = ship.locations;

            expect(actual).to.be.ok;
            expect(actual).to.have.length(1);
            expect(actual[0]).to.deep.equal([0,1]);
        });

        it('Should throw an error if no direction is specified', () => {
            const ship = player.ships[0];
            const coordinates = [0,1];

            const handler = () => placeShip(player, ship, coordinates);
            expect(handler).to.throw(Error);
            expect(handler).to.throw('Direction is missing.');
        });
    });
});

describe('COMPUTER_METHODS', () => {
    describe('computerFire', () => {
        const {computerFire, generateRandomCoordinates} = require('../app/player_methods');
        let player;

        beforeEach(() => {
            player = {
                ships: [
                    {
                        locations: [[9,9]],
                        damage: []
                    }
                ]
            }
        });

        it('Should aim at a random location', () => {
            let ship = player.ships[0];
            const coordinates = [9,9];

            computerFire(player, coordinates);
            expect(ship.damage[0]).to.deep.equal([9,9]);
            // the way computerFire is written right now is not really testable since it's unpredictable.
        });
    });
});