import { Vec2D } from '../geometry/Vec2D.js';
import { Faction } from './Faction.js';

export class Ball {
    constructor(radius: number, pos: Vec2D, speed: Vec2D, faction: Faction) {
        this.radius = radius;
        this.pos = pos;
        this.speed = speed;
        this.faction = faction;
        this.dead = false;
    }

    update(dt: number, bounds: Vec2D) {
        this.pos.x += this.speed.x * dt;
        this.pos.y += this.speed.y * dt;
        if (this.pos.x < this.radius) {
            let d = this.radius - this.pos.x;
            this.pos.x += d;
            this.speed.x = Math.abs(this.speed.x);
        }
        if (this.pos.y < this.radius) {
            let d = this.radius - this.pos.y;
            this.pos.y += d;
            this.speed.y = Math.abs(this.speed.y);
        }
        if (this.pos.x + this.radius > bounds.x) {
            let d = this.pos.x + this.radius - bounds.x;
            this.pos.x -= d;
            this.speed.x = -Math.abs(this.speed.x);
        }
        if (this.pos.y + this.radius > bounds.y) {
            let d = this.pos.y + this.radius - bounds.y;
            this.pos.y -= d;
            this.speed.y = -Math.abs(this.speed.y);
        }
    }

    // outOfBounds(bounds: Vec2D): boolean {
    //     return (
    //         this.pos.x < this.radius ||
    //         this.pos.y < this.radius ||
    //         this.pos.x + this.radius > bounds.x ||
    //         this.pos.y + this.radius > bounds.y
    //     );
    // }

    get mass(): number {
        return Math.pow(this.radius, 2);
    }

    get momentum(): Vec2D {
        return this.speed.mul(this.mass);
    }

    die() {
        this.dead = true;
    }

    radius: number;
    pos: Vec2D;
    speed: Vec2D;
    faction: Faction;
    dead: boolean;
}
