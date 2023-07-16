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
    game.start(94, 167, 1);
}

main();
