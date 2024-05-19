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

for( var i = 1; i < 21; i++){
    
   let newRoom = new Room(i);
    newRoom.ArryExits.push(paths.room[i-1].pathA);  // We subtract 1 from i because paths.json starts at 1 instead of 0.
    newRoom.ArryExits.push(paths.room[i-1].pathB);
    newRoom.ArryExits.push(paths.room[i-1].pathC);
    room.push(newRoom);
}

room.forEach(element => {
    console.log(element.NumCurrentRoom);
    console.log(element);
    console.log("pathA: "+element.ArryExits[0])
    console.log("pathB: "+element.ArryExits[2])
    console.log("pathC: "+element.ArryExits[1])
    let pathA = element.ArryExits[0]-1;
    console.log("pathA: "+pathA)
    let pathB = element.ArryExits[1]-1;
    console.log("pathB: "+pathB)
    let pathC = element.ArryExits[2]-1;
    console.log("pathC: "+pathC)
    element.ArryExits[0] = room[pathA];
    element.ArryExits[1] = room[pathB];
    element.ArryExits[2] = room[pathC];
    console.log(element);
});

// for(var i = 0; i <20; i++){
//     let pathA = room[i].ArryExits[0];
//     console.log("PathA: "+pathA);
//     let pathB = room[i].ArryExits[1];
//     console.log("PathB: "+pathB);
//     let pathC = room[i].ArryExits[2];
//     console.log("PathC: "+pathC);
// }


// room[0].ArryExits.push(paths.room[0].pathA)
// room[0].ArryExits.push(paths.room[0].pathB)
// room[0].ArryExits.push(paths.room[0].pathC)

// console.table(room[0]);
// console.table(room[1]);
// console.table(room[2]);
console.log(room);
console.log(room[2]);



// console.log(room[0].NumCurrentRoom);


