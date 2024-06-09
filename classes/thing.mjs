

export default class Thing{
    // #region fields
    static id = 100;

    // #endregion

    // #region constructors
    constructor(){
        // this.NumCurrentRoom;
        this.NumCurrentRoom;
    }
    //#endregion

    // #region Methods
    getClassName() {
        return this.constructor.name;
    }
    // #endregion
}
