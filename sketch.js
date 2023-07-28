var i_d;
var fondoi;
var player;
var player_walk;
var player_walkL; 
var player_indel;
var player_jump;
var grupo_joyas;
var piso, piso1, piso2, piso3, piso4, piso5, piso6, piso7, piso8, piso9, piso10, piso11, piso12, piso13, piso14, piso15, piso16, piso17, piso18, piso19;
var diamante1, diamante2, diamante3, diamante4;
var posiciones= [{x:170,y:363},
{x:351,y:424},
{x:454,y:373},
{x:524,y:216},
{x:615,y:73},
{x:805,y:236},
{x:947,y:271}];
var grupo_pisos;
var posicionesPiso=[
    {x:110,y:511,h:200,w:10},
    {x:264,y:403,h:100,w:10},
    {x:369,y:258,h:100,w:10},
    {x:42,y:383,h:150,w:10},
    {x:42,y:281,h:100,w:10},
    {x:530,y:520,h:315,w:10},
    {x:709,y:411,h:100,w:10},
    {x:810,y:279,h:100,w:10},
    {x:969,y:535,h:315,w:10},
    {x:1165,y:427,h:100,w:10},
    {x:1260,y:290,h:100,w:10},
    {x:1468,y:540,h:400,w:10},
    {x:1480,y:300,h:100,w:10},
    {x:1480,y:410,h:150,w:10},
    {x:475,y:160,h:25,w:10},
    {x:535,y:117,h:25,w:10},
    {x:915,y:168,h:25,w:10},
    {x:975,y:135,h:25,w:10},
    {x:1444,y:31,h:25,w:10},
    {x:1520,y:31,h:25,w:10},];
var puntos=0;
var gameState ="play";



function preload() {
    player_walk = loadAnimation("./assets/p_walk1.png", "./assets/p_walk2.png", "./assets/p_walk3.png");
    fondoi = loadImage("./assets/fondo.jpg");
    player_walkL=loadAnimation("./assets/p_walk1_L.png","./assets/p_walk2_L.png","./assets/p_walk3_L.png");
    player_indel=loadAnimation("./assets/p_indel1.png","./assets/p_indel2.png","./assets/p_indel3.png");
    player_jump=loadAnimation("./assets/jump1.png","./assets/jump2.png","./assets/jump3.png");
    diamante1=loadImage("./assets/diamante1.png");
    diamante2=loadImage("./assets/diamante2.png");
    diamante3=loadImage("./assets/diamante3.png");
    diamante4=loadImage("./assets/esmeralda.png");
    gameover= loadImage("./assets/mljuegos0.png");

    
}

function setup() {
    createCanvas(windowWidth, 600);
    grupo_joyas=new Group();
    grupo_pisos=new Group();


    player = createSprite(142, 360, 50, 50);
    player.addAnimation("quieto", player_indel);
    player.addAnimation("caminando", player_walk);
    player.addAnimation("caminandoL", player_walkL);
    player.addAnimation("salto", player_jump);
    
    joyas();
    pisos();

    findejuego=createSprite(width/2,height/2);
    findejuego.addImage(gameover);
    findejuego.scale=0.5;
    findejuego.visible=false;

}

function draw() {
    background(fondoi);
    drawSprites();
    fill("blue");
    textSize (18);
    text ("puntos  "+puntos, width-100,50);
    text(mouseX + "-" + mouseY, mouseX, mouseY);
    player.velocityY=player.velocityY+0.5;

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
        player.changeAnimation("salto");

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

    player.collide(grupo_pisos);
    if(player.y>height+1){
        gameState="end"
    };
    if(gameState=="end"){
        findejuego.visible=true;
    };
    /*for (var i in grupo_joyas){
        player.collide(grupo_joyas)
    };
*/
    /*if (grupo_joyas.isTouching(player)){
        for(var i=0; i<=grupo_joyas.length; i++){
            console.log("adentro ")
            if (grupo_joyas[i].isTouching(player)){
                puntos=puntos+1;
                grupo_joyas[i].destroy();
            };
        };
    };*/


    
};

function joyas(){
   
    for(var i in posiciones){  //bucle fifi
        var joya=createSprite(posiciones[i].x,posiciones[i].y,20,20);
        var r =Math.round(random(1,4));
        switch(r){
            case 1:
                joya.addImage(diamante1);
                joya.scale=0.2;
                break;
            case 2:
                joya.addImage(diamante2);
                joya.scale=1;
                break;
            case 3:
                joya.addImage(diamante3);
                joya.scale=0.4;
                 break;
            case 4 :
                joya.addImage(diamante4);
                joya.scale=0.4;
                break;

        }

       grupo_joyas.add(joya);
        
  }
    
}

function pisos(){
    for(var i in posicionesPiso){
       var piso=createSprite(posicionesPiso[i].x,posicionesPiso[i].y,posicionesPiso[i].h,posicionesPiso[i].w,);  
       grupo_pisos.add(piso);
       grupo_pisos.setVisibleEach(false);
    }
}
