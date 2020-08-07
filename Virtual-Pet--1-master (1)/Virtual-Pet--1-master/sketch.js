//Create variables here
var dog,dogImg,dogImg1;
var database,food,foodStock;
function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png")
  dogImg1=loadImage("images/dogImg1.png")
 
}

function setup() {
	createCanvas(800, 700);
  database=firebase.database();
  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  dog.scale=0.1;
}


function draw() {  
  background("white");
  if(keyWentDown(UP_ARROW)){
    writeStock(food)
    dog.addImage(dogImg1);
  }
  drawSprites();
  //add styles here
 text("food remaning"+food,170,200)
 text("press up arrow to feed the dog",130,10,300,20);
}

function readStock(data){
  food=data.val();

}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{x=x-1
    database.ref('/').update({
      food:x
    })
  }
}