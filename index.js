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
let showHazards = false;
let turns = 0;
let illicitRooms = [0,1,2,5,8];

createRooms();
replaceRoomStringsWithRefs();
createMenu();


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
    var menuItem8 = document.getElementById("menu-item-8");

    var actionsContainer = document.getElementsByClassName('actions-container');
    actionsContainer = actionsContainer[0];
    var actionsItem1 = document.getElementById('actions-item-1');
    var actionItem1Toggle = false;
    actionsItem1.addEventListener("click",function () {
        let toggled = actionItem1Toggle;
        let toggledColor = "darkred";
        let toggleColor = () =>{
            toggled = !toggled;
            actionItem1Toggle = toggled;
            if(toggled){actionsItem1.style=`background-color:${toggledColor};`}
            else{actionsItem1.style=`background-color:pink;`}
        }
        player.toggleFireMode();
        toggleColor();
        // actionsItem1.style="background-color:black;";
        menuItem4.innerHTML="Fire Mode: "+player.isFireModeOn;
    })
    
    
    var pathsContainer = document.getElementsByClassName('paths-container');
    pathsContainer = pathsContainer[0];
    var pathsItem1 = document.getElementById('paths-item-1');
    var pathsItem2 = document.getElementById('paths-item-2');
    var pathsItem3 = document.getElementById('paths-item-3');

    
    
    menuItem4.addEventListener("click",function () {
        player.toggleFireMode();
        menuItem4.innerHTML="Fire Mode: "+player.isFireModeOn;
    })

    menuItem5.addEventListener("click", function () {displayPlayersRoom();});
    
    menuItem7.addEventListener("click", function () {
        rooms.forEach(room => {
            console.log(room);
        });});
        
    menuItem8.addEventListener("click", function() {
        console.log("ShowHazards: "+showHazards);
        showHazards = !showHazards;
        menuItem8.innerHTML="Show Hazards: "+showHazards;
        console.log("ShowHazards: "+showHazards);
        colorAllRooms();
    })

    pathsItem1.addEventListener("click", () => {updateGame('a')}) 
    pathsItem2.addEventListener("click", () => {updateGame('b')}) 
    pathsItem3.addEventListener("click", () => {updateGame('c')}) 
        
}
function updatePathButtons(){
    let pathA = document.getElementById('paths-item-1');
    let pathB = document.getElementById('paths-item-2');
    let pathC = document.getElementById('paths-item-3');
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
        let roomHasBat = room.checkContentsForType('Bat');
        let roomHasPit = room.checkContentsForType('Pit');
        let roomHasPlayer = room.checkContentsForType('Player');
        let roomHasWumpus = room.checkContentsForType('Wumpus');
        let showRoomHasBat = function () {room.color = batA.color;}
        let showRoomIsEmpty = function () {room.color = room.emptyColor;}
        let showRoomHasPit = function (){room.color = pitA.color;} 
        let showRoomHasPlayer = function (){room.color = player.color;}
        let showRoomHasWumpus = function (){room.color = wumpus.color;}
        
        if(showHazards){
            if(roomHasWumpus){showRoomHasWumpus();}
            else if(roomHasPlayer){showRoomHasPlayer()}
            else if(roomHasBat){showRoomHasBat();}
            else if(roomHasPit){showRoomHasPit();}
            else {showRoomIsEmpty();}
        }
        else {showRoomIsEmpty();}
        if(roomHasPlayer){showRoomHasPlayer();}
        
        
    });
    rooms.forEach((room) => room.updateMapNodeColor());   
}




function checkNearRoomsFor(entityType){
    let isEntityNear = false;
    let nearRooms = player.currentRoom.arryExits;
    nearRooms.forEach(room => {
        let roomHasEntityType = () => { return room.checkContentsForType(entityType)}
        if(roomHasEntityType()){isEntityNear=true;}
    });
    return isEntityNear;
}


function getRndRoom(){
    let MIN = 1;
    let MAX = 20;
    let rndIndex;
    rndIndex = Math.floor(Math.random() * (MAX - MIN));
    return rndIndex;
}

function getRndRoomFrom(arryRooms){
    let spawnRooms = arryRooms;
    let MIN = 1;
    let MAX = spawnRooms.length;
    let rndIndex;
    rndIndex = Math.floor(Math.random() * (MAX - MIN));
    return spawnRooms[rndIndex];
}

function getRndRoomExcept(illicitRooms){
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

    rooms.forEach(room => {if(!isIllicit(room.id)){licitRooms.push(room.id);} });

    MIN = 0;
    MAX = licitRooms.length;    
    rndIndex = Math.floor(Math.random() * (MAX - MIN));
    
    return licitRooms[rndIndex];
}

