export class Collision {
    static checkCircleCircle(a, b) {
        return a.origin.dist(b.origin) <= a.radius + b.radius;
    }
    static checkCircleRect(c, r) {
        return this.checkRectCircle(r, c);
    }
    static checkCirclePoint(c, p) {
        return c.origin.dist(p) < c.radius;
    }
    static checkRectCircle(r, c) {
        return this.checkCirclePoint(c, r.upLeft) ||
            this.checkCirclePoint(c, r.upRight) ||
            this.checkCirclePoint(c, r.downLeft) ||
            this.checkCirclePoint(c, r.downRight) ||
            this.checkRectPoint(r, c.origin);
    }
    static checkRectRect(a, b) {
        throw new Error("unimplemented");
    }
    static checkRectPoint(r, p) {
        return r.left < p.x && p.x < r.right
            && r.up < p.y && p.y < r.down;
    }
    static checkPointCircle(p, c) {
        return this.checkCirclePoint(c, p);
    }
    static checkPointRect(p, r) {
        return this.checkRectPoint(r, p);
    }
    static checkPointPoint(a, b) {
        throw new Error("unimplemented");
    }
}
//# sourceMappingURL=Collision.js.map