import { Game } from "./Game.js";

function getCanvas(): HTMLCanvasElement {
    return document.getElementById("gameCanvas") as HTMLCanvasElement;
}

function onResize() {
    let canvas = getCanvas();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function main() {
    window.addEventListener("resize", onResize);
    onResize();

    let canvas = getCanvas();
    let game = new Game(canvas);
    game.start(75, 75, 16);
}

main();
