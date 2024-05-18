

let thing = require("./thing")

class Player extends Thing{
    // #region fields
    // static NumCurrentRoom = 10;
    // #endregion

    // #region constructors
    constructor(){
        // this.NumCurrentRoom;
        this.NumArrows = 10;
        this.IsAlive = true
        this.IsFireModeOn = false
    }
    //#endregion

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