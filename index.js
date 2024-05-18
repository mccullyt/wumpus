import Player from '/classes/Player.mjs'
const player = new Player();
player.NumCurrentRoom = 22;

let paragraph = document.getElementById("test");
console.log(paragraph.innerHTML)
paragraph.innerHTML = Player.NumCurrentRoom;