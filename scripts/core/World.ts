import { Map } from "./Map.js"
import { ArenaGen } from "./map_gen/ArenaGen.js"
import { MapGenerator } from "./map_gen/MapGenerator.js";

export class World {
    constructor(rows: number, cols: number, nFactions: number) {
        let gen: MapGenerator = new ArenaGen();
        this.map = gen.generate(rows, cols, nFactions);
        this.nFactions = nFactions;
    }

    map: Map;
    nFactions: number;
}
