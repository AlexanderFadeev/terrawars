import { Vec2D } from "./Vec2D.js";

export class Rect {
    constructor(upLeft: Vec2D, downRight: Vec2D) {
        this.upLeft = upLeft;
        this.downRight = downRight;
    }

    upLeft: Vec2D;
    downRight: Vec2D;

    up(): number {
        return this.upLeft.y;
    }

    down(): number {
        return this.downRight.y;
    }

    left(): number {
        return this.upLeft.x;
    }

    right(): number {
        return this.downRight.x;
    }

    width(): number {
        return this.right() - this.left();
    }

    height(): number {
        return this.down() - this.up();
    }
}
