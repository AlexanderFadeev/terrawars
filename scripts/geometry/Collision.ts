import { Circle } from "./Circle.js";
import { Rect } from './Rect.js';
import { Vec2D } from "./Vec2D.js";

export class Collision {
    static checkCirclePoint(c: Circle, p: Vec2D): boolean {
        return c.origin.dist(p) < c.radius;
    }

    static checkPointCircle(p: Vec2D, c: Circle): boolean {
        return this.checkCirclePoint(c, p);
    }

    static checkCircleCircle(a: Circle, b: Circle): boolean {
        return a.origin.dist(b.origin) <= a.radius + b.radius;
    }

    static checkRectPoint(r: Rect, p: Vec2D): boolean {
        return r.left < p.x && p.x < r.right
            && r.up < p.y && p.y < r.down;
    }

    static checkPointRect(p: Vec2D, r: Rect): boolean {
        return this.checkRectPoint(r, p);
    }

    static checkRectCircle(r: Rect, c: Circle): boolean {
        return this.checkCirclePoint(c, r.upLeft) ||
            this.checkCirclePoint(c, r.upRight) ||
            this.checkCirclePoint(c, r.downLeft) ||
            this.checkCirclePoint(c, r.downRight) ||
            this.checkRectPoint(r, c.origin);
        // TODO
    }

    static checkCircleRect(c: Circle, r: Rect): boolean {
        return this.checkRectCircle(r, c);
    }
}
