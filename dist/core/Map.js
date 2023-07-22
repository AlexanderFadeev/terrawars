import { make2DArray } from "../util.js";
import { Tile } from "./Tile.js";
export class Map {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.tiles = make2DArray(rows, cols, Tile);
    }
    tiles;
    rows;
    cols;
}
//# sourceMappingURL=Map.js.map