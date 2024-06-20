

// import Thing from './thing.mjs'
import Creature from './creature.mjs'

export default class Player extends Creature{
    // #region fields
    // static NumCurrentRoom = 10;
    numArrows = 0;
    color="skyblue"
    // #endregion

    // // #region constructors
    constructor(){
        super();
        this.numArrows = 10;
        this.isAlive = true
        this.isFireModeOn = false
    }
    #endregion

    // #region Methods
    fireArrow(path, arrow){
        if(this.numArrows>0){
            arrow.move(path);
            this.numArrows--;
        }
        
    }
    spawn(){}
    listen(){}
    toggleFireMode(){
        this.isFireModeOn = !this.isFireModeOn;
    }
    // #endregion
}
