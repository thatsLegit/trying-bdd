const expect = require('chai').expect;

// test suite
// pure function
describe('checkForShip', () => {
    const checkForShip = require('../app/ship_methods').checkForShip;
    let player;

    // runs before any spec and setup the states we need
    before(() => {
        player = {
            ships: [
                {
                    locations: [[2,2]] //ship of length 1 I guess
                },
                {
                    locations: [[0,0], [0,1]]
                },
                {
                    locations: [[1,0], [1,1]]
                }
            ]
        }
    });

    //test spec
    it("Should correctly report no ship at a given player's coordinate", () => {
        expect(checkForShip(player, [9,9])).to.be.false;
    });

    it("Should correctly report a ship located at a given player's coordinate", () => {
        expect(checkForShip(player, [2,2])).to.deep.equal(player.ships[0]);
    });

    it("Should handle ship located at more than one coordinate", () => {
        expect(checkForShip(player, [0,0])).to.deep.equal(player.ships[1]);
        expect(checkForShip(player, [0,1])).to.deep.equal(player.ships[1]);
        expect(checkForShip(player, [9,9])).to.be.false;
    });

    it("Should handle checking multiple ships", () => {
        expect(checkForShip(player, [2,2])).to.deep.equal(player.ships[0]);
        expect(checkForShip(player, [0,0])).to.deep.equal(player.ships[1]);
        expect(checkForShip(player, [0,1])).to.deep.equal(player.ships[1]);
        expect(checkForShip(player, [1,0])).to.deep.equal(player.ships[2]);
        expect(checkForShip(player, [1,1])).to.deep.equal(player.ships[2]);
        expect(checkForShip(player, [9,9])).to.be.false;
    });
});

//side effects
describe('damageShip', () => {
    const damageShip = require('../app/ship_methods').damageShip;

    it('Should register damage on a given ship on a given location', () => {
        const ship = {
            locations: [[0,0]],
            damage: []
        };

        damageShip(ship, [0,0]);

        expect(ship.damage).to.not.be.empty;
        expect(ship.damage[0]).to.deep.equal([0,0]);
    });
});

//side effects
describe('fire', () => {
    const fire = require('../app/ship_methods').fire;
    let player;

    // the state is reset to initial value before each spec run
    beforeEach(() => {
        player = {
            ships: [
                {
                    locations: [[0,0]],
                    damage: []
                }
            ]
        }
    });

    it('Should NOT record damage on miss', () => {
        fire(player, [9,9]);
        expect(player.ships[0].damage).to.be.empty;
    });

    it("Should record damage on a successful shot", () => {
        fire(player, [0,0]);
        expect(player.ships[0].damage[0]).to.deep.equal([0,0]);
    });
});