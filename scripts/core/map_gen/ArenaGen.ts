import { MapGenerator } from "./MapGenerator.js"
import { Map } from "./../Map.js"
import { Faction } from '../Faction.js';
import { random } from "../../util.js";

export class ArenaGen implements MapGenerator {
    generate(rows: number, cols: number, nFactions: number): Map {
        let map = new Map(rows, cols);
        for (let row = 0; row < rows; row++) {
            map.tiles[row][0].faction = Faction.Wall;
            map.tiles[row][cols - 1].faction = Faction.Wall;
        }
        for (let col = 0; col < cols; col++) {
            map.tiles[0][col].faction = Faction.Wall;
            map.tiles[rows - 1][col].faction = Faction.Wall;
        }

        for (let i = 1; i <= nFactions; i++) {
            this.placeFaction(map, i);
        }

        return map;
    }

    placeFaction(map: Map, factionId: number) {
        // TODO: possible infinite loop
        let row: number;
        let col: number;
        do {
            row = random(map.rows);
            col = random(map.cols);
        } while (map.tiles[row][col].faction.id != Faction.Neutral.id)
        map.tiles[row][col].faction = new Faction(factionId);
    }
}
