export class Faction {
    readonly id: number;

    constructor(id: number) {
        this.id = id;
    }

    isWall(): boolean {
        return this.id < 0;
    }

    isNeutral(): boolean {
        return this.id == 0;
    }

    isPlayer(): boolean {
        return this.id > 0;
    }

    static get Wall(): Faction {
        return new Faction(-1);
    }

    static get Neutral(): Faction {
        return new Faction(0);
    }
}
