import { World } from "./core/World.js"
import { Graphics } from "./visual/Graphics.js"

export class Game {
    constructor(canvas: HTMLCanvasElement) {
        this.graphics = new Graphics(canvas);
    }

    start(rows: number, cols: number, nFactions: number) {
        this.world = new World(rows, cols, nFactions);
        this.prevTime = Date.now();
        this.tick();
    }

    tick() {
        console.log(`${this.world.balls.length} balls`)

        let curTime = Date.now();
        let dt = curTime - this.prevTime;
        console.log(`Delta time = ${dt}`);
        this.prevTime = curTime;

        this.world.update(curTime, dt);

        this.graphics.reset();
        this.graphics.drawWorld(this.world);
        requestAnimationFrame(this.tick.bind(this));
    }

    private graphics: Graphics;
    private world: World;
    private prevTime: number;
}
