var player;
var player_walk;
var player_walkL; 
var fondoi;
var player_indel;
var i_d;
var piso;
var diamante1, diamante2, diamante3;
var posiciones= [];

function preload() {
    player_walk = loadAnimation("./assets/p_walk1.png", "./assets/p_walk2.png", "./assets/p_walk3.png",);
    fondoi = loadImage("./assets/fondo.jpg");
    player_walkL=loadAnimation("./assets/p_walk1_L.png","./assets/p_walk2_L.png","./assets/p_walk3_L.png");
    player_indel=loadAnimation("./assets/p_indel1.png","./assets/p_indel2.png","./assets/p_indel3.png");
    diamante1=loadImage("./assets/diamante1.png");
    diamante2=loadImage("./assets/diamante2.png");
    diamante3=loadImage("./assets/diamante3.png");
}

function setup() {
    createCanvas(windowWidth, 600);
    player = createSprite(142, 360, 50, 50);
    player.addAnimation("quieto", player_indel);
    player.addAnimation("caminando", player_walk);
    player.addAnimation("caminandoL", player_walkL);
    piso=createSprite(110,511,200,10);
    piso.visible=false;
    posiciones=[
        [170,363],[351,424],[454,373],[524,216],[615,73],[805,236],[947,271]
    ];
    joyas();
}

function draw() {
    background(fondoi);
    drawSprites();
    text(mouseX + "-" + mouseY, mouseX, mouseY);
    player.velocityY=player.velocityY+0.5;
   player.collide(piso);
    player.changeAnimation("quieto");
    if(keyWentUp("left")&&(i_d==false)){
        player.mirrorX(-1);
         player.changeAnimation("quieto");
    }
    if(keyDown("right")&&(i_d==true)){
        player.mirrorX(1);
         player.changeAnimation("quieto");
    }
    if (keyDown("up")) {
        player.velocityY = player.velocityY - 5;
    }
    if (keyDown("down")) {
        player.y = player.y + 5;
    }
    if (keyDown("left")) {
        player.x = player.x - 5;
        player.changeAnimation("caminandoL");
        i_d=false;
        
    }
    if (keyDown("right")) {
        player.x = player.x + 5;
        player.changeAnimation("caminando");
        i_d=true;
    }
    
}

function joyas(){
    var r =Math.round(random(0,6))
    var joya=createSprite(posiciones[r]);
    joya.shapeColor="pink";
    joya.addImage(diamante1);
    joya.scale=0.3;
}