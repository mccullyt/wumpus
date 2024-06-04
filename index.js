import Player from '/classes/Player.mjs'
import GameMaster from '/classes/gameMaster.mjs'
import Room from '/classes/room.mjs'
import paths from './paths.json' with { type: 'json' };

const player = new Player();
player.NumCurrentRoom = 22;
console.log(player.NumCurrentRoom);

// let paragraph = document.getElementById("test");
// console.log(paragraph.innerHTML)
// paragraph.innerHTML = Player.NumCurrentRoom;

const room = [new Room(0)];


// This for loop creates room with exit values derived from path values from paths.json.
for( var i = 1; i < 21; i++){
    
   let newRoom = new Room(i);
    newRoom.ArryExits.push(paths.room[i-1].pathA); //I subtract 1 to keep i aligned with num objects in paths.json
    newRoom.ArryExits.push(paths.room[i-1].pathB);
    newRoom.ArryExits.push(paths.room[i-1].pathC);
    room.push(newRoom);
}

// This foreach loop takes the exit values derived from the json file and replaces them with pointers to rooms in the room array.
// I subtract 1 from the number provided by the json file to match the room array indexing starting at 0 instead of 1.
for(var i = 1; i < 21; i++){
    let isDebug = true;
    let pathA;
    let pathB;
    let pathC;
    let element = room[i];
    
    
    pathA = element.ArryExits[0];
    pathB = element.ArryExits[1];
    pathC = element.ArryExits[2];

    element.ArryExits[0] = room[pathA];
    element.ArryExits[1] = room[pathB];
    element.ArryExits[2] = room[pathC];
    switch(isDebug){    
        case true:
            console.log(element.NumCurrentRoom);
            console.log("value pathA: "+element.ArryExits[0].NumCurrentRoom)
            console.log("value pathB: "+element.ArryExits[1].NumCurrentRoom)
            console.log("value pathC: "+element.ArryExits[2].NumCurrentRoom)
            console.log("object pointer pathA: "+pathA)
            console.log("object pointer pathB: "+pathB)
            console.log("object pointer pathC: "+pathC)
            console.log(element);
            break;
    }


}




let mapObject = document.getElementById("layer1");

let svgRooms = mapObject.getElementsByTagName('path');


let x = 8;

console.log(x);



// Each room in the svg has an id of room##. This for loop makes each room green. 
for(var i = 1; i <21; i++){
    
    let isDebug = false;

    let testRoom = document.getElementById("room"+i);
    switch(isDebug){
        case true:
            console.log(i);
            console.log(testRoom)
            break;
        

    }
    testRoom.style.fill="green";
    
    
}

// let xyz = true;
// let paragraph=document.getElementById('test');
// while(xyz){paragraph.innerHTML="true"}
// paragraph.innerHTML='false'





// console.log(mapObject);

// console.log(svgRooms);



