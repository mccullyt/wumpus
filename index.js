import Arrow from '/classes/arrow.mjs'
import Player from '/classes/player.mjs'
import Pit from '/classes/pit.mjs'
import GameMaster from '/classes/gameMaster.mjs'
import Room from '/classes/room.mjs'
import Wumpus from '/classes/wumpus.mjs'
import paths from './paths.json' with { type: 'json' };
import room from './classes/room.mjs'


// #region intial setup
const player = new Player();
const rooms = [new Room(0)];    //dummy room is created because the json paths file starts at 1 instead of 0. This should keep me from having to -1 from a lot of stuff.
const wumpus = new Wumpus()
let turns = 0;
createRooms();
replaceRoomStringsWithRefs();
createMenu();
player.currentRoom = rooms[1];
rooms[1].addEntity(player);
rooms[1].color =player.color;

let wumpusSpawnRoom = wumpus.randomSpawn();
wumpus.currentRoom = rooms[wumpusSpawnRoom];
rooms[wumpusSpawnRoom].addEntity(wumpus);
rooms[wumpusSpawnRoom].color = wumpus.color;


colorAllRooms();
updatePathButtons();
updateStats();

// #endregion




// #region menu functions

function createMenu(){
    var menuItem1 = document.getElementById("menu-item-1");
    var menuItem2 = document.getElementById("menu-item-2");
    var menuItem3 = document.getElementById("menu-item-3");
    var menuItem4 = document.getElementById("menu-item-4");
    var menuItem5 = document.getElementById("menu-item-5");
    var menuItem6 = document.getElementById("menu-item-6");
    var menuItem7 = document.getElementById("menu-item-7");
    
    menuItem1.addEventListener("click", function () {
        updateGame('a');
    });
    
    menuItem2.addEventListener("click", function () {
        updateGame('b');
    
    });
    
    menuItem3.addEventListener("click", function () {
        updateGame('c');
    
    });
    
    menuItem5.addEventListener("click", function () {displayPlayersRoom();});
    
    menuItem4.addEventListener("click",function () {
        player.toggleFireMode();
        menuItem4.innerHTML="Fire Mode: "+player.isFireModeOn;
    })

    menuItem7.addEventListener("click", function () {
        rooms.forEach(room => {
            console.log(room);
        });});
}
function updatePathButtons(){
    let pathA = document.getElementById('menu-item-1');
    let pathB = document.getElementById('menu-item-2');
    let pathC = document.getElementById('menu-item-3');
    pathA.innerHTML=player.currentRoom.arryExits[0].id;
    pathB.innerHTML=player.currentRoom.arryExits[1].id;
    pathC.innerHTML=player.currentRoom.arryExits[2].id;
}

function updateStats(){
    let arrows = document.getElementById('item-1');
    let alive = document.getElementById('item-2');
    let turn = document.getElementById('item-3');
    arrows.innerHTML=`Arrows: ${player.numArrows}`;
    alive.innerHTML=`Alive: ${player.isAlive}`;
    turn.innerHTML=`Turn: ${turns}`;
    
}

// #endregion

//#region room functions
function createRooms(){
    // This for loop creates room with exit values derived from string values from paths.json.
    for( var i = 1; i < 21; i++){
        let newRoom = new Room(i);
         newRoom.arryExits.push(paths.room[i-1].pathA); //I subtract 1 to keep i aligned with num objects in paths.json
         newRoom.arryExits.push(paths.room[i-1].pathB);
         newRoom.arryExits.push(paths.room[i-1].pathC);
         rooms.push(newRoom);
     }
}

function displayPlayersRoom(){
    console.log(player.currentRoom);
}

function convertPathToIndex(path){
    let index = 
        path == ('a' || 'A') ? 0
        : path == ('b' || 'B')? 1
        : path == ('c' || 'C')? 2
        : -1;
    return index;
}


