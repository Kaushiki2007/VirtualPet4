  var database;
  var foodS, foodStock, foodObject;
  var dog, happyDog, sadDog;
  var feedTime, lastFed;
  var feed, addFood;
  var gameState = "0";
  function preload()
  {
    happyDog = loadImage("images/dogImg1.png");
    sadDog = loadImage("images/dogImg.png");
    bedroom = loadImage("images/virtual pet images/Bed Room.png")
    garden = loadImage("images/virtual pet images/Garden.png");
    washroom = loadImage("images/virtual pet images/Wash Room.png");
    livingroom = loadImage("images/virtual pet images/Living Room.png");
  
  }

  function setup() {
    createCanvas(1000, 400);
    //Database = firebase.database();
    foodObject = new Food();
    dog = createSprite(800,200,150,150);
    dog.addImage(sadDog);

    feed = createButton("Feed the dog");
    feed.position(700,95);
    feed.mousePressed(feedDog);

    addFood = createButton("Add Food");
    addFood.position(800,95);
    addFood.mousePressed(addFoods);

    readState = database.ref('gameState');
    readState.on("value",function(data){
    gameState = data.val();  
    });
  }


  function draw() {  
    background("yellow");
    foodObj.display();
    writeStock(foodS);    

    if(foodS==0){
      dog.addImage(happyDog);
      milkBotltle2.visible=false;
    } else{
      dog.addImage(sadDog);
      milkBotltle2.visible=true;
    }

    fill(255,255,254);
    textSize(15);
    if(lastFed>=12){
      text("Last Feed :" +lastFed%12 + "PM", 350,30);
    }
    else if(lastFed == 0);
    { 
      text("Last Feed : 12 AM", 350,30);
    }
    currentTime = hour();
    if(currentTime==(lastFed+1)){
      update("Playing");
      foodObj.garden();
    } else if(currentTime==(lastFed+2)){
      update("Sleeping");
      foodObj.bedroom();
    }
    else{
      update("Hungry");
      foodObj.display();
    }

    if(gameState===1){
      dog.addImage(happyDog);
      dog.scale = 0.175;
      dog.y = 250;
    }
    
    if(gameState===2){
      dog.addImage(sadDog);
      dog.scale = 0.175;
      milkBotltle2.visible=false;
      dog.y = 250;
    }

    var Bath = createButton("I want to take a bath");
    Bath.position(580,125);
    if(Bath.mousePressed(function(){
      gameState=3;
      database.ref('/').update({'gameState': gameState});
    }));
    if(gameState===3){
      dog.addImage(washroom);
      dog.scale=1;
      milkBotltle2.visible=false;
    }


    var Sleep = createButon("I am very sleepy");
    Sleep.position(710,125);
    if(Sleep.mousePressed(function(){
      gameState=4;
      database.ref('/').update({'gameState': gameState});
    }));
    if(gameState===4){
      dog.addImage(bedroom);
      dog.scale=1;
      milkBotltle2.visible=false;
    }


    var Play = createButton("Let's Play!");
    Play.position(500,160);
    if(Play.mousePressed(function(){
      gameState=5;
      database.ref('/').update({'gameState': gameState});
    }));
    if(gameState===5){
      dog.addImage(livingroom);
      dog.scale=1;
      milkBotltle2.visible=false;
    }

    var PlayInGarden = createButton("Let's play in park");
    PlayInGarden.position(585,160);
    if(PlayInGarden.mousePressed(function(){
      gameState=6;
      database.ref('/').update({'gameState': gameState});
    }));
    if(gameState===6){
      dog.y = 175;
      dog.addImage(garden);
      dog.scale=1;
      milkBotltle2.visible=false;
    }

    drawSprites();
  }

  function addFoods(){
    foodS++;
        database.ref('/').update({
        Food:foodS
        })
    }
    

  function feedDog(){
    dog.addImage(happyDog);
    foodObject.updatefoodStock(foodObject.getfoodStock()-1);
    database.ref('/').update({
      Food:foodObject.getfoodStock(),
      feedTime:hour()
    })
  }

  function update(state){
    database.ref('/').update({
      gameState:state
    });
  }

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  } else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }

  function readStock(data){
    foodS = data.val();
  }
   
  function writeStock(){
    database.ref('/').update({
      food:x
    })
  }
 
