import { ArenaGen } from "./map_gen/ArenaGen.js";
import { Ball } from "./Ball.js";
import { Vec2D } from "../geometry/Vec2D.js";
import { Collision } from "../geometry/Collision.js";
import { Rect } from "../geometry/Rect.js";
export class World {
    constructor(rows, cols, nFactions) {
        let gen = new ArenaGen();
        this.map = gen.generate(rows, cols, nFactions);
        this.balls = new Array();
        this.nFactions = nFactions;
    }
    update(t, dt) {
        this.spawn(t);
        const substeps = 1 << 1 - 1;
        dt /= substeps;
        for (let iter = 0; iter < substeps; iter++) {
            this.subUpdate(t + iter * dt, dt);
        }
    }
    subUpdate(t, dt) {
        let balls = this.balls;
        const bounds = new Vec2D(this.map.cols, this.map.rows);
        for (let i = 0; i < this.balls.length; i++) {
            let ball = balls[i];
            if (ball.area > 1) {
                ball.area *= 0.997;
                ball.speed = ball.speed.div(0.99);
            }
            ball.update(dt, bounds);
        }
        this.checkCollisions();
        this.eraseDeadBalls();
    }
    eraseDeadBalls() {
        let balls = this.balls;
        for (let i = 0; i < balls.length; i++) {
            let ball = balls[i];
            if (ball.isDead) {
                balls[i] = balls[balls.length - 1];
                balls.pop();
                i--;
            }
        }
    }
    spawn(t) {
        let map = this.map;
        for (let row = 0; row < map.rows; row++) {
            for (let col = 0; col < map.cols; col++) {
                if (Math.random() < 0.9) {
                }
                let tile = map.tiles[row][col];
                if (!tile.faction.isPlayer()) {
                    continue;
                }
                this.balls.push(new Ball(0.1 / 2, new Vec2D(col + 0.5, row + 0.5), Vec2D.FromPolar(0.1 / 10, t / 500 * 2 * Math.PI + 555 * row + 333 * col), tile.faction));
            }
        }
    }
    checkCollisions() {
        this.checkBallCollisions();
        this.checkBallsTilesCollisions();
    }
    checkBallCollisions() {
        let balls = this.balls;
        balls.sort((a, b) => (a.origin.x - a.radius < b.origin.x - b.radius) ? -1 : 1);
        let collisionChecks = 0;
        const lim = balls.length;
        for (let i = 0; i < lim; i++) {
            let bi = balls[i];
            if (bi.isDead) {
                continue;
            }
            for (let j = i + 1; j < lim && bi.origin.x + bi.radius > balls[j].origin.x - balls[j].radius; j++) {
                collisionChecks++;
                let bj = balls[j];
                if (bj.isDead) {
                    continue;
                }
                if (!Collision.checkCircleCircle(bi, bj)) {
                    continue;
                }
                this.collideBalls(bi, bj);
            }
        }
        console.log(`Collision checks: ${collisionChecks}, balls count: ${balls.length}`);
    }
    collideBalls(b1, b2) {
        if (b1.area < b2.area) {
            this.collideBalls(b2, b1);
            return;
        }
        b2.die();
        let p1 = b1.momentum;
        let p2 = b2.momentum;
        let p = p1.add(p2);
        if (b1.faction.equal(b2.faction)) {
            let m = b1.area + b2.area;
            let c1 = b1.origin.mul(b1.area);
            let c2 = b2.origin.mul(b2.area);
            let c = c1.add(c2).div(m);
            b1.area = m;
            b1.momentum = p;
            b1.origin = c;
        }
        else {
            b1.area -= b2.area;
            if (b1.isNegligible) {
                b1.die();
                return;
            }
            b1.momentum = p;
        }
    }
    checkBallsTilesCollisions() {
        let balls = this.balls;
        let map = this.map;
        const captureCost = 1;
        for (let i = 0; i < balls.length; i++) {
            this.checkBallTilesCollision(balls[i], map, captureCost);
        }
    }
    checkBallTilesCollision(ball, map, captureCost) {
        if (ball.area < captureCost) {
            return;
        }
        const rowMin = Math.max(0, Math.floor(ball.origin.y - ball.radius));
        const rowMax = Math.min(map.rows - 1, Math.ceil(ball.origin.y + ball.radius));
        const colMin = Math.max(0, Math.floor(ball.origin.x - ball.radius));
        const colMax = Math.min(map.cols - 1, Math.ceil(ball.origin.x + ball.radius));
        for (let row = rowMin; row <= rowMax; row++) {
            for (let col = colMin; col <= colMax; col++) {
                let tileRect = new Rect(new Vec2D(col, row), new Vec2D(col + 1, row + 1));
                if (!Collision.checkRectCircle(tileRect, ball)) {
                    continue;
                }
                let tile = map.tiles[row][col];
                if (tile.faction.isWall()) {
                    continue;
                }
                if (ball.faction.equal(tile.faction)) {
                    continue;
                }
                tile.faction = ball.faction;
                ball.area -= captureCost;
                if (ball.isNegligible) {
                    ball.die();
                    break;
                }
                if (ball.area < captureCost) {
                    return;
                }
            }
        }
    }
    map;
    balls;
    nFactions;
}
//# sourceMappingURL=World.js.map