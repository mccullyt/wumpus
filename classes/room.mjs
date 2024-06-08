import Thing from './thing.mjs'

export default class room extends Thing {
    // #region fields
    ArryExits = [];
    ArryContents = [];
    Color = "grey";
    mapNode = "";
    // #endregion

    // // #region constructors
    constructor(id){
        super();
        this.id = id;
        this.ArryContents;
        this.ArryExits;
        this.mapNode = document.getElementById("room"+this.id);
    }
    //#endregion

    // #region methods

    addEntity(entity){
        this.ArryContents.push(entity);
    }

    checkContentsFor(entity){
        return this.ArryContents.indexOf(entity);
        
    }

    removeEntity(entity){
        // let indexOfEntity = this.ArryContents.indexOf(entity);
        let indexOfEntity = this.checkContentsFor(entity);
        this.ArryContents.splice(indexOfEntity);
    }

    updateMapNodeColor(){
        try{this.mapNode.style.fill=this.Color;} 
        catch(e) { console.log(e);}
    }

    displayExitsToConsole(){
        let returnValue = "Paths A - C:\n";
        this.ArryExits.forEach(exit => {
            switch(typeof exit){
                case 'string':
                    returnValue += `\tString Value: ${exit} \n`;
                    break;
                case 'object':
                    returnValue += `\tRoom Object Ref: ${exit.id}\n`;
                    break;

            }
            // returnValue += exit.id + " ";
        });
        return returnValue
    }

    // #endregion

}