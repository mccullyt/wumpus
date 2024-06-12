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

    getContentsIndexOf(entity){
        return this.arryContents.indexOf(entity);
        
    }

    getIndexOfType(className){
        for (let index = 0; index < this.arryContents.length; index++) {
            const entity = this.arryContents[index];
            if(entity.getClassName()==className){return index;}
        }
        return -1;
    }

    checkContentsFor(entity){
        let entityFound = (this.arryContents.indexOf(entity) != -1);
        return entityFound;
    }

    checkContentsForType(className){
        let typeFound = (this.getIndexOfType(className) != -1);
        return typeFound;
    }
    

    checkForCollision(entityA,entityB){
        let collisionFound = false;
        collisionFound = this.checkContentsFor(entityA) && this.checkContentsFor(entityB);
        return collisionFound;
    }

    removeEntity(entity){
        // let indexOfEntity = this.ArryContents.indexOf(entity);
        let indexOfEntity = this.getContentsIndexOf(entity);
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