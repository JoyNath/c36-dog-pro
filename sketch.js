var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed ,lastfeed
var FeedTime 

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  feed=createButton("feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  FeedTime=database.ref('FeedTime')
  FeedTime.on("value",function(data){
    lastfeed=data.val() 

  })

 
  //write code to display text lastFed time here
textSize(20)
if(lastfeed>=12)
text("lastfeed"+lastfeed+"pm",330,40)
 else if(lastfeed===0)
 text("lastfeed 12am",330,40)
 else
 text("lastfeed"+lastfeed+"am",330,40)

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var foodStock=foodObj.getFoodStock()
  if(foodStock<=0)
  foodObj.updateFoodStock(foodStock*0)
  else
    foodObj.updateFoodStock(foodStock-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
    
  })





  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
