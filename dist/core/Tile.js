import { Faction } from "./Faction.js";
export class Tile {
    faction = Faction.Neutral;
    captureProgress = 0;
    get captured() {
        return this.captureProgress >= 1;
    }
}
//# sourceMappingURL=Tile.js.map