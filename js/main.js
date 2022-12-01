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
    this.positionX = this.positionX - 5; //the -5 can be adjusted depending on how much % we want the player to move
    this.domElement.style.left = this.positionX + "vw";
  }

  moveRight() {
    this.positionX = this.positionX + 5;
    this.domElement.style.left = this.positionX + "vw";
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const player = new Player(); // Mind the Uppercase caracter or the class created above won't work

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    player.moveRight();
  } else if (event.key === "ArrowLeft") {
    player.moveLeft();
  }
});
