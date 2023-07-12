import { Point } from "./Point.js";

export class Rect {
    constructor(upLeft: Point, downRight: Point) {
        this.upLeft = upLeft;
        this.downRight = downRight;
    }

    upLeft: Point;
    downRight: Point;

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
