import { make2DArray } from "../util.js";
import { Tile } from "./Tile.js"

export class Map {
    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.tiles = make2DArray(rows, cols, Tile);
    }

    tiles: Tile[][];
    readonly rows: number;
    readonly cols: number;
}
