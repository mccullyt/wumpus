import Player from '/classes/Player.mjs'
import GameMaster from '/classes/gameMaster.mjs'
import Room from '/classes/room.mjs'
import paths from './paths.json' with { type: 'json' };
const player = new Player();
player.NumCurrentRoom = 22;

// let paragraph = document.getElementById("test");
// console.log(paragraph.innerHTML)
// paragraph.innerHTML = Player.NumCurrentRoom;

const room = [];


// This for loop creates room with exit values derived from path values from paths.json.
for( var i = 1; i < 21; i++){
    
   let newRoom = new Room(i);
    newRoom.ArryExits.push(paths.room[i-1].pathA);  // We subtract 1 from i because paths.json starts at 1 instead of 0.
    newRoom.ArryExits.push(paths.room[i-1].pathB);
    newRoom.ArryExits.push(paths.room[i-1].pathC);
    room.push(newRoom);
}

// This foreach loop takes the exit values derived from the json file and replaces them with pointers to rooms in the room array.
// I subtract 1 from the number provided by the json file to match the room array indexing starting at 0 instead of 1.
room.forEach(element => {
    let debug = false;
    let pathA;
    let pathB;
    let pathC
    switch(debug){
        case true:
            console.log(element.NumCurrentRoom);
            console.log(element);
            console.log("pathA: "+element.ArryExits[0])
            console.log("pathB: "+element.ArryExits[2])
            console.log("pathC: "+element.ArryExits[1])
            pathA = element.ArryExits[0]-1;
            console.log("pathA: "+pathA)
            pathB = element.ArryExits[1]-1;
            console.log("pathB: "+pathB)
            pathC = element.ArryExits[2]-1;
            console.log("pathC: "+pathC)
            element.ArryExits[0] = room[pathA];
            element.ArryExits[1] = room[pathB];
            element.ArryExits[2] = room[pathC];
            console.log(element);
            break;
        default:
            pathA = element.ArryExits[0]-1;
            pathB = element.ArryExits[1]-1;
            pathC = element.ArryExits[2]-1;
            element.ArryExits[0] = room[pathA];
            element.ArryExits[1] = room[pathB];
            element.ArryExits[2] = room[pathC];
            break;
    }
    
});



// room[0].ArryExits.push(paths.room[0].pathA)
// room[0].ArryExits.push(paths.room[0].pathB)
// room[0].ArryExits.push(paths.room[0].pathC)

// console.table(room[0]);
// console.table(room[1]);
// console.table(room[2]);
// console.log(room);
// console.log(room[2]);



// console.log(room[0].NumCurrentRoom);


