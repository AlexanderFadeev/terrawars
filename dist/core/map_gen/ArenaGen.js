import { Map } from "./../Map.js";
import { Faction } from '../Faction.js';
import { random } from "../../util/util.js";
export class ArenaGen {
    generate(rows, cols, nFactions) {
        let map = new Map(rows, cols);
        for (let row = 0; row < rows; row++) {
            map.tiles[row][0].faction = Faction.Wall;
            map.tiles[row][cols - 1].faction = Faction.Wall;
        }
        for (let col = 0; col < cols; col++) {
            map.tiles[0][col].faction = Faction.Wall;
            map.tiles[rows - 1][col].faction = Faction.Wall;
        }
        const spacing = 5;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (Math.random() > 0.75) {
                    this.placeFaction(map, row, col, Faction.Wall.id);
                    continue;
                }
            }
        }
        for (let iter = 0; iter < 100; iter++) {
            for (let i = 1; i <= nFactions; i++) {
                this.placeFactionRandom(map, i);
            }
        }
        return map;
    }
    placeFactionRandom(map, factionId) {
        let row;
        let col;
        do {
            row = random(map.rows);
            col = random(map.cols);
        } while (map.tiles[row][col].faction.id != Faction.Neutral.id);
        this.placeFaction(map, row, col, factionId);
    }
    placeFaction(map, row, col, factionId) {
        map.tiles[row][col].faction = new Faction(factionId);
    }
}
//# sourceMappingURL=ArenaGen.js.map