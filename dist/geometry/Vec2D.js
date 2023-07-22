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
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    sub(other) {
        return new Vec2D(this.x - other.x, this.y - other.y);
    }
    dist(other) {
        return this.sub(other).length();
    }
    mul(x) {
        return new Vec2D(this.x * x, this.y * x);
    }
    div(x) {
        return this.mul(1 / x);
    }
    add(other) {
        return new Vec2D(this.x + other.x, this.y + other.y);
    }
    x;
    y;
}
//# sourceMappingURL=Vec2D.js.map