let cnv = document.querySelector('.canvas');
let ctx = cnv.getContext('2d');

let img = document.querySelector('.img');
let img2 = document.querySelector('.img2');
let img3 = document.querySelector('.img3');
let img4 = document.querySelector('.img4');
let img5 = document.querySelector('.img5');
let img6 = document.querySelector('.img6');

cnv.style.width = '800px';
cnv.style.height = '1000px';
cnv.style.border = '5px solid #FFFFFF';
cnv.height = 800;
cnv.width = 1000

let score = 0;

let scoreUp = document.querySelector('.score-up');
let scoreBtm = document.querySelector('.score-btm');

//classes

class Player{
    constructor(img, x, y, velocity, acceleration, dead, width, height, angle) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.img = img;
        this.dead = dead;
        this.angle = angle;
    };
};

class Column{
    constructor(img, x, y, velocity, width, height, angle){
        this.img = img;
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.angle = angle
    };
};
 
class Background{
    constructor(img, x, y, velocity){
        this.img = img;
        this.x = x;
        this.y = y;
        this.velocity = velocity;
    }; 
};

class Flower extends Background{

};

class Seed{
    constructor(img, x, y, velocity, width, height, angle, position){
        this.img = img;
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.angle = angle
        this.position = position;
    };
};

let column = new Column(img2, 650, getRandomInRange(-200, -150), -10, 150, 480);
let column2 = new Column(img3, 650, getRandomInRange(600, 750), -10, 150, 530);
let column3  = new Column(img2, 1200, getRandomInRange(-200, -150), -10, 150, 480);
let column4 = new Column(img3, 1200, getRandomInRange(600, 700), -10, 150, 530);

let columns = [column, column2, column3, column4];

let player = new Player(img, 200, 300, 0, 0.4, false, 512, 325, 180);

let background = new Background(img4, 0, 0, 0.5);

let flower = new Flower(img5, 1000, cnv.height/2 - 75, 3);

let seed = new Seed(img6, 720, cnv.height/2 - 25, 15, 100, 60, 90, 0);

// Event Listeners
document.addEventListener('mousedown', function(){
        if(player.dead === true){
            player.velocity = 0;
        } else{
            player.velocity = -8;
            player.angle -= 20;
        };
});

// functions
function restartFunc(object, x, y, velocity, acceleration, dead, width, height){
    object.x = x;
    object.y = y;
    object.velocity = velocity;
    if(acceleration){
        object.acceleration = acceleration;
        object.dead = dead;
    };
    if(width && height){
        object.width = width;
        object.height = height;
    };
};

function init(){
    requestAnimationFrame(animate);
};

