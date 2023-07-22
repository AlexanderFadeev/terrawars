export class Collision {
    static checkCirclePoint(c, p) {
        return c.origin.dist(p) < c.radius;
    }
    static checkPointCircle(p, c) {
        return this.checkCirclePoint(c, p);
    }
    static checkCircleCircle(a, b) {
        return a.origin.dist(b.origin) <= a.radius + b.radius;
    }
    static checkRectPoint(r, p) {
        return r.left < p.x && p.x < r.right
            && r.up < p.y && p.y < r.down;
    }
    static checkPointRect(p, r) {
        return this.checkRectPoint(r, p);
    }
    static checkRectCircle(r, c) {
        return this.checkCirclePoint(c, r.upLeft) ||
            this.checkCirclePoint(c, r.upRight) ||
            this.checkCirclePoint(c, r.downLeft) ||
            this.checkCirclePoint(c, r.downRight) ||
            this.checkRectPoint(r, c.origin);
    }
    static checkCircleRect(c, r) {
        return this.checkRectCircle(r, c);
    }
}
//# sourceMappingURL=Collision.js.map