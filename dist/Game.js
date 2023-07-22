import { World } from "./core/World.js";
import { Graphics } from "./visual/Graphics.js";
export class Game {
    constructor(canvas) {
        this.graphics = new Graphics(canvas);
    }
    start(rows, cols, nFactions) {
        this.world = new World(rows, cols, nFactions);
        this.prevTime = Date.now();
        this.tick();
    }
    tick() {
        console.log(`${this.world.balls.length} balls`);
        let curTime = Date.now();
        let dt = curTime - this.prevTime;
        console.log(`Delta time = ${dt}`);
        this.prevTime = curTime;
        this.world.update(curTime, dt);
        this.graphics.reset();
        this.graphics.drawWorld(this.world);
        requestAnimationFrame(this.tick.bind(this));
    }
    graphics;
    world;
    prevTime;
}
//# sourceMappingURL=Game.js.map