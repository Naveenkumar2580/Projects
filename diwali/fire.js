"use strict";

let canvas, width, height, ctx;
let fireworks = [];
let particles = [];

function setup() {
    canvas = document.getElementById('canvas');
    setSize(canvas);
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
    fireworks.push(new Firework(Math.random() * (width - 200) + 100));
    window.addEventListener("resize", windowResized);
    document.addEventListener('click', onclick);
}

setTimeout(setup, 1);

function loop() {
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1;

    for (let i = 0; i < fireworks.length; i++) {
        let done = fireworks[i].update();
        fireworks[i].draw();
        if (done) fireworks.splice(i, 1);
    }

    for (let i = 0; i < particles.length; i++) {
        let done = particles[i].update();
        particles[i].draw();
        if (particles[i].lifetime > 80) particles.splice(i, 1);
    }

    if (Math.random() < 1 / 60) fireworks.push(new Firework(Math.random() * (width - 200) + 100));
}

setInterval(loop, 1000 / 60);

class Particle {
    constructor(x, y, col) {
        this.x = x;
        this.y = y;
        this.col = col;
        this.vel = randomVec(2);
        this.lifetime = 0;
    }

    update() {
        this.x += this.vel.x;
        this.y += this.vel.y;
        this.vel.y += 0.02;
        this.vel.x *= 0.99;
        this.vel.y *= 0.99;
        this.lifetime++;
    }

    draw() {
        ctx.globalAlpha = Math.max(1 - this.lifetime / 80, 0);
        ctx.fillStyle = this.col;
        ctx.fillRect(this.x, this.y, 2, 2);
    }
}

class Firework {
    constructor(x) {
        this.x = x;
        this.y = height;
        this.isBlown = false;
        this.col = randomCol();
    }

    update() {
        this.y -= 3;
        if (this.y < 350 - Math.sqrt(Math.random() * 500) * 40) {
            this.isBlown = true;
            for (let i = 0; i < 60; i++) {
                particles.push(new Particle(this.x, this.y, this.col));
            }
        }
        return this.isBlown;
    }

    draw() {
        ctx.globalAlpha = 1;
        ctx.fillStyle = this.col;
        ctx.fillRect(this.x, this.y, 2, 2);
    }
}

function randomCol() {
    let letter = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letter[Math.floor(Math.random() * 16)];
    }
    return color;
}

function randomVec(max) {
    let dir = Math.random() * Math.PI * 2;
    let spd = Math.random() * max;
    return { x: Math.cos(dir) * spd, y: Math.sin(dir) * spd };
}

function setSize(canvas) {
    canvas.style.width = (innerWidth) + "px";
    canvas.style.height = (innerHeight) + "px";
    width = innerWidth;
    height = innerHeight;

    canvas.width = innerWidth * window.devicePixelRatio;
    canvas.height = innerHeight * window.devicePixelRatio;
    canvas.getContext("2d").scale(window.devicePixelRatio, window.devicePixelRatio);
}

function onclick(e) {
    fireworks.push(new Firework(e.clientX));
}

function windowResized() {
    setSize(canvas);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
}
