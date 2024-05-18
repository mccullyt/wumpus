# Brainstorm
This file is just a place to get my thoughts out.


## Classes
These are the classes I know I'll need.

### Thing
#### Properties
##### NumCurrentRoom
#### Methods
##### Spawn(NumTargetRoom)

### Creature
#### Properties
##### NumTargetRoom
##### IsAlive
#### Methods
##### Move(NumTargetRoom)
##### Listen()




### Bat
#### Properties
##### NumCurrentRoom
##### NumTargetRoom
##### IsAlive
#### Methods
##### Move(NumTargetRoom)


### GameMaster
#### Properties
##### IsGameOver
##### IsGameWon
#### Methods
#### CheckCollisions
##### PopulateRooms
##### DisplaySplash
##### PromptPlayer
##### SpawnObject(object, room)

### Pit
#### Properties
##### NumCurrentRoom
#### Methods

### Player
#### Properties
##### NumCurrentRoom
##### NumTargetRoom
##### NumArrows
##### IsAlive
##### IsFireModeOn
#### Methods
##### FireArrow(NumTargetRoom)
##### Move(NumTargetRoom)
##### Spawn(NumTargetRoom)
##### Listen()
##### Toggle FireMode()

### Room
#### Properties
##### ArryRoomContents
##### ArryExits
##### NumCurrentRoom
#### Methods
##### Display()

### Wumpus
#### Properties
##### NumCurrentRoom
##### NumTargetRoom
##### IsAlive
#### Methods
##### CheckRooms()
##### Move(NumTargetRoom)
##### Spawn(NumTargetRoom)

## Startup Loop
### Game starts up
#### Create Room array
#### Create GameMaster
#### Populate Rooms
#### Spawn Player in Room 0.


## Game Play Loop
### GameMaster prompts player for action
#### If player moves to different room
##### Set numTarget Room
##### Copy player to numTargetRoom
##### Remove player from current room
##### Check for collisions
#### If player wants to attack
##### Check if player has enough arrows
##### If so, fire arrow into target room and check for collision
##### Iterate game play loop





