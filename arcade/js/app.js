
var allEnemies = [];
var player;
var enemy;
var checkCanvas;
var boundary;
var key;
var crossSuccess;
var offCanvas = 505;
// Enemies our player must avoid
var Enemy = function(x, y) {

    this.x = x;
    this.y = y;
    this.speed = randomGenerator(50, 250);
    this.height = 68;
    this.width = 100;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    var newX = this.x + dt * this.speed;
    // console.log("This is newX" + newX);
    if (newX > offCanvas) {
        // reposition the enemey
        newX = 10;
    }

    this.x = newX;
    checkIfAPlayerIsColliding();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Write Player Clas
var Player = function() {
    this.x = 200;
    this.y = 400;
    this.speed = 40;
    this.sprite = "images/char-boy.png";
    this.width = 67;
    this.height = 77;
    this.boundary = false;
};

Player.prototype.update = function() {
    this.handleInput();

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    var newX = this.x;
    var newY = this.y;

    if (key == "up") {
        newY -= this.speed;
    } //End if
    if (key == "right") {
        newX += this.speed;
    } //End if
    if (key == "down") {
        newY += this.speed;
    }
    if (key == "left") {
        newX -= this.speed;
    } //End if

    checkCanvas = checkCanvasBoundary(this, newX, newY);
    if (checkCanvas) {
        this.x = newX;
        this.y = newY;
        if (this.y + this.height < 80) {
            gameRestart();
        }
    } //End if
};

// #### Function to check if a player is colliding
function checkIfAPlayerIsColliding() {

    for (var i = 0; i < allEnemies.length; i++) {

        if (collides(allEnemies[i], player)) {
            gameRestart();
        } //End If

    } //End forEach
} //End checkIfAPlayerIsColliding() 

//### Formula to check for collision via bounded box
function collides(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

function gameRestart() {
    document.location.href = "";
}

// This function ensures that the player does not leave the canvas
function checkCanvasBoundary(a, x, y) {
    var bottomY = a.height + y;
    var topY = y;
    var leftX = x;
    var rightX = a.width + x;
    var leftCanvas = 55;
    var rightCanvas = 420;
    var topCanvas = 60;
    var bottomCanvas = 450;

    if (leftCanvas < rightX &&
        rightCanvas > leftX &&
        topCanvas < bottomY &&
        bottomCanvas > topY) {

        boundary = true;
    } else {
        boundary = false;
    }
  return boundary;
}

// Add enemies to the allEnemies array
function setupEnemies() {

    allEnemies.push(new Enemy(200, 240));
    allEnemies.push(new Enemy(30, 140));
    allEnemies.push(new Enemy(200, 100));
} //End setupEnemies()

// Set up random generator between two numbers
function randomGenerator(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

player = new Player();
setupEnemies();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});