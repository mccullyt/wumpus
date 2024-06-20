import Thing from './thing.mjs'

export default class Creature extends Thing{
    // #region fields
    // #endregion

    // #region constructors
    constructor(currentRoom){
        super()
        this.isAlive;
        // this.NumTargetRoom;
        this.currentRoom;
        this.numCurrentRoom;
        
    }
    //#endregion

    // #region Methods
    
    listen(){}
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

    randomSpawn(){
        let spawnRooms=[];
        let MIN;
        let MAX;
        let rndIndex
        
        spawnRooms = [3,4,11,12,13,14,15,16,19];
        MIN = 0;
        MAX = spawnRooms.length;
        
        rndIndex = Math.floor(Math.random() * (MAX - MIN));
        
        console.log(spawnRooms[rndIndex])
        console.log(rndIndex)
        console.log(this)
        
        // this.NumCurrentRoom = spawnRooms[rndIndex];
        return spawnRooms[rndIndex];
        
        
    }
    // #endregion
}


