import Arrow from '/classes/arrow.mjs'
import Bat from '/classes/bat.mjs'
import Player from '/classes/player.mjs'
import Pit from '/classes/pit.mjs'
import GameMaster from '/classes/gameMaster.mjs'
import Room from '/classes/room.mjs'
import Wumpus from '/classes/wumpus.mjs'
import paths from './paths.json' with { type: 'json' };



// #region intial setup
const player = new Player();
const rooms = [new Room(0)];    //dummy room is created because the json paths file starts at 1 instead of 0. This should keep me from having to -1 from a lot of stuff.
const wumpus = new Wumpus();
const wumpusSpawnRooms = [3,4,11,12,13,14,15,16,19];
const pitA = new Pit();
const pitB = new Pit();
const batA = new Bat();
const batB = new Bat();
let turns = 0;
let illicitRooms = [0,1,2,5,8];
createRooms();
replaceRoomStringsWithRefs();
createMenu();

console.log();

player.currentRoom = rooms[1];
rooms[1].addEntity(player);

setupHazards();
colorAllRooms();
updatePathButtons();
updateStats();
checkForHazards();

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
    
    menuItem4.addEventListener("click",function () {
        player.toggleFireMode();
        menuItem4.innerHTML="Fire Mode: "+player.isFireModeOn;
    })

    menuItem5.addEventListener("click", function () {displayPlayersRoom();});
    
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
        else if(room.checkContentsForType('Bat')!=false){room.color = batA.color;}
        else if(room.checkContentsForType('Pit')!=false){room.color = pitA.color;}
        else{room.emptyColor;}
    });
    rooms.forEach((room) => room.updateMapNodeColor());   
}




function checkNearRoomsFor(entityType){
    let isEntityNear = false;
    let nearRooms = player.currentRoom.arryExits;
    nearRooms.forEach(room => {
        if(room.checkContentsForType(entityType)){isEntityNear=true;}
    });
    return isEntityNear;
}


function getRndRoom(){
    let MIN = 0;
    let MAX = 20;
    let rndIndex;
    rndIndex = Math.floor(Math.random() * (MAX - MIN));
    return rndIndex;
}

function getRndRoomFrom(arryRooms){
    let spawnRooms = arryRooms;
    let MIN;
    let MAX;
    let rndIndex;
    
    MIN = 0;
    MAX = spawnRooms.length;
    
    rndIndex = Math.floor(Math.random() * (MAX - MIN));
    
    console.log(spawnRooms[rndIndex])
    console.log(rndIndex)
    console.log(this)
    return spawnRooms[rndIndex];
}

function getRndRoomExcept(illicitRooms){
    console.log("rooms:");
    console.log(rooms);
    let licitRooms = [];
    let MIN;
    let MAX;
    let rndIndex;
    let isIllicit = function (room){
        for (let index = 0; index < illicitRooms.length; index++) {
            const illicitRoom = illicitRooms[index];
            if (illicitRoom == room){return true};
            
        }
        return false;    
    }

    rooms.forEach(room => {
        if(!isIllicit(room.id)){licitRooms.push(room.id);}
    });

    MIN = 0;
    MAX = licitRooms.length;    
    rndIndex = Math.floor(Math.random() * (MAX - MIN));
    
    console.log(licitRooms[rndIndex])
    console.log(rndIndex)
    console.log(this)
    return licitRooms[rndIndex];
}

// #endregion

//#region collision Functions

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
        else if (isArrowLethal){wumpus.isStartled = true;};
    }  
    
}

function checkForArrowCollisions(){
    checkForArrowCollision(player.currentRoom);
    player.currentRoom.arryExits.forEach(room => {
        checkForArrowCollision(room);
    });
}

