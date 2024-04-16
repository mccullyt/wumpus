# Brainstorm
This file is just a place to get my thoughts out.


## Classes
These are the classes I know I'll need.

### Bat
#### Properties
##### NumCurrentRoom
##### NumTargetRoom
##### IsAlive
#### Methods
##### Move(NumTargetRoom)
##### Spawn(TargetRoom)

### GameMaster
#### Properties
##### IsGameOver
##### IsGameWon
#### Methods
#### CheckCollisions
##### PopulateRooms
##### DisplaySplash
##### PromptPlayer

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

### Room
#### Properties
##### ArryRoomContents
##### ArryExits
#### Methods
##### Display

### Wumpus
#### Properties
##### NumCurrentRoom
##### NumTargetRoom
##### IsAlive
#### Methods
##### Move(NumTargetRoom)
##### Spawn(NumTargetRoom)

## General flow of the game
The general flow of the game is as such:
At startup, the GameMaster object will display the startup splashscreen, populate the rooms, and then prompt the player.
