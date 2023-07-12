import { World } from "../core/World.js";
import { Point } from "../geometry/Point.js";
import { Rect } from "../geometry/Rect.js"
import { hsv2rgb } from "../util.js";

export class Graphics {
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.canvasCtx = this.canvas.getContext("2d");
    }

    reset() {
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawRect(rect: Rect, color: string) {
        this.canvasCtx.beginPath();
        this.canvasCtx.fillStyle = color;
        this.canvasCtx.rect(rect.left(), rect.up(), rect.width(), rect.height());
        this.canvasCtx.fill();
    }

    drawTile(row: number, col: number, color: string) {
        const scale: number = 10;
        let rect = new Rect(
            new Point(col * scale, row * scale),
            new Point((col + 1) * scale, (row + 1) * scale)
        );
        this.drawRect(rect, color);
    }

    drawTiles(world: World) {
        const tiles = world.map.tiles;
        const nFactions = world.nFactions;

        let colors = new Array<string>();
        colors[0] = "grey";
        colors[1] = "black";
        for (let factionId = 1; factionId <= nFactions; factionId++) {
            colors[factionId + 1] = hsv2rgb(360 * (factionId - 1) / nFactions, 1, 0.5);
        }

        for (let row = 0; row < tiles.length; row++) {
            for (let col = 0; col < tiles[row].length; col++) {
                const faction = tiles[row][col].faction;
                this.drawTile(row, col, colors[faction.id + 1]);
            }
        }
    }

    drawWorld(world: World) {
        this.drawTiles(world)
    }

    private canvas: HTMLCanvasElement;
    private canvasCtx: CanvasRenderingContext2D;
}
