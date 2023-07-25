import { Vec2D } from "./Vec2D.js";
export class Rect {
    constructor(upLeft, downRight) {
        this.upLeft = upLeft;
        this.downRight = downRight;
    }
    upLeft;
    downRight;
    get upRight() {
        return new Vec2D(this.right, this.up);
    }
    get downLeft() {
        return new Vec2D(this.left, this.down);
    }
    get up() {
        return this.upLeft.y;
    }
    get down() {
        return this.downRight.y;
    }
    get left() {
        return this.upLeft.x;
    }
    get right() {
        return this.downRight.x;
    }
    get width() {
        return this.right - this.left;
    }
    get height() {
        return this.down - this.up;
    }
    get center() {
        return this.upLeft.add(this.downRight).div(2);
    }
}
//# sourceMappingURL=Rect.js.map