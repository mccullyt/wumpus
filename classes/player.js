

class Player{
    // #region fields
    static NumCurrentRoom = 10;
    // #endregion

    // #region constructors
    constructor(){
        this.NumCurrentRoom = 0;
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
    // #endregion
}

const player = new Player();
player.NumCurrentRoom = "b";
console.log(player.NumCurrentRoom);