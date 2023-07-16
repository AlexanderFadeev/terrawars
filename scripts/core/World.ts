import { Map } from "./Map.js"
import { ArenaGen } from "./map_gen/ArenaGen.js"
import { MapGenerator } from "./map_gen/MapGenerator.js"
import { Ball } from "./Ball.js"
import { Vec2D } from "../geometry/Vec2D.js";

export class World {
    constructor(rows: number, cols: number, nFactions: number) {
        let gen: MapGenerator = new ArenaGen();
        this.map = gen.generate(rows, cols, nFactions);
        this.balls = new Array<Ball>();
        this.nFactions = nFactions;
    }

    update(dt: number) {
        const substeps = 1;
        dt /= substeps;
        for (let iter = 0; iter < substeps; iter++) {
            this.subUpdate(dt);
        }
    }

    subUpdate(dt: number) {
        let balls = this.balls;
        const bounds = new Vec2D(this.map.cols, this.map.rows);
        for (let i = 0; i < this.balls.length; i++) {
            let ball = balls[i];
            ball.update(dt, bounds);
        }

        this.spawn();
        this.checkCollisions();
        this.eraseDeadBalls();
    }

    private eraseDeadBalls() {
        let balls = this.balls;
        for (let i = 0; i < balls.length; i++) {
            let ball = balls[i];
            if (ball.dead) {
                balls[i] = balls[balls.length - 1];
                balls.pop();
                i--;
            }
        }
    }

    private spawn() {
        let map = this.map;

        for (let row = 0; row < map.rows; row++) {
            for (let col = 0; col < map.cols; col++) {
                let tile = map.tiles[row][col];
                if (!tile.faction.isPlayer()) {
                    continue;
                }

                this.balls.push(new Ball(
                    // 1,
                    0.1,
                    new Vec2D(col + 0.5, row + 0.5),
                    Vec2D.Random(0.1 / 10),
                    tile.faction,
                ));
            }
        }
    }

    private checkCollisions() {
        this.checkBallCollisions();
        this.checkTileCollisions();
    }

    private checkBallCollisions() {
        let balls = this.balls;
        const lim = balls.length
        for (let i = 0; i < lim; i++) {
            let bi = balls[i];
            if (bi.dead) {
                continue;
            }
            for (let j = i + 1; j < lim; j++) {
                let bj = balls[j];
                if (bj.dead) {
                    continue;
                }
                if (bi.radius + bj.radius <= bi.pos.dist(bj.pos)) {
                    continue;
                }

                this.collideBalls(bi, bj);
            }
        }
    }

    private collideBalls(b1: Ball, b2: Ball) {
        if (b1.mass < b2.mass) {
            this.collideBalls(b2, b1);
            return;
        }
        b2.die();

        let p1 = b1.momentum;
        let p2 = b2.momentum;
        let p = p1.add(p2);
        let c1 = b1.pos.mul(b1.mass);
        let c2 = b2.pos.mul(b2.mass);

        if (b1.faction.id == b2.faction.id) {
            let m = b1.mass + b2.mass;
            let v = p.div(m);
            let r = Math.sqrt(m);
            let c = c1.add(c2).div(m);

            b1.radius = r;
            b1.speed = v;
            b1.pos = c;
        } else {
            let m = b1.mass - b2.mass;
            if (m < 1e-4) {
                b1.die();
                return;
            }
            let r = Math.sqrt(m);
            let v = p.div(m);

            b1.radius = r;
            b1.speed = v;
        }
    }

    private checkTileCollisions() {
        let balls = this.balls;
        let map = this.map;

        const captureCost = 1; // tile size

        for (let i = 0; i < balls.length; i++) {
            let ball = balls[i];
            if (ball.mass < captureCost) {
                continue;
            }

            const rowMin = Math.max(0, Math.floor(ball.pos.y - ball.radius));
            const rowMax = Math.min(map.rows - 1, Math.ceil(ball.pos.y + ball.radius));
            const colMin = Math.max(0, Math.floor(ball.pos.x - ball.radius));
            const colMax = Math.min(map.cols - 1, Math.ceil(ball.pos.x + ball.radius));

            for (let row = rowMin; row <= rowMax; row++) {
                for (let col = colMin; col <= colMax; col++) {
                    let tile = map.tiles[row][col];

                    if (ball.faction.id == tile.faction.id) {
                        continue;
                    }

                    tile.faction = ball.faction;
                    ball.radius = Math.sqrt(ball.mass - captureCost);
                    if (ball.mass < 1e-4) {
                        ball.die();
                        break;
                    }

                    if (ball.mass < captureCost) {
                        break;
                    }
                }
                if (ball.mass < captureCost) {
                    break;
                }
            }
        }
    }

    map: Map;
    balls: Ball[];
    nFactions: number;
}
