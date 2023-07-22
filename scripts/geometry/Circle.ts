import { Vec2D } from './Vec2D';

export class Circle {
    constructor(origin: Vec2D, radius: number) {
        this.origin = origin;
        this.radius = radius;
    }

    origin: Vec2D;
    radius: number;
}
