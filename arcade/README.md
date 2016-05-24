frontend-nanodegree-arcade-game
===============================

Students should use this rubric: https://www.udacity.com/course/viewer#!/c-ud015/l-3072058665/m-3072588797

for self-checking their submission.

Script to check mouse position on the browser

document.onmousemove = function(e){
var x = e.pageX;
var y = e.pageY;
e.target.title = "X is "+x+" and Y is "+y;
};

How to start Game
==================
1) The game is run inside a web browser
2) Open the index.html file to start the game

How to play the game
=====================
1) Use the up, right, down and left arrow keys to move the player
2) THe game ends when the player hits a bug or when the player hits the water.
3) When the game ends, it restarts over and the player is back to its starting position
