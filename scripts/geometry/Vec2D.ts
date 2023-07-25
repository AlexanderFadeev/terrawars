export class Vec2D {
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static FromPolar(len: number, angle: number) {
        return new Vec2D(
            len * Math.sin(angle),
            len * Math.cos(angle)
        );
    }

    static Random(len: number) {
        let angle = Math.random() * Math.PI * 2;
        return this.FromPolar(len, angle);
    }

    get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get normal(): Vec2D {
        const len = this.length;
        if (this.length < 1e-6) {
            return Vec2D.Random(1);
        }

        return this.div(this.length);
    }

    sub(other: Vec2D): Vec2D {
        return new Vec2D(this.x - other.x, this.y - other.y);
    }

    dist(other: Vec2D): number {
        return this.sub(other).length;
    }

    mul(x: number): Vec2D {
        return new Vec2D(
            this.x * x,
            this.y * x
        );
    }

    mulScalar(other: Vec2D): number {
        return this.x * other.x + this.y * other.y;
    }

    cosTo(other: Vec2D): number {
        return this.mulScalar(other) / this.length / other.length;
    }

    get longestComponent(): Vec2D {
        if (Math.abs(this.x) > Math.abs(this.y)) {
            return new Vec2D(this.x, 0);
        } else {
            return new Vec2D(0, this.y);
        }
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

    project(other: Vec2D): Vec2D {
        return other.normal.mul(this.length * this.cosTo(other));
    }

    x: number;
    y: number;
}
