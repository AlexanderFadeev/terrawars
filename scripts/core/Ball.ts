import { Vec2D } from '../geometry/Vec2D.js';
import { Faction } from './Faction.js';
import { Circle } from "../geometry/Circle.js"

export class Ball extends Circle {
    constructor(radius: number, origin: Vec2D, speed: Vec2D, faction: Faction) {
        super(origin, radius);
        this.speed = speed;
        this.faction = faction;
        this.isDead = false;
    }

    update(dt: number, bounds: Vec2D) {
        this.origin.x += this.speed.x * dt;
        this.origin.y += this.speed.y * dt;
        this.handleBounds(bounds);
    }

    handleBounds(bounds: Vec2D) {
        const left = this.origin.x - this.radius;
        const right = this.origin.x + this.radius;
        const up = this.origin.y - this.radius;
        const down = this.origin.y + this.radius;

        if (left < 0) {
            this.origin.x -= left;
            this.speed.x = Math.abs(this.speed.x);
        }
        if (right > bounds.x) {
            const overshoot = right - bounds.x;
            this.origin.x -= overshoot;
            this.speed.x = -Math.abs(this.speed.x);
        }
        if (up < 0) {
            this.origin.y -= up;
            this.speed.y = Math.abs(this.speed.y);
        }
        if (down > bounds.y) {
            const overshoot = down - bounds.y;
            this.origin.y -= overshoot;
            this.speed.y = -Math.abs(this.speed.y);
        }

        // if (this.origin.x + this.radius > bounds.x) {
        //     let d = this.origin.x + this.radius - bounds.x;
        //     this.origin.x -= d;
        //     this.speed.x = -Math.abs(this.speed.x);
        // }

        // if (this.origin.y + this.radius > bounds.y) {
        //     let d = this.origin.y + this.radius - bounds.y;
        //     this.origin.y -= d;
        //     this.speed.y = -Math.abs(this.speed.y);
        // }
    }

    get area(): number {
        return Math.PI * this.radius * this.radius;
    }

    set area(a: number) {
        this.radius = Math.sqrt(a / Math.PI);
    }

    get momentum(): Vec2D {
        return this.speed.mul(this.area);
    }

    set momentum(p: Vec2D) {
        this.speed = p.div(this.area);
    }

    get isNegligible(): boolean {
        return this.radius < 1e-3;
    }

    die() {
        this.isDead = true;
    }

    speed: Vec2D;
    faction: Faction;
    isDead: boolean;
}
