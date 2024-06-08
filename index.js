import Player from '/classes/Player.mjs'
import GameMaster from '/classes/gameMaster.mjs'
import Room from '/classes/room.mjs'
import paths from './paths.json' with { type: 'json' };


// #region intial setup
const player = new Player();
const rooms = [new Room(0)];    //dummy room is created because the json paths file starts at 1 instead of 0. This should keep me from having to -1 from a lot of stuff.
createRooms();
replaceRoomStringsWithRefs();
createMenu();
player.CurrentRoom = rooms[10];

// #endregion





// #region menu functions

function createMenu(){
    var menuItem1 = document.getElementById("menu-item-1");
    var menuItem2 = document.getElementById("menu-item-2");
    var menuItem3 = document.getElementById("menu-item-3");
    var menuItem4 = document.getElementById("menu-item-4");
    var menuItem5 = document.getElementById("menu-item-5");
    var menuItem6 = document.getElementById("menu-item-6");
    menuItem1.addEventListener("click", function () {
        pushEntityThroughPath(player,'a');
    
    });
    menuItem2.addEventListener("click", function () {
        pushEntityThroughPath(player,'b');
    
    });
    menuItem3.addEventListener("click", function () {
        pushEntityThroughPath(player,'c');
    
    });
    
    menuItem5.addEventListener("click", function () {displayPlayersRoom();});
}
function updatePathButtons(){
    let pathA = document.getElementById('menu-item-1');
    let pathB = document.getElementById('menu-item-2');
    let pathC = document.getElementById('menu-item-3');
    pathA.innerHTML=player.CurrentRoom.ArryExits[0].id;
    pathB.innerHTML=player.CurrentRoom.ArryExits[1].id;
    pathC.innerHTML=player.CurrentRoom.ArryExits[2].id;
}

// #endregion

//#region room functions
function createRooms(){
    // This for loop creates room with exit values derived from string values from paths.json.
    for( var i = 1; i < 21; i++){
        let newRoom = new Room(i);
         newRoom.ArryExits.push(paths.room[i-1].pathA); //I subtract 1 to keep i aligned with num objects in paths.json
         newRoom.ArryExits.push(paths.room[i-1].pathB);
         newRoom.ArryExits.push(paths.room[i-1].pathC);
         rooms.push(newRoom);
     }
}

function displayPlayersRoom(){
    console.log(player.CurrentRoom);
}

function convertPathToIndex(path){
    let index = 
        path == ('a' || 'A') ? 0
        : path == ('b' || 'B')? 1
        : path == ('c' || 'C')? 2
        : -1;
    return index;
}

// TODO: Make this function work for all entities instead of just the player.
function pushEntityThroughPath(entity,path){
    console.log(path);
    path = convertPathToIndex(path);
    console.log(path);
    let currentRoom = entity.CurrentRoom;
    let NextRoom=currentRoom.ArryExits[path];
    NextRoom.addEntity(entity);
    currentRoom.removeEntity(entity);
    currentRoom.Color="grey"
    NextRoom.Color="skyblue"
    entity.CurrentRoom=NextRoom;
    colorAllRooms();
    updatePathButtons();
}
function replaceRoomStringsWithRefs(){
    // This for loop takes the exit string values derived from the json file and replaces them with pointers to rooms in the room array.
    // I start at 1 because room[0] is a dummy room.
    for(var i = 1; i < 21; i++){
        let isDebug = false;
        let pathA;
        let pathB;
        let pathC;
        let element = rooms[i];
        let debugLog="";
    
            
        debugLog+=`Room: ${element.id}\n`;
                    
        debugLog+="Deriving string values to be converted into references\n";
        
        pathA = element.ArryExits[0];
        pathB = element.ArryExits[1];
        pathC = element.ArryExits[2];
        
        debugLog+=`\t${element.displayExitsToConsole()}\n`
                
        debugLog+="Assigning Room Object Refs \n"
    
        element.ArryExits[0] = rooms[pathA];
        element.ArryExits[1] = rooms[pathB];
        element.ArryExits[2] = rooms[pathC];
            
        debugLog+=`\t${element.displayExitsToConsole()}\n`
                
        switch(isDebug){    
            case true:
                console.log(debugLog);
                console.log(element);
                break;
        }
    }
}

function colorAllRooms(){
    rooms.forEach((room) => room.updateMapNodeColor());   
}

// Below should check all the ArryContents each room for the entity until the entity is found and then return the index of the room where the entity was found.
function checkRoomsFor(entity){
    let isDebug = false;
    let debugLog = "";
    let index = 0;
    
    for(var i = 1; i < 21; i++){
        let currentRoom = rooms[i];
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



