var balloon,balloonImage1,balloonImage2;
var position,database;

function preload(){
  bg =loadImage("cityImage.png");
  balloonImage1=loadAnimation("hotairballoon1.png");
  balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
  "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
  "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
 }

function setup(){
    database=firebase.database();
    console.log(database);
    createCanvas(1500,700);
    balloon=createSprite(250,450,150,150);
    balloon.addAnimation("hotAirBalloon",balloonImage1);
    balloon.scale=0.5;
    var balloonPosition=database.ref('balloon/position');
    balloonPosition.on("value",readPosition,showError);
}

function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        balloon.addAnimation("hotAirBalloon",balloonImage2);
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        balloon.addAnimation("hotAirBalloon",balloonImage2);
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        balloon.addAnimation("hotAirBalloon",balloonImage2);
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
         balloon.addAnimation("hotAirBalloon",balloonImage2);
         writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('balloon/position').set({
    'x':position.x+x,
    'y':position.y+y
    })
    
}
function readPosition(data){
position=data.val();
balloon.x=position.x;
balloon.y=position.y;
}

function showError(){
console.log("error");
}
