//Create variables here
var dog,happyDog,database,foodS,foodStock, fedTime, lastFed, foodObj;
var Dog1, DogHappy;

function preload()
{
  //load images here
  Dog1 = loadImage("images/Dog.png");
  DogHappy = loadImage("images/happydog.png");
}

function setup() {
  createCanvas(500, 500);

  dog = createSprite(250,250,50,50);
  dog.addImage(Dog1);
  dog.scale=0.2;
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed The Dog");
  feed.position(383, 500 -72);
  feed.mousePressed(feedDog);
  
  addFood = createButton("Add Food");
  addFood.position(500 + 250, 500 -72);
  addFood.mousePressed(addFoods);

  foodObj = new Food();
  }


function draw() {  
  // console.log(mouseX);
  // console.log(mouseY);

  background(46, 139, 87);

  fill(255, 255, 254);
  textSize(15);

  if(lastFed >= 12){
    text("Last Feed : "+ lastFed%12 + " PM", 350, 30);
  }
  else if(lastFed === 0){
    text("Last Feed")
  }

    if(foodS !== undefined){
      textSize(33);
      fill("red");
      text("Food Remaining : "+foodS, 90, 50);
    }
  drawSprites();
}

function readStock(data){
  foodS =data.val();

}

function writeStock(x){

  if(x===0){
    x = 0; 
  }
  else{
    x -=1;
  }

  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(DogHappy);

  foodObj.updateFoodStock();
  foodObj.deductFood();
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}