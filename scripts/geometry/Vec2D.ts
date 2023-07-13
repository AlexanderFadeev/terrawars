export class Vec2D {
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static Random(len: number) {
        let angle = Math.random() * Math.PI * 2;
        return new Vec2D(
            len * Math.sin(angle),
            len * Math.cos(angle)
        )
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    sub(other: Vec2D): Vec2D {
        return new Vec2D(this.x - other.x, this.y - other.y);
    }

    dist(other: Vec2D): number {
        return this.sub(other).length();
    }

    mul(x: number): Vec2D {
        return new Vec2D(
            this.x * x,
            this.y * x
        );
    }

    div(x: number): Vec2D {
        return this.mul(1 / x);
    }

    add(other: Vec2D): Vec2D {
        return new Vec2D(
            this.x + other.x,
            this.y + other.y
        );
    }

    x: number;
    y: number;
}
