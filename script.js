score = 0;
cross = true;
let p = 0;
let audio = new Audio('music.mp3');
let fly = new Audio('fly.mp3');
let gun = new Audio('gun.mp3');
let teleport = new Audio('teleport.mp3');
let audiogo = new Audio('gameover.mp3');
let info = document.getElementById('info');

document.onkeydown = function(e) {

    //console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 32) {
        roll()
        info = document.getElementById('info');
        if (randomNumber == 1) {
            info.innerHTML = "Use up arrow key to fly!";
        } else if (randomNumber == 3) {
            info.innerHTML = "Use right arrow key to be invible for alian!";
        } else if (randomNumber == 5) {
            info.innerHTML = "Use down arrow key to teleport!";
            console.log("hello")
        } else {
            info.innerHTML = "you have No power";
        }
    }
    if ((e.keyCode == 38) && randomNumber == 1) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 200 + "px";
        fly.play();
        setTimeout(() => {
            dino.classList.remove('animateDino');
            fly.pause();
            p = 0;
        }, 700);

    }

    if (e.keyCode == 39 && randomNumber == 3) {
        p = 1;
        dino = document.querySelector('.dino');
        dino.classList.add('DinoWithGun');
        gun.play()
        setTimeout(() => {
            dino.classList.remove('DinoWithGun')
            p = 0;
            gun.pause();
        }, 5000);

    }
    if (e.keyCode == 40 && randomNumber == 5) {
        p = 1;
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        obs = document.querySelector('.obstacle');
        obsX = parseInt(window.getComputedStyle(obs, null).getPropertyValue('left'));
        dino.style.left = obsX + 50 + "px";
        teleport.play();
        dino = document.querySelector('.dino');
        dino.classList.add('DinoTeleport');
        setTimeout(() => {
            dino.classList.remove('DinoTeleport')
            teleport.pause();
            p = 0;
        }, 1000);
    }

    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 5 + "px";
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 5) + "px";
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    //console.log(offsetX, offsetY)
    //console.log(power)
    if (offsetX < 55 && offsetY < 30 && p == 0) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);

    } else if (offsetX < 145 && cross) {
        randomNumber = 0;
        score += 1;
        updateScore(score);
        cross = false;
        //power = "true";
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.5;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);
        document.querySelector(".diceImg").setAttribute("src",
            "dice" + 2 + ".png");

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}

var randomNumber;

function roll() {
    randomNumber = Math.floor(Math.random() * 6) + 1;
    document.querySelector(".diceImg").setAttribute("src",
        "dice" + randomNumber + ".png");
    //console.log(randomNumber)
}