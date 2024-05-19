import Thing from './thing.mjs'

export default class room extends Thing {
    // #region fields
    ArryExits = [];
    // #endregion

    // // #region constructors
    constructor(numCurrentRoom){
        super();
        this.NumCurrentRoom = numCurrentRoom;
        this.ArryContents;
        this.ArryExits;
    }
    #endregion

}