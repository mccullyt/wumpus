import Creature from './creature.mjs'

export default class Wumpus extends Creature{
    // #region fields
    color = "red";
    isStartled = false;
    // #endregion

    // // #region constructors
    constructor(){
        super();
        // this.NumCurrentRoom;
        this.isAlive = true
        
    }
    #endregion

    // #region Methods


    
    // randomPath(){
    //     let paths=[];
    //     let MIN;
    //     let MAX;
    //     let rndIndex
        
    //     paths = ['a','b','c'];
    //     MIN = 0;
    //     MAX = paths.length;
    //     rndIndex = Math.floor(Math.random() * (MAX - MIN))
    //     console.log(paths[rndIndex])
    //     console.log(rndIndex)
    //     console.log(this)
    //     this.move(paths[rndIndex]);
        
        
        
    // }

    // randomSpawn(){
    //     let spawnRooms=[];
    //     let MIN;
    //     let MAX;
    //     let rndIndex
        
    //     spawnRooms = [3,4,11,12,13,14,15,16,19];
    //     MIN = 0;
    //     MAX = spawnRooms.length;
        
    //     rndIndex = Math.floor(Math.random() * (MAX - MIN));
        
    //     console.log(spawnRooms[rndIndex])
    //     console.log(rndIndex)
    //     console.log(this)
        
    //     // this.NumCurrentRoom = spawnRooms[rndIndex];
    //     return spawnRooms[rndIndex];
        
        
    // }
    // #endregion
}