function checkForBatCollision(room){
    let roomHasBat = room.checkContentsForType('Bat');
    let roomHasPlayer = room.checkContentsForType('Player');
    let bat = room.arryContents[room.getIndexOfType('Bat')];
    if(roomHasBat && roomHasPlayer){
        let rndRoom = getRndRoom();
        room.removeEntity(player);
        rooms[rndRoom].addEntity(player);
        player.currentRoom=rooms[rndRoom];
    }
}

function checkForPitCollision(room){
    let roomHasPit = room.checkContentsForType('Pit');
    let roomHasPlayer = room.checkContentsForType('Player');
    let pit = room.arryContents[room.getIndexOfType('Pit')];
    if(roomHasPit && roomHasPlayer){player.isAlive=false;}
}

function checkForWumpusCollision(room){
    let roomHasWumpus = room.checkContentsForType('Wumpus');
    let roomHasPlayer = room.checkContentsForType('Player');
    let wumpusObject = room.arryContents[room.getIndexOfType('Wumpus')];
    if(roomHasWumpus && roomHasPlayer){player.isAlive=false;}
}
//#endregion

//#region Hazard Functions


function setupHazards(){
    let wumpusSpawnRoom = getRndRoomFrom(wumpusSpawnRooms);
    wumpus.currentRoom = rooms[wumpusSpawnRoom];
    illicitRooms.push(wumpusSpawnRoom);
    rooms[wumpusSpawnRoom].addEntity(wumpus);
    
    let pitARandomSpawn = getRndRoomExcept(illicitRooms);
    illicitRooms.push(pitARandomSpawn);
    let pitBRandomSpawn = getRndRoomExcept(illicitRooms);
    illicitRooms.push(pitBRandomSpawn);
    rooms[pitARandomSpawn].addEntity(pitA);
    rooms[pitBRandomSpawn].addEntity(pitB);
    pitA.currentRoom=rooms[pitARandomSpawn];
    pitB.currentRoom=rooms[pitBRandomSpawn];
    
    let batARandomSpawn = getRndRoomExcept(illicitRooms);
    illicitRooms.push(batARandomSpawn);
    let batBRandomSpawn = getRndRoomExcept(illicitRooms);
    illicitRooms.push(batBRandomSpawn);
    rooms[batARandomSpawn].addEntity(batA);
    rooms[batBRandomSpawn].addEntity(batB);
    batA.currentRoom=rooms[batARandomSpawn];
    batB.currentRoom=rooms[batBRandomSpawn];
}

function checkForHazards(){
    let output = document.getElementById("output");
    // let isPitNearby = checkForPits(player.currentRoom);
    let isBatNearby = checkNearRoomsFor('Bat');
    let isPitNearby = checkNearRoomsFor('Pit');
    let isWumpusNearby = checkNearRoomsFor('Wumpus');
    output.innerHTML = `
        Bat is nearby: ${isBatNearby}<br>
        Pit is nearby: ${isPitNearby}<br>
        Wumpus is nearby: ${isWumpusNearby}<br>
        `;
}

//#endregion

// #region Other Functions


function updateGame(path){
    let currentRoom = player.currentRoom;
    let movePlayer = function(){player.move(path);}
    let moveWumpus = function(){
        wumpus.randomPath();
        wumpus.isStartled = false;
        illicitRooms.push(wumpus.currentRoom.id);
    }
    let shootArrow = function(){
        let arrow = new Arrow(currentRoom); 
        arrow.turnSpawn=turns; 
        player.fireArrow(path,arrow);
        currentRoom.removeEntity(arrow); 
    }
    if(player.isAlive){
        if(!player.isFireModeOn){movePlayer();} else{shootArrow();}
        
        checkForArrowCollisions();
        if(wumpus.isAlive && wumpus.isStartled){moveWumpus();}
        checkForWumpusCollision(player.currentRoom);
        checkForBatCollision(player.currentRoom);
        checkForPitCollision(player.currentRoom);
        updateStats();
        updatePathButtons();
        colorAllRooms();
        checkForHazards();
        turns++;
    }
    
    

    
}


// #endregion