// #endregion

//#region collision Functions

function checkForArrowCollision(room){
    let roomHasArrow = room.checkContentsForType('Arrow');
    let roomHasWumpus = room.checkContentsForType('Wumpus');
    let roomHasPlayer = room.checkContentsForType('Player');
    
    if(roomHasArrow){
        let arrowObject = room.arryContents[room.getIndexOfType('Arrow')];
        let isArrowLethal = arrowObject.lethal && arrowObject.turnSpawn == turns;
        let lethalPlayerCollision = isArrowLethal && roomHasPlayer;
        let lethalWumpusCollision = isArrowLethal && roomHasWumpus;

        if(lethalPlayerCollision){player.isAlive=false; room.removeEntity(arrowObject);}    
        else if (lethalWumpusCollision){wumpus.isAlive = false; room.removeEntity(wumpus); room.removeEntity(arrowObject);}
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
    let roomHasCollision = roomHasBat && roomHasPlayer;
    if(roomHasCollision){
        let rndRoom = getRndRoomExcept(illicitRooms);
        room.removeEntity(player);
        rooms[rndRoom].addEntity(player);
        player.currentRoom=rooms[rndRoom];
    }
}

function checkForPitCollision(room){
    let roomHasPit = room.checkContentsForType('Pit');
    let roomHasPlayer = room.checkContentsForType('Player');
    let roomHasCollision = roomHasPit && roomHasPlayer;
    if(roomHasCollision){player.isAlive=false;}
}

function checkForWumpusCollision(room){
    let roomHasWumpus = room.checkContentsForType('Wumpus');
    let roomHasPlayer = room.checkContentsForType('Player');
    let roomHasCollision = roomHasWumpus && roomHasPlayer;
    if(roomHasCollision){player.isAlive=false;}
}
//#endregion

//#region Hazard Functions


function setupHazards(){
    let wumpusSpawnRoom = getRndRoomFrom(wumpusSpawnRooms);
    wumpus.currentRoom = rooms[wumpusSpawnRoom];
    illicitRooms.push(wumpusSpawnRoom);
    rooms[wumpusSpawnRoom].addEntity(wumpus);
    
    let pitARandomSpawn = getRndRoomExcept(illicitRooms);
    let pitBRandomSpawn = getRndRoomExcept(illicitRooms);
    illicitRooms.push(pitARandomSpawn);
    illicitRooms.push(pitBRandomSpawn);
    rooms[pitARandomSpawn].addEntity(pitA);
    rooms[pitBRandomSpawn].addEntity(pitB);
    pitA.currentRoom=rooms[pitARandomSpawn];
    pitB.currentRoom=rooms[pitBRandomSpawn];
    
    let batARandomSpawn = getRndRoomExcept(illicitRooms);
    let batBRandomSpawn = getRndRoomExcept(illicitRooms);
    illicitRooms.push(batARandomSpawn);
    illicitRooms.push(batBRandomSpawn);
    rooms[batARandomSpawn].addEntity(batA);
    rooms[batBRandomSpawn].addEntity(batB);
    batA.currentRoom=rooms[batARandomSpawn];
    batB.currentRoom=rooms[batBRandomSpawn];
}

function checkForHazards(){
    let output = document.getElementById("output");
    let isBatNearby = checkNearRoomsFor('Bat');
    let isPitNearby = checkNearRoomsFor('Pit');
    let isWumpusNearby = checkNearRoomsFor('Wumpus');
    let stylesBat = `style="background-color:${batA.color}"`;
    let stylesPit = `style="background-color:${pitA.color}"`;;
    let stylesWumpus= `style="background-color:${wumpus.color}"`;;
    output.innerHTML = `<p>Nearby Hazards</p>`;
    
    if(isBatNearby){output.innerHTML = output.innerHTML + `<div class="output-item" ${stylesBat}>Bat</div>`;}
    if(isPitNearby){output.innerHTML = output.innerHTML + `<div class="output-item" ${stylesPit}>Pit</div>`;}
    if(isWumpusNearby){output.innerHTML = output.innerHTML + `<div class="output-item" ${stylesWumpus}>Wumpus</div>`;}
}

//#endregion

// #region Other Functions


function updateGame(path){
    let currentRoom = player.currentRoom;
    let wumpusCanMove = () => {return wumpus.isAlive && wumpus.isStartled}
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
        if(wumpusCanMove()){moveWumpus();}
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



