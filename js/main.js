class Player {
  // determining the position on X axis and Y axis
  constructor() {
    this.width = 10;
    this.height = 10;
    this.positionX = 50 - this.width / 2; // position is in % of the screen width (X), (this.width /2) is used to center the object
    this.positionY = 0;

    this.domElement = null;

    this.createDomElement();
  }

  createDomElement() {
    // we create the function since the code will be quite long, it's just to make the constructor code more readable
    // step1: create the element:
    this.domElement = document.createElement("div");

    // step2: add content or modify (ex. innerHTML...)
    this.domElement.id = "player";
    this.domElement.style.width = this.width + "vw"; // here we apply some css properties
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.bottom = this.positionY + "vh";
    this.domElement.style.left = this.positionX + "vw";

    //step3: append to the dom: `parentElm.appendChild()`
    const boardElm = document.getElementById("board"); // Elm 'board' here refers to the HTML elm we created earlier
    boardElm.appendChild(this.domElement);
  }

  moveLeft() {
    this.positionX--; //the -5 can be adjusted depending on how much % we want the player to move
    this.domElement.style.left = this.positionX + "vw";
    if (this.positionX >= 100) {
      !moveLeft();
    }
  }

  moveRight() {
    this.positionX++;
    this.domElement.style.left = this.positionX + "vw";
    if (this.positionX <= 0) {
      !moveRight();
    }
  }
}

class Obstacle {
  constructor() {
    this.width = 20;
    this.height = 10;
    this.positionX = 50 - this.width / 2;
    this.positionY = 100;

    this.domElement = null;
    this.createDomElement();
  }

  createDomElement() {
    // step1: create the element:
    this.domElement = document.createElement("div");

    // step2: add content or modify (ex. innerHTML...)
    this.domElement.className = "obstacle"; //here we change it for a class since we are gonna have multiple obstacles, id are unique always
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.bottom = this.positionY + "vh";
    this.domElement.style.left = this.positionX + "vw";

    //step3: append to the dom: `parentElm.appendChild()`
    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.domElement);
  }

  moveDown() {
    this.positionY--; // updating position
    this.domElement.style.bottom = this.positionY + "vh"; // reflecting changes in the DOM using CSS
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const player = new Player(); // Mind the Uppercase caracter or the class created above won't work
const obstacles = [];

// responding keypad keys
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    player.moveRight();
  } else if (event.key === "ArrowLeft") {
    player.moveLeft();
  }
});

//Create more obstacles
setInterval(() => {
    const newObstacle = new Obstacle();
    obstacles.push(newObstacle);
}, 3000);


//Move obstacles & detect collision
setInterval(() => {
  obstacles.forEach( (obstacleInstance) => {

      //move current obstacle
      obstacleInstance.moveDown();

      //detect if there's a collision between player and current obstacle
      if (
          player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
          player.positionX + player.width > obstacleInstance.positionX &&
          player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
          player.height + player.positionY > obstacleInstance.positionY
      ) {
          location.href = '../game-over.html';
      }

      //check if we need to remove current obstacle
      if(obstacleInstance.positionY <= 0 - obstacleInstance.height ){            
          obstacleInstance.domElement.remove(); //remove dom element
          obstacles.shift(); //remove from the array to avoid bad performances from elements accumulation in array
      }
  });
}, 50)