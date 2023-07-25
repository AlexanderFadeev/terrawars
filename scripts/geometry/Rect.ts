import { Vec2D } from "./Vec2D.js";

export class Rect {
    constructor(upLeft: Vec2D, downRight: Vec2D) {
        this.upLeft = upLeft;
        this.downRight = downRight;
    }

    upLeft: Vec2D;
    downRight: Vec2D;

    get upRight(): Vec2D {
        return new Vec2D(this.right, this.up);
    }

    get downLeft(): Vec2D {
        return new Vec2D(this.left, this.down);
    }

    get up(): number {
        return this.upLeft.y;
    }

    get down(): number {
        return this.downRight.y;
    }

    get left(): number {
        return this.upLeft.x;
    }

    get right(): number {
        return this.downRight.x;
    }

    get width(): number {
        return this.right - this.left;
    }

    get height(): number {
        return this.down - this.up;
    }

    get center(): Vec2D {
        return this.upLeft.add(this.downRight).div(2);
    }
}
