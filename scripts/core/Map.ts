import { Tile } from "./Tile.js"
import * as util from "./../util.js"

export class Map {
    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.tiles = util.make2DArray(rows, cols, Tile);
    }

    tiles: Tile[][];
    readonly rows: number;
    readonly cols: number;
}
