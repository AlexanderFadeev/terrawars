export function make2DArray<T>(rows: number, cols: number, type: (new () => T)): T[][] {
    let res: T[][] = [];

    for (let row = 0; row < rows; row++) {
        res[row] = [];
        for (let col = 0; col < cols; col++) {
            res[row][col] = new type();
        }
    }

    return res;
}

export function random(n: number) {
    return Math.floor(Math.random() * n);
}

export function randomInRange(from: number, to: number) {
    return from + random(to - from);
}

export function hsv2rgb(h: number, s: number, v: number): string {
    let f = (n: number, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    let r = Math.round(f(5) * 255);
    let g = Math.round(f(3) * 255);
    let b = Math.round(f(1) * 255);
    let c = r * 256 * 256 + g * 256 + b
    return "#" + Math.floor(c).toString(16).padStart(6, '0');
}
