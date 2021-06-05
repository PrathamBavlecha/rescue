var hero,enemy;
var shootSpeed = 2
var projectileGRP
var enemyGroup

function preload(){
  knife = loadImage("knife.png")
  heroIdle = loadAnimation("Sprites/idle/adventurer-idle-00.png","Sprites/idle/adventurer-idle-01.png","Sprites/idle/adventurer-idle-02.png")
  enemyPurple = loadAnimation("Enemy/style_A/PNG/frame0000.png","Enemy/style_A/PNG/frame0001.png","Enemy/style_A/PNG/frame0002.png","Enemy/style_A/PNG/frame0003.png","Enemy/style_A/PNG/frame0004.png")
  backgroundIMG = loadImage("Sprites/backgrounds/background.jpg")
  heroRun = loadAnimation("Sprites/run/adventurer-run-00.png","Sprites/run/adventurer-run-01.png","Sprites/run/adventurer-run-02.png","Sprites/run/adventurer-run-03.png","Sprites/run/adventurer-run-04.png","Sprites/run/adventurer-run-05.png")
  heroJump = loadAnimation("Sprites/jump/adventurer-crnr-jmp-00.png","Sprites/jump/adventurer-crnr-jmp-01.png","Sprites/jump/adventurer-crnr-jmp-02.png")
  bulletIMG = loadImage("bullet.png")
}
function setup() {
  createCanvas(displayWidth,displayHeight-110);
//  enemy = createSprite(Math.round(random(0,displayWidth)),100,10,10)
 // enemy.addImage("enemy",enemyIMG)

  hero = createSprite(displayWidth/8,displayHeight-300,50,50)
  hero.addAnimation("idle",heroIdle)
  hero.addAnimation("run",heroRun)
  hero.friction = 0.99;
  hero.scale = 4
  enemyGroup = new Group()
  projectileGRP = new Group()
}

function draw() {
  background(backgroundIMG); 

 // hero.x = camera.x
 // hero.y = camera.y

 if(mouseIsPressed){
 hero.velocityX = (mouseX - hero.x) * 10;
 hero.velocityY = (mouseY - hero.y) * 10;
 }else{
   hero.velocity.x = 0
   hero.velocity.y = 0
   hero.changeAnimation("idle",heroIdle)
 }

if(hero.velocity.x !==0){
   hero.changeAnimation("run",heroIdle)
 }
 if(mouseX>hero.x){
   hero.mirrorX(1)
 }else{
   hero.mirrorX(-1)
 }

 if(keyDown("f")){
   shoot()
 }

 spawnEnemy()

drawSprites();
  
}



function shoot(){
  if(frameCount%2===0){
  var projectile = createSprite(hero.x,hero.y,10,10)
  if(mouseX>hero.x){
    projectile.velocityX = 20
    projectile.mirrorX(1)
  }else{
    projectile.velocityX = -20
    projectile.mirrorX(-1)
  }
  projectile.addImage("bullet",bulletIMG)
  projectileGRP.add(projectile)
}
}

function spawnEnemy(){
  if(frameCount%100===0){
   var enemy = createSprite(0,Math.round(random(0,displayHeight-200)),10,10)
   if(Math.random(0,1)>0.5){
     enemy.x = 0
     enemy.velocityX = 5
     enemy.mirrorX(1)
   }else{
     enemy.x = displayWidth
     enemy.velocityX = -5
     enemy.mirrorX(-1)
   }
   enemy.lifetime = 400
   enemy.scale = 2
   enemy.addAnimation("purple",enemyPurple)
   enemyGroup.add(enemy)
  }}
 
