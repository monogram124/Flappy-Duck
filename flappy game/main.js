let cnv = document.querySelector('.canvas');
let ctx = cnv.getContext('2d');

let img = document.querySelector('.img');
let img2 = document.querySelector('.img2');
let img3 = document.querySelector('.img3');
let img4 = document.querySelector('.img4')
cnv.style.width = '800px';
cnv.style.height = '1000px';
cnv.style.border = '5px solid #FFFFFF';
cnv.height = 800;
cnv.width = 1000

let score = 0;

//classes

class Player{
    constructor(img, x, y, velocity, acceleration, dead, width, height) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.img = img;
        this.dead = dead;
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

let column = new Column(img2, 650, getRandomInRange(-250, -75), -10, 150, 480);
let column2 = new Column(img3, 650, getRandomInRange(600, 750), -10, 150, 530);
let column3  = new Column(img2, 1200, getRandomInRange(-200, -75), -10, 150, 480);
let column4 = new Column(img3, 1200, getRandomInRange(600, 700), -10, 150, 530);

let columns = [column, column2, column3, column4];

let player = new Player(img, 200, 300, 0, 0.4, false, 512, 325);

let background = new Background(img4, 0, 0, 0.5);

// Event Listeners

// document.addEventListener('keydown', function(evt){
//     if(evt.keyCode = '32'){
//         restartFunc(player, 200, 300, 0, 0.4, false, 512, 325);
//         restartFunc(column, 650, getRandomInRange(-250, 0), -10, 150, 530);
//         restartFunc(column2, 650, getRandomInRange(650, 750), -10, 150, 480);
//         restartFunc(column3, 1200, getRandomInRange(-200, 0), -10), 150, 480;
//         restartFunc(column4, 1200, getRandomInRange(650, 700), -10, 150, 480);
//     };
// });

document.addEventListener('mousedown', function(){
        if(player.dead === true){
            player.velocity = 0; 
        } else{
            player.velocity = -8;
        };
    
});

// functions
function restartFunc(object, x, y, velocity, acceleration, dead, width, height){
    object.x = x;
    object.y = y;
    object.velocity = velocity;
    if(acceleration && dead){
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
    ctx.beginPath();
        ctx.drawImage(player.img, player.x, player.y, 150, 50);
    ctx.closePath();
    

    column.x += column.velocity;
    column2.x += column2.velocity;
    column3.x += column3.velocity;
    column4.x += column4.velocity;

    
    

    if(player.y > cnv.height - 60){
        player.y = cnv.height - 60 
        player.acceleration = 0;
        player.velocity = 0;
        column.velocity = 0;
        column2.velocity = 0;
        column3.velocity = 0;
        column4.velocity = 0;
        player.dead = true;
        
    } else if(player.y < 0 - 40){
        player.y = 0 - 40;
        player.acceleration = 2;
        player.velocity = 2;
        column.velocity = 0;
        column2.velocity = 0;
        column3.velocity = 0;
        column4.velocity = 0;
        player.dead = true

    };

    if(column.x < 0 - 120 && column2.x < 0 - 120){
        column.x = 1020;
        column2.x = 1020;
        
        column.y = getRandomInRange(-200, -75);
        column2.y = getRandomInRange(600, 750);
        score++;
    };

    if(column3.x < 0 - 120 && column4.x < 0 - 120){
        column3.x = 1020;
        column4.x = 1020;

        column3.y = getRandomInRange(-200, -75);
        column4.y = getRandomInRange(600, 750);
        score++;
    };

    // условия столкновения с трубой

    let a1 = cnv.width - column.x;
    let distance1 = a1 - (170 + 385);
    let out1 = 480 + column.y; // готово

    let a2 = cnv.width - column2.x;
    let distance2 = a2 - (170 + 385);

    let a3 = cnv.width - column3.x;
    let distance3 = a3 - (170 + 385);
    let out3 = 530 + column3.y; // готово

    let a4 = cnv.width - column4.x;
    let distance4 = a3 - (170 + 385);

// первая пара
// вернхяя первой пары
    // столкновение с крышкой
    if(player.y < out1 && player.x + 150 > column.x && player.x < column.x + column.width){
        player.acceleration = 2;
        player.velocity = 25;
        column.velocity = 0;
        column2.velocity = 0;
        column3.velocity = 0;
        column4.velocity = 0;
        player.dead = true;
    };

        // столкновение со стенкой 
    if(player.y < out1 && distance1 === 0){
        player.acceleration = 2;
        player.velocity = 25;
        column.velocity = 0;
        column2.velocity = 0;
        column3.velocity = 0;
        column4.velocity = 0;
        player.dead = true;
    };

// нижняя первой пары
    //столкновение с крышкой
    if(player.y + 100 > column2.y && player.x + 150 > column2.x && player.x < column2.x + column2.width){
        player.acceleration = 2;
        player.velocity = 25;
        column.velocity = 0;
        column2.velocity = 0;
        column3.velocity = 0;
        column4.velocity = 0;
        player.dead = true;
    };
    // столкновение со стенкой
    if(player.y + 100 > column2.y && distance2 === 0){
        player.acceleration = 2;
        player.velocity = 25;
        column.velocity = 0;
        column2.velocity = 0;
        column3.velocity = 0;
        column4.velocity = 0;
        player.dead = true;
    };


// вторая пара
// верхняя второй пары
    //столкновение с крышкой
    if(player.y < out3 && player.x + 150 > column3.x && player.x < column3.x + column3.width){
        player.acceleration = 2;
        player.velocity = 25;
        column.velocity = 0;
        column2.velocity = 0;
        column3.velocity = 0;
        column4.velocity = 0;
        player.dead = true;
    };
    // столкновение со стенкой
    if(player.y < out3 && distance3 === 0){
        player.acceleration = 2;
        player.velocity = 25;
        column.velocity = 0;
        column2.velocity = 0;
        column3.velocity = 0;
        column4.velocity = 0;
        player.dead = true;
    };
// нижняя второй пары
    //столкновение с крышкой
    if(player.y + 100 > column4.y && player.x + 150 > column4.x && player.x < column4.x + column4.width){
        player.acceleration = 2;
        player.velocity = 25;
        column.velocity = 0;
        column2.velocity = 0;
        column3.velocity = 0;
        column4.velocity = 0;
        player.dead = true;
    };
    // столкновение со стенкой
    if(player.y + 100 > column4.y && distance4 === 0){
        player.acceleration = 2;
        player.velocity = 25;
        column.velocity = 0;
        column2.velocity = 0;
        column3.velocity = 0;
        column4.velocity = 0;
        player.dead = true;
    };
    

    if(score >= 20){
        console.log('boss')
    };
    
    ctx.beginPath();
    ctx.fillStyle = 'black';

        ctx.font = "50px Helvetica";
        ctx.fillText(score, cnv.width / 2, 100);
    ctx.closePath();

    ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.fillText(score, cnv.width / 2, 97);

    ctx.closePath();

    requestAnimationFrame(animate);

};


function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};


init();