

export default class Thing{
    // #region fields
    

    // #endregion

    // #region constructors
    constructor(){
        // this.NumCurrentRoom;
        this.trunSpawn;
        this.color;
        this.currentRoom;
        this.numCurrentRoom;
        this.isHidden;
    }
    //#endregion

    // #region Methods
    
    convertPathToIndex(path){
        let index = 
            path == ('a' || 'A') ? 0
            : path == ('b' || 'B')? 1
            : path == ('c' || 'C')? 2
            : -1;
        return index;
    }
    
    getClassName() {
        return this.constructor.name;
    }
    
    pushEntityThroughPath(entity,path,rooms){
        path = this.convertPathToIndex(path);
        let currentRoom = entity.currentRoom;
        let nextRoom = currentRoom.arryExits[path];
        let color = entity.color;
        switch (entity.getClassName()) {
            case 'Player':
                currentRoom.color=currentRoom.emptyColor;
                nextRoom.color=entity.color;
                break;
        
            case 'Arrow':
                // nextRoom = player.currentRoom.arryExits[path];
                // nextRoom.addEntity(entity);
                break;
            case 'Wumpus':
                
                currentRoom.color=currentRoom.emptyColor;
                console.log(color);
                nextRoom.color=color
                break;
        }

        entity.currentRoom = nextRoom;
        nextRoom.addEntity(entity);        
        currentRoom.removeEntity(entity);
    }

    move(path){
        this.pushEntityThroughPath(this,path)
    }

    randomPath(){
        let paths=[];
        let MIN;
        let MAX;
        let rndIndex
        
        paths = ['a','b','c'];
        MIN = 0;
        MAX = paths.length;
        rndIndex = Math.floor(Math.random() * (MAX - MIN))
        this.move(paths[rndIndex]);
    }

   
    // #endregion
}
