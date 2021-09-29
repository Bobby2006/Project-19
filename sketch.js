var girl, girlNormalImg, girlRunningImg;
var zombie, zombieImg;
var Birds, BirdsGroup, Rocks, RocksGroup;

var ground, groundImg, invisibleGround;
var wall, wallImg;

var scaryBird_1, scaryBird_2, scaryBird_3;
var rock_1, rock_2;

var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
    girlRunningImg = loadImage("girlRunning.png");

    zombieImg = loadImage("zombie.png");

    scaryBird_1 = loadImage("scaryBird_1.png");
    scaryBird_2 = loadImage("scaryBird_2.png");
    scaryBird_3 = loadImage("scaryBird_3.png");

    rock_1 = loadImage("rock_1.png");
    rock_2 = loadImage("rock_2.png");

    groundImg = loadImage("ground.png");
    wallImg = loadImage("forest.jpg");

}

function setup() {
 createCanvas(windowWidth, windowHeight);

 girl = createSprite(90, height-30, 50, 50);
 girl.addImage("Running", girlRunningImg);
 girl.scale = 0.5;

 ground = createSprite(width/2, height-80, width, 10);
 ground.addImage("Grass", groundImg);

 wall = createSprite(width/1.6, height/9, width, height);
 wall.addImage("Forest", wallImg);
 wall.scale = 3;

 //ground.depth = 2;

 wall.depth = girl.depth;

 scaryBird_1.depth = girl.depth;
 scaryBird_2.depth = girl.depth;
 scaryBird_3.depth = girl.depth;

 rock_1.depth = girl.depth;
 rock_2.depth = girl.depth;

 girl.depth += 2;

 invisibleGround = createSprite(width/2, height-15, width, 5);
 invisibleGround.visible = false;

 BirdsGroup = new Group();
 RocksGroup = new Group();
}

function draw() {
 background("LightBlue");

//console.log(girl.y);

 if(gameState==PLAY)
 {
    score = score + Math.round(getFrameRate()/60);

    ground.velocityX = -(6 + 3 * score/100);

    if(ground.x < 0)
    {
        ground.x = ground.width/2;
    }

    if((touches.length > 0 || keyDown("SPACE")) && girl.y >= height-98)
    {
        girl.velocityY = -20;
    }

    girl.velocityY = girl.velocityY + 0.8;

    spawnBirds();
    spawnRocks();
    }

    if(BirdsGroup.isTouching(girl) || RocksGroup.isTouching(girl))
    {
        gameState==END;
    }

    if(gameState==END)
    {
        reset();
    }

    fill("White");
    textSize(20);
    text("Score: " + score, width-180, height/12);
    girl.collide(invisibleGround);

 drawSprites();
}

function spawnBirds()
{
    if(frameCount % 200 === 0)
    {
        var skyObstacle = createSprite(width, height-440, 50, 50);
        skyObstacle.velocityX = -(6 + 3 * score/100);

        BirdsGroup.add(skyObstacle);

        var rn = Math.round(random(1, 3));

        switch(rn)
        {
            case 1: skyObstacle.addImage("scaryBird_1", scaryBird_1);
                    skyObstacle.scale = 0.3;
                    break;
            case 2: skyObstacle.addImage("scaryBird_3", scaryBird_2);
                    skyObstacle.scale = 0.3;
                    break;
            case 3: skyObstacle.addImage("scaryBird_3", scaryBird_3);
                    skyObstacle.scale = 0.5;
                    break;
            default: skyObstacle.addImage("scaryBird_1", scaryBird_1);
                     skyObstacle.scale = 0.3;
                     break;
        }
    }
}

function spawnRocks()
{
    if(frameCount % 120 === 0)
    {
        var obstacle = createSprite(width, height-120, 50, 50);
        obstacle.velocityX = -(6 + 3 * score/100);

        RocksGroup.add(obstacle);

        var rn = Math.round(random(1, 3));

        switch(rn)
        {
            case 1: obstacle.addImage("rock_1", rock_1);
                    obstacle.scale = 0.8;
                    break;
            case 2: obstacle.addImage("rock_2", rock_2);
                    obstacle.scale = 0.5;
                    break;
            default: obstacle.addImage("rock_1", rock_1);
                     obstacle.scale = 0.8;
                     break;
        }
    }
}

function reset()
{

}