function animate(){
    ctx.clearRect(0,0,cnv.width,cnv.height);

    player.y += player.velocity;
    player.velocity += player.acceleration;

    ctx.beginPath();
        ctx.drawImage(background.img, background.x, background.y, 1000, 800);
        ctx.drawImage(column.img, column.x, column.y, column.width, column.height);
        ctx.drawImage(column2.img, column2.x, column2.y, column2.width, column2.height);
        ctx.drawImage(column3.img, column3.x, column3.y, column3.width, column4.height);
        ctx.drawImage(column4.img, column4.x, column4.y, column4.width, column4.height);
    ctx.closePath();
    
    // player
    ctx.beginPath();
        ctx.save();
            ctx.translate(player.x, player.y);
            ctx.rotate(player.angle * Math.PI/360);
            ctx.drawImage(player.img, 0, 0, 150, 50);
        ctx.restore();
    ctx.closePath();

    // angle
    if(player.angle >= 10){
        player.angle = 10;
    } else{
        player.angle += 3;
    };

    if(player.angle <= -10){
        player.angle = -10;
    };


    column.x += column.velocity;
    column2.x += column2.velocity;
    column3.x += column3.velocity;
    column4.x += column4.velocity;

    if(player.y > cnv.height - 40){
        player.y = cnv.height - 40 
        player.acceleration = 0;
        player.velocity = 0;
        column.velocity = 0;
        column2.velocity = 0;
        column3.velocity = 0;
        column4.velocity = 0;
        player.dead = true;
        document.addEventListener('keydown', function(evt){
            if(evt.keyCode === 82){
                restartFunc(player, 200, 300, 0, 0.4, false, 512, 325);
                player.y += player.velocity;
                player.velocity += player.acceleration;
                restartFunc(column, 650, getRandomInRange(-200, -50), -10, 150, 480);
                restartFunc(column2, 650, getRandomInRange(600, 750), -10, 150, 530);
                restartFunc(column3, 1200, getRandomInRange(-200, -75), -10, 150, 480);
                restartFunc(column4, 1200, getRandomInRange(550, 700), -10, 150, 530);
                restartFunc(flower, 1000, cnv.height/2 - 75, 3);
                restartFunc(seed, 720, cnv.height/2 - 25, 15);

                score = 0;
            };
        });
    } else if(player.y < 0 - 40){
        player.y = 0 - 40;
        player.acceleration = 2;
        player.velocity = 2;
        column.velocity = 0;
        column2.velocity = 0;
        column3.velocity = 0;
        column4.velocity = 0;
        player.dead = true
        document.addEventListener('keydown', function(evt){
            if(evt.keyCode === 82){
                restartFunc(player, 200, 300, 0, 0.4, false, 512, 325);
                player.y += player.velocity;
                player.velocity += player.acceleration;
                restartFunc(column, 650, getRandomInRange(-200, -50), -10, 150, 480);
                restartFunc(column2, 650, getRandomInRange(600, 750), -10, 150, 530);
                restartFunc(column3, 1200, getRandomInRange(-200, -75), -10, 150, 480);
                restartFunc(column4, 1200, getRandomInRange(550, 700), -10, 150, 530);
                score = 0;
            };
        });
    };

    if(column.x < 0 - 120){
        column.x = 1020;
        column2.x = 1020;
        
        column.y = getRandomInRange(-180, -75);
        column2.y = getRandomInRange(520, 750);
        score++;
    };

    if(column3.x < 0 - 120){
        column3.x = 1020;
        column4.x = 1020;

        column3.y = getRandomInRange(-200, -75);
        column4.y = getRandomInRange(600, 750);
        score++;
    };
    
    const dstnc = 385;

    let a1 = cnv.width - column.x;
    let distance1 = a1 - (170 + dstnc);
    let out1 = 480 + column.y; // готово

    let a2 = cnv.width - column2.x;
    let distance2 = a2 - (170 + dstnc);

    let a3 = cnv.width - column3.x;
    let distance3 = a3 - (170 + dstnc);
    let out3 = 530 + column3.y; // готово

    let a4 = cnv.width - column4.x;
    let distance4 = a3 - (170 + dstnc);

// first pare
// first pare UP
    // столкновение с крышкой
    if(player.y < out1 && player.x + 150 > column.x && player.x < column.x + column.width){
        player.acceleration = 2;
        player.velocity = 25;
        for(let i = 0; i < columns.length; i++){
            columns[i].velocity = 0;
        };
        player.dead = true;
    };

    // столкновение со стенкой 
    if(player.y < out1 && distance1 === 0){
        player.acceleration = 2;
        player.velocity = 25;
        for(let i = 0; i < columns.length; i++){
            columns[i].velocity = 0;
        };
        player.dead = true;
    };

// нижняя первой пары
    //столкновение с крышкой
    if(player.y + 100 > column2.y && player.x + 150 > column2.x && player.x < column2.x + column2.width){
        player.acceleration = 2;
        player.velocity = 25;
        for(let i = 0; i < columns.length; i++){
            columns[i].velocity = 0;
        };
        player.dead = true;
    };
    // столкновение со стенкой
    if(player.y + 100 > column2.y && distance2 === 0){
        player.acceleration = 2;
        player.velocity = 25;
        for(let i = 0; i < columns.length; i++){
            columns[i].velocity = 0;
        };
        player.dead = true;
    };


// вторая пара
// верхняя второй пары
    //столкновение с крышкой
    if(player.y < out3 && player.x + 150 > column3.x && player.x < column3.x + column3.width){
        player.acceleration = 2;
        player.velocity = 25;
        for(let i = 0; i < columns.length; i++){
            columns[i].velocity = 0;
        };
        player.dead = true;
    };
    // столкновение со стенкой
    if(player.y < out3 && distance3 === 0){
        player.acceleration = 2;
        player.velocity = 25;
        for(let i = 0; i < columns.length; i++){
            columns[i].velocity = 0;
        };
        player.dead = true;
    };
// нижняя второй пары
    //столкновение с крышкой
    if(player.y + 100 > column4.y && player.x + 150 > column4.x && player.x < column4.x + column4.width){
        player.acceleration = 2;
        player.velocity = 25;
        for(let i = 0; i < columns.length; i++){
            columns[i].velocity = 0;
        };
        player.dead = true;
    };
    // столкновение со стенкой
    if(player.y + 100 > column4.y && distance4 === 0){
        player.acceleration = 2;
        player.velocity = 25;
        for(let i = 0; i < columns.length; i++){
            columns[i].velocity = 0;
        };
        player.dead = true;
    };

    //speed up
    if(score % 25 === 0 && score !== 0){
        for(let i = 0; i < columns.length; i++){
            columns[i].velocity -= 0.1;
        };
    };  
    // boss
    if(score >= 25){    
        if(flower.x <= 660){

            flower.velocity = 0;

            ctx.save();
                ctx.translate(seed.x, seed.y);
                
                if(seed.x <= -80){
                    seed.x = 720;
                    seed.y = cnv.height/2-25;
                    seed.position = getRandomInRange(-6, 6);
                }
                if(seed.x <= -80 && player.dead === true){
                    seed.velocity = 0;
                };

               

                // TODO: сделать условие на столкновение семечка и игрока а так же сделать поворот семечка
                
                if(seed.x <= player.x + 150 
                   && seed.y + seed.height >= player.y
                   && seed.x > player.x
                   && seed.y < player.y + 50){
                    player.acceleration = 2;
                    player.velocity = 25;
                    player.dead = true
                }


                seed.y += seed.position;

                ctx.drawImage(seed.img, 0, 0, seed.width, seed.height);
            ctx.restore();

            seed.x -= seed.velocity;
        };

        ctx.drawImage(flower.img, flower.x, flower.y, 360, 150);

        flower.x -= flower.velocity;
        flower.velocity = 3;

        if(column.x > 1000){
            column.velocity = 0;
            column2.velocity = 0;
        };
        if(column3.x > 1000){
            column3.velocity = 0;
            column4.velocity = 0;
        };
    };

    scoreUp.textContent = score;
    scoreBtm.textContent = score;

    requestAnimationFrame(animate);
};

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

init();
