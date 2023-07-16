import { Faction } from "./Faction.js";

export class Tile {
    faction: Faction = Faction.Neutral;
    captureProgress = 0;

    get captured(): boolean {
        return this.captureProgress >= 1;
    }
}
