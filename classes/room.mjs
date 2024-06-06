import Thing from './thing.mjs'

export default class room extends Thing {
    // #region fields
    ArryExits = [];
    ArryContents = [];
    // #endregion

    // // #region constructors
    constructor(numCurrentRoom){
        super();
        this.NumCurrentRoom = numCurrentRoom;
        this.ArryContents;
        this.ArryExits;
    }
    //#endregion

    // #region methods

    addEntity(entity){
        this.ArryContents.push(entity);
    }
    removeEntity(entity){
        let index = this.ArryContents.indexOf(entity);
        this.ArryContents.splice(index);
    }

    displayExitsToConsole(){
        let returnValue = "Paths A - C:\n";
        this.ArryExits.forEach(exit => {
            switch(typeof exit){
                case 'string':
                    returnValue += `\tString Value: ${exit} \n`;
                    break;
                case 'object':
                    returnValue += `\tRoom Object Ref: ${exit.NumCurrentRoom}\n`;
                    break;

            }
            // returnValue += exit.NumCurrentRoom + " ";
        });
        return returnValue
    }

    // #endregion

}