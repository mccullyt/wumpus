

// import Thing from './thing.mjs'
import Creature from './creature.mjs'

export default class Player extends Creature{
    // #region fields
    // static NumCurrentRoom = 10;
    // #endregion

    // // #region constructors
    constructor(){
        super();
        // this.NumCurrentRoom;
        this.NumArrows = 10;
        this.IsAlive = true
        this.IsFireModeOn = false
    }
    #endregion

    // #region Methods
    fireArrow(){}
    move(){}
    spawn(){}
    listen(){}
    toggleFireMode(){}
    // #endregion
}

const player = new Player();
// player.NumCurrentRoom = "b";
console.log(player.NumCurrentRoom);