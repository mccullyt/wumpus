import Player from '/classes/Player.mjs'
import GameMaster from '/classes/gameMaster.mjs'
import Room from '/classes/room.mjs'
import paths from './paths.json' with { type: 'json' };

const player = new Player();
player.NumCurrentRoom = 22;

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
    let debug = true;
    let pathA;
    let pathB;
    let pathC;
    let element = room[i];
    switch(debug){    
        case true:
            console.log(element.NumCurrentRoom);
            console.log(element);
            console.log("value pathA: "+element.ArryExits[0])
            console.log("value pathB: "+element.ArryExits[1])
            console.log("value pathC: "+element.ArryExits[2])
            pathA = element.ArryExits[0];
            console.log("object pointer pathA: "+pathA)
            pathB = element.ArryExits[1];
            console.log("object pointer pathB: "+pathB)
            pathC = element.ArryExits[2];
            console.log("object pointer pathC: "+pathC)
            element.ArryExits[0] = room[pathA];
            element.ArryExits[1] = room[pathB];
            element.ArryExits[2] = room[pathC];
            console.log(element);
            break;
        default:
            pathA = element.ArryExits[0];
            pathB = element.ArryExits[1];
            pathC = element.ArryExits[2];
            element.ArryExits[0] = room[pathA];
            element.ArryExits[1] = room[pathB];
            element.ArryExits[2] = room[pathC];
            break;
    }


}




let mapObject = document.getElementById("layer1");

let svgRooms = mapObject.getElementsByTagName('path');


console.log(room);

// console.log(mapObject);

// console.log(svgRooms);



