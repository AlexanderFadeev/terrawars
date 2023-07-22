export class Faction {
    id;
    constructor(id) {
        this.id = id;
    }
    isWall() {
        return this.id < 0;
    }
    isNeutral() {
        return this.id == 0;
    }
    isPlayer() {
        return this.id > 0;
    }
    static get Wall() {
        return new Faction(-1);
    }
    static get Neutral() {
        return new Faction(0);
    }
    equal(f) {
        return this.id == f.id;
    }
}
//# sourceMappingURL=Faction.js.map