function pushEntityThroughPath(entity,path){
    path = convertPathToIndex(path);
    let currentRoom;
    let nextRoom

    switch (entity.getClassName()) {
        case 'Player':
            currentRoom = entity.currentRoom;
            nextRoom = currentRoom.arryExits[path];
            currentRoom.color=currentRoom.emptyColor;
            // nextRoom.color=player.color;
            entity.currentRoom = nextRoom;
            nextRoom.addEntity(entity);        
            currentRoom.removeEntity(entity);
            break;
    
        case 'Arrow':
            nextRoom = player.currentRoom.arryExits[path];
            nextRoom.addEntity(entity);
            break;
        case 'Wumpus':
            break;
    }
    
    colorAllRooms();
    updatePathButtons();
    // nextRoom.checkForCollisions();
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
        
        pathA = element.arryExits[0];
        pathB = element.arryExits[1];
        pathC = element.arryExits[2];
        
        debugLog+=`\t${element.displayExitsToConsole()}\n`
                
        debugLog+="Assigning Room Object Refs \n"
    
        element.arryExits[0] = rooms[pathA];
        element.arryExits[1] = rooms[pathB];
        element.arryExits[2] = rooms[pathC];
            
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
    rooms.forEach(room => {
        if(room.checkContentsForType('Wumpus')!=false){room.color = wumpus.color;}
        else if(room.checkContentsForType('Player')!=false){room.color = player.color;}
        else{room.color='grey';}
    });
    rooms.forEach((room) => room.updateMapNodeColor());   
}


function checkForArrowCollision(room){
    let roomHasArrow = room.checkContentsForType('Arrow');
    let arrowObject = room.arryContents[room.getIndexOfType('Arrow')]
    let isArrowLethal;
    if(roomHasArrow){isArrowLethal = arrowObject.lethal == true && arrowObject.turnSpawn == turns;}

    let roomHasWumpus = room.checkContentsForType('Wumpus');
    let roomHasPlayer = room.checkContentsForType('Player');
    
    if(roomHasArrow){
        if(isArrowLethal && roomHasPlayer){player.isAlive=false; room.removeEntity(arrowObject);}    
        else if (isArrowLethal && roomHasWumpus){wumpus.isAlive = false; room.removeEntity(wumpus); room.removeEntity(arrowObject);}
        else if (roomHasPlayer){player.numArrows++; room.removeEntity(arrowObject);}
    }  
    // if(roomHasWumpus){
    //     if(isArrowLethal){room.removeEntity(wumpus); room.removeEntity(arrowObject);}
    // }
    // if(roomHasArrow && isArrowLethal){player.isAlive=false; room.removeEntity(arrowObject)}
    



}

function checkForWumpusCollision(room){
    let roomHasWumpus = room.checkContentsForType('Wumpus');
    let wumpusObject = room.arryContents[room.getIndexOfType('Wumpus')];
    if(roomHasWumpus){player.isAlive=false;}
}

function checkForPits(room){
    let isPitNearby = false;
    room.arryExits.forEach(exit => {
        if(exit.checkContentsForType('Pit')){isPitNearby=true;}
    });
    return isPitNearby;
}

// Below should check all the arryContents each room for the entity until the entity is found and then return the index of the room where the entity was found.
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


// #region Other Functions
function checkForArrowCollisions(){
    checkForArrowCollision(player.currentRoom);
    player.currentRoom.arryExits.forEach(room => {
        checkForArrowCollision(room);
    });
}

function updateGame(path){
    let currentRoom = player.currentRoom;
    if(!player.isFireModeOn && player.isAlive){player.move(path);}
    else{
        let arrow = new Arrow(currentRoom); 
        arrow.turnSpawn=turns; 
        player.fireArrow(path,arrow);
        currentRoom.removeEntity(arrow); arrow = 0; 
    }

    checkForArrowCollisions();
    checkForWumpusCollision(player.currentRoom);
    if(wumpus.isAlive){wumpus.randomPath();}
    updateStats();
    updatePathButtons();
    colorAllRooms();
    turns++;
}
// #endregion



