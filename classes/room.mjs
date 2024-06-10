import Thing from './thing.mjs'

export default class room extends Thing {
    // #region fields
    arryExits = [];
    arryContents = [];
    color = "grey";
    mapNode = "";
    // #endregion

    // // #region constructors
    constructor(id){
        super();
        this.id = id;
        this.arryContents;
        this.arryExits;
        this.mapNode = document.getElementById("room"+this.id);
    }
    //#endregion

    // #region methods

    addEntity(entity){
        this.arryContents.push(entity);
    }

    checkContentsFor(entity){
        return this.arryContents.indexOf(entity);
        
    }

    checkForCollisions(){
        
        // only worry about collisions with player so itd be player vs xyz
        // if contents contains player
            // player vs wumpus 
            // player vs bat
            // player vs pit
            // player vs arrows

            // if(this.arryContents[0]=player){console.log("yipyipyip");}
    }

    removeEntity(entity){
        // let indexOfEntity = this.ArryContents.indexOf(entity);
        let indexOfEntity = this.checkContentsFor(entity);
        this.arryContents.splice(indexOfEntity);
    }

    updateMapNodeColor(){
        try{this.mapNode.style.fill=this.color;} 
        catch(e) { console.log(e);}
    }

    displayExitsToConsole(){
        let returnValue = "Paths A - C:\n";
        this.arryExits.forEach(exit => {
            switch(typeof exit){
                case 'string':
                    returnValue += `\tString Value: ${exit} \n`;
                    break;
                case 'object':
                    returnValue += `\tRoom Object Ref: ${exit.id}\n`;
                    break;

            }
        });
        return returnValue;
    }

    

    // #endregion

}