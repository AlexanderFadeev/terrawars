export class Vec2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static FromPolar(len, angle) {
        return new Vec2D(len * Math.sin(angle), len * Math.cos(angle));
    }
    static Random(len) {
        let angle = Math.random() * Math.PI * 2;
        return this.FromPolar(len, angle);
    }
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    get normal() {
        const len = this.length;
        if (this.length < 1e-6) {
            return Vec2D.Random(1);
        }
        return this.div(this.length);
    }
    sub(other) {
        return new Vec2D(this.x - other.x, this.y - other.y);
    }
    dist(other) {
        return this.sub(other).length;
    }
    mul(x) {
        return new Vec2D(this.x * x, this.y * x);
    }
    mulScalar(other) {
        return this.x * other.x + this.y * other.y;
    }
    cosTo(other) {
        return this.mulScalar(other) / this.length / other.length;
    }
    get longestComponent() {
        if (Math.abs(this.x) > Math.abs(this.y)) {
            return new Vec2D(this.x, 0);
        }
        else {
            return new Vec2D(0, this.y);
        }
    }
    div(x) {
        return this.mul(1 / x);
    }
    add(other) {
        return new Vec2D(this.x + other.x, this.y + other.y);
    }
    project(other) {
        return other.normal.mul(this.length * this.cosTo(other));
    }
    x;
    y;
}
//# sourceMappingURL=Vec2D.js.map