import Player from '/classes/Player.mjs'
import GameMaster from '/classes/gameMaster.mjs'
import Room from '/classes/room.mjs'
import paths from './paths.json' with { type: 'json' };

const player = new Player();
// player.NumCurrentRoom = 22;
// console.log(player.NumCurrentRoom);

// #region Create Dummy Room
const room = [new Room(0)];
// endregion

// #region createRooms
// This for loop creates room with exit values derived from string values from paths.json.
for( var i = 1; i < 21; i++){
   let newRoom = new Room(i);
    newRoom.ArryExits.push(paths.room[i-1].pathA); //I subtract 1 to keep i aligned with num objects in paths.json
    newRoom.ArryExits.push(paths.room[i-1].pathB);
    newRoom.ArryExits.push(paths.room[i-1].pathC);
    room.push(newRoom);
}
// #endregion

// #region ReplaceRoomStringsWithRefs
// This for loop takes the exit string values derived from the json file and replaces them with pointers to rooms in the room array.
// I start at 1 because room[0] is a dummy room.

for(var i = 1; i < 21; i++){
    let isDebug = false;
    let pathA;
    let pathB;
    let pathC;
    let element = room[i];
    let debugLog="";

        
    debugLog+=`Room: ${element.NumCurrentRoom}\n`;
                
    debugLog+="Deriving string values to be converted into references\n";
    
    pathA = element.ArryExits[0];
    pathB = element.ArryExits[1];
    pathC = element.ArryExits[2];
    
    debugLog+=`\t${element.displayExitsToConsole()}\n`
            
    debugLog+="Assigning Room Object Refs \n"

    element.ArryExits[0] = room[pathA];
    element.ArryExits[1] = room[pathB];
    element.ArryExits[2] = room[pathC];
        
    debugLog+=`\t${element.displayExitsToConsole()}\n`
            
    switch(isDebug){    
        case true:
            console.log(debugLog);
            console.log(element);
            break;
    }
}
// #endregion







// #region ColorAllRooms
// Each room in the svg has an id of room##. This for loop replaces the ## with i. 
for(var i = 1; i <21; i++){
    let mapObject = document.getElementById("layer1");
    let svgRooms = mapObject.getElementsByTagName('path');
    let isDebug = false;

    let testRoom = document.getElementById("room"+i);

    testRoom.style.fill="grey";
    
    switch(isDebug){
        case true:
            console.log(`Room: ${i}`);
            console.log(testRoom);
            break;
    }
    
}
// #endregion


// #region checkRoomForPlayer
// Below should check all the ArryContents each room for the entity until the entity is found and then return the index of the room where the entity was found.

room[10].addEntity(player);
console.log(room[10]);
updateRoomColor(player);

function checkRoomsFor(entity){
    let isDebug = false;
    let debugLog = "";
    let index = 0;
    
    for(var i = 1; i < 21; i++){
        let currentRoom = room[i];
        debugLog = `Searching for above entity in room: ${i}.\n`
        
        switch(currentRoom.ArryContents.indexOf(entity)){
            case -1:
                debugLog += `\tEntity not found in room ${i}\n`;
                break;
            default:
                debugLog+=`Entity found in room ${i}.`;
                // return true;
                index = i
                break;
        }

        switch(isDebug){
            case true:
                console.log(entity);
                console.log(debugLog)
        }
    }
    return index;
}





// #endregion



// #region updateRoomColor()
// This function is supposed to change the color of a room based on if the player is in it
function updateRoomColor(){
    let index = checkRoomsFor(player);
    let targetRoom = document.getElementById("room"+index);
    targetRoom.style.fill = "skyblue";
}
// #endregion

// console.log(mapObject);

// console.log(svgRooms);



