import { Circle } from "./Circle.js";
import { Rect } from './Rect.js';
import { Vec2D } from "./Vec2D.js";

export class Collision {
    static checkCircleCircle(a: Circle, b: Circle): boolean {
        return a.origin.dist(b.origin) <= a.radius + b.radius;
    }

    static checkCircleRect(c: Circle, r: Rect): boolean {
        return this.checkRectCircle(r, c);
    }

    static checkCirclePoint(c: Circle, p: Vec2D): boolean {
        return c.origin.dist(p) < c.radius;
    }

    static checkRectCircle(r: Rect, c: Circle): boolean {
        return this.checkCirclePoint(c, r.upLeft) ||
            this.checkCirclePoint(c, r.upRight) ||
            this.checkCirclePoint(c, r.downLeft) ||
            this.checkCirclePoint(c, r.downRight) ||
            this.checkRectPoint(r, c.origin);
        // TODO
    }

    static checkRectRect(a: Rect, b: Rect): boolean {
        throw new Error("unimplemented");
    }

    static checkRectPoint(r: Rect, p: Vec2D): boolean {
        return r.left < p.x && p.x < r.right
            && r.up < p.y && p.y < r.down;
    }

    static checkPointCircle(p: Vec2D, c: Circle): boolean {
        return this.checkCirclePoint(c, p);
    }

    static checkPointRect(p: Vec2D, r: Rect): boolean {
        return this.checkRectPoint(r, p);
    }

    static checkPointPoint(a: Vec2D, b: Vec2D): boolean {
        throw new Error("unimplemented");
    }
}
