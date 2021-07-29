const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground,wall1,wall2;
var bridge,jointPoint,jointLink;
var stones=[];
var zombie1,zombie2,zombie3,zombie4,bg;
var zombie;
var breakButton;

function preload()
{
  zombie1 = loadAnimation("./assets/zombie.png");
  zombie2 = loadAnimation("./assets/zombie.png");
  zombie3 = loadAnimation("./assets/zombie.png");
  zombie4 = loadAnimation("./assets/zombie.png");

  bg = loadImage("./assets/background.png");
}

function setup() 
{
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0,height-10,width*2,20,"Blue",true);
  wall1 = new Base(300,height/2+50,300,100,"Grey",true);
  wall2 = new Base(width-300,height/2+50,300,100,"Grey",true);

  bridge = new Bridge(20,{x:width/2-550,y:height/2});

  jointPoint = new Base(width-600,height/2+10,40,20,"Grey",true);
  
  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge,jointPoint);

  zombie = createSprite(width/2,height-110);
  zombie.addAnimation("lefttoright",zombie1,zombie2.zombie1);
  zombie.addAnimation("righttoleft",zombie3,zombie4,zombie3);
  zombie.scale = 0.1;
  zombie.velocityX = 10;

  breakButton = createButton("");
  breakButton.position(width-200,height/2-50);
  breakButton.class("breakbutton");
  breakButton.mousePressed(handleButtonPress);

  for (var i=0; i<=8; i++)
  {
    var x = random(width/2-200,width/2+300);
    var y = random(-10,140);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
  }
}

function draw() 
{
  background(51);

  ground.show();
  wall1.show();
  wall2.show();
  bridge.show();

  for(var stone of stones)
  {
    stone.show();
  }

  drawSprites();
  Engine.update(engine);
}

function handleButtonPress()
{
  jointLink.detach();
  setTimeout(() => {
    bridge.break();
  },5000);
}
