import Thing from './thing.mjs'

export default class Creature extends Thing{
    // #region fields
    // #endregion

    // #region constructors
    constructor(){
        super()
        this.IsAlive;
        this.NumTargetRoom;
        
    }
    //#endregion

    // #region Methods
    move(numTargetRoom){}
    listen(){}
    // #endregion
}

const creature = new Creature();
console.log(creature.NumCurrentRoom);
