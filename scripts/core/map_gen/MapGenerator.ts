import { Map } from "./../Map.js"

export interface MapGenerator {
    generate(rows: number, cols: number, nFactions: number): Map;
}
