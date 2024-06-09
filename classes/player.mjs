

// import Thing from './thing.mjs'
import Creature from './creature.mjs'

export default class Player extends Creature{
    // #region fields
    // static NumCurrentRoom = 10;
    // #endregion

    // // #region constructors
    constructor(){
        super();
        this.currentRoom;
        this.numCurrentRoom;
        this.numArrows = 10;
        this.isAlive = true
        this.isFireModeOn = false
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
