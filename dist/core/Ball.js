import { Circle } from "../geometry/Circle.js";
export class Ball extends Circle {
    constructor(radius, origin, speed, faction) {
        super(origin, radius);
        this.speed = speed;
        this.faction = faction;
        this.isDead = false;
    }
    update(dt, bounds) {
        this.origin.x += this.speed.x * dt;
        this.origin.y += this.speed.y * dt;
        this.handleBounds(bounds);
    }
    handleBounds(bounds) {
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
    }
    get area() {
        return Math.PI * this.radius * this.radius;
    }
    set area(a) {
        this.radius = Math.sqrt(a / Math.PI);
    }
    get momentum() {
        return this.speed.mul(this.area);
    }
    set momentum(p) {
        this.speed = p.div(this.area);
    }
    get isNegligible() {
        return this.radius < 1e-3;
    }
    die() {
        this.isDead = true;
    }
    speed;
    faction;
    isDead;
}
//# sourceMappingURL=Ball.js.map