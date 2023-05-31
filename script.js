const canvas = document.getElementById('game');
const cntx = canvas.getContext('2d');
class SnakePart{
    constructor(x , y){
        this.x = x;
        this.y =y;
    }


}


let speed = 8;
let blockCount = 20;
let blockSize = canvas.width / blockCount - 2;
const snakeParts = [];
let tailLength = 2;
let headX = 10;
let headY = 10;
let xVelocity = 0;
let yVelocity = 0;
let foodX = 5;
let foodY = 5;
let score = 0;








function drawGame(){
    changeSnakeCords();

    let result = isGameOver();
    if(result){
        return;
    }


    clearScreen();
    drawSnake();
    
    checkFoodCollision();
    drawFood();
    drawScore();

    if(score > 2){
        speed = 11;
    }
    if(score > 5){
        speed = 15;
    }
    if(score > 10){
        speed = 17;
    }
    if(score > 15){
        speed = 20;
    }

    setTimeout(drawGame, 2000/speed);



}

function isGameOver(){
    let gameOver = false;

    if(yVelocity ===0 && xVelocity === 0){
        return false;
    }


    //walls
    if(headX < 0){
        gameOver = true;
    }
    else if(headX >= blockCount){
        gameOver = true;
    }
    else if (headY < 0){
        gameOver = true;
    }
    else if(headY >= blockCount){
        gameOver = true;
    }

    for( let i =0; i<snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x == headX && part.y == headY){
            gameOver = true;
            break;
        }

    }

    if (gameOver) {

        cntx.fillStyle = "white";
        cntx.font = "50px Verdana";


        cntx.fillText("Game Over!", canvas.width / 6.5, canvas.height /2);







    }

    return gameOver;



}

function drawScore(){
    cntx.fillStyle = "white";
    cntx.font = "10px Verdana";
    cntx.fillText(" Score " + score, canvas.width-50,10);







}

function clearScreen(){

    cntx.fillStyle = 'black';
    cntx.fillRect(0,0,canvas.clientWidth,canvas.height);
}


function drawSnake(){
    cntx.fillStyle = 'green';
    for(let i = 0; i < snakeParts.length; i++){
        
        let part = snakeParts[i];
        cntx.fillRect(part.x * blockCount , part.y * blockCount , blockSize , blockSize);
    }

    snakeParts.push(new SnakePart(headX, headY));
    while(snakeParts.length > tailLength){

        snakeParts.shift();
    }

    cntx.fillStyle = 'yellow';
    cntx.fillRect(headX * blockCount , headY * blockCount , blockSize , blockSize);

    

}

function changeSnakeCords(){
     headX = headX + xVelocity;
     headY = headY + yVelocity;
}

function drawFood(){
cntx.fillStyle = 'blue';
cntx.fillRect(foodX * blockCount , foodY * blockCount , blockSize , blockSize);

}

function checkFoodCollision(){
    if(foodX == headX && foodY == headY){
        foodX = Math.floor(Math.random() * blockCount);
        foodY = Math.floor(Math.random() * blockCount);
        tailLength++;
        score++;
        
    }



}


document.body.addEventListener('keydown' , keyDown);


function keyDown(event){


    //up key
    if(event.keyCode == 38){
        if(yVelocity == 1)
        return;
        yVelocity = -1;
        xVelocity = 0;
    }

    //down key 
    if(event.keyCode == 40){
        if(yVelocity == -1)
        return;
        yVelocity = 1;
        xVelocity = 0;
    }

    //left key
    if(event.keyCode == 37){
        if(xVelocity == 1)
        return;
        yVelocity = 0;
        xVelocity = -1;
    }

    //right key
    if(event.keyCode == (38 + 1) ){
        if(xVelocity == -1)
        return;
        yVelocity = 0;
        xVelocity = 1;
    }

}

drawGame();