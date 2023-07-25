import { World } from "../core/World.js";
import { Vec2D } from "../geometry/Vec2D.js";
import { Rect } from "../geometry/Rect.js"
import { hsv2rgb } from "../util/util.js";
import { Ball } from "../core/Ball.js";

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
        this.canvasCtx.rect(rect.left, rect.up, rect.width, rect.height);
        this.canvasCtx.fill();
    }

    drawCircle(pos: Vec2D, radius: number, borderColor: string, fillColor: string) {
        this.canvasCtx.beginPath();
        this.canvasCtx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI, false);
        this.canvasCtx.fillStyle = fillColor;
        this.canvasCtx.fill();
        this.canvasCtx.lineWidth = 1;
        this.canvasCtx.strokeStyle = borderColor;
        this.canvasCtx.stroke();
    }

    drawTile(row: number, col: number, color: string) {
        const scale = this.scale;
        let rect = new Rect(
            new Vec2D(col * scale, row * scale),
            new Vec2D((col + 1) * scale, (row + 1) * scale)
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
                if (faction.isNeutral()) {
                    continue;
                }

                this.drawTile(row, col, colors[faction.id + 1]);
            }
        }
    }

    drawBall(ball: Ball, borderColor: string, fillColor: string) {
        const scale = this.scale;
        this.drawCircle(
            new Vec2D(ball.origin.x * scale, ball.origin.y * scale),
            ball.radius * scale,
            borderColor,
            fillColor,
        );
    }

    drawBalls(world: World) {
        const balls = world.balls;
        const nFactions = world.nFactions;

        let borderColors = new Array<string>();
        for (let factionId = 1; factionId <= nFactions; factionId++) {
            borderColors[factionId - 1] = hsv2rgb(360 * (factionId - 1) / nFactions, 1, 1);
        }

        let fillColors = new Array<string>();
        for (let factionId = 1; factionId <= nFactions; factionId++) {
            fillColors[factionId - 1] = hsv2rgb(360 * (factionId - 1) / nFactions, 1, 0.75);
        }

        for (let ball of balls) {
            this.drawBall(ball, borderColors[ball.faction.id - 1], fillColors[ball.faction.id - 1]);
        }
    }

    drawWorld(world: World) {
        this.drawTiles(world);
        this.drawBalls(world);
    }

    readonly scale: number = 10;
    private canvas: HTMLCanvasElement;
    private canvasCtx: CanvasRenderingContext2D;
}
