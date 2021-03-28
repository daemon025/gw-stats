export class Sector {
    id: SectorIdentifier;
    maps: Map[];
    bonus: number;

    /**
     *
     */
    constructor(name: string, difficultyRange: string, bonus: number, mapVPs: number[]) {
        this.id = new SectorIdentifier(name);
        this.bonus = bonus;

        this.initMaps(difficultyRange, mapVPs);
    }

    private initMaps(difficultyRange: string, mapVPs: number[]) {
        const is8MapSector = mapVPs.length === 8;
        const difficultyRangeArr = difficultyRange.split('-');
        const difficultyOffsetMin = parseInt(difficultyRangeArr[0]);
        this.maps = [];

        if (is8MapSector) {
            this.addMaps(difficultyOffsetMin, mapVPs[0], mapVPs[1]);
            this.addMaps(difficultyOffsetMin+1, mapVPs[2], mapVPs[3]);
            this.addMaps(difficultyOffsetMin+1, mapVPs[4], mapVPs[5]);
            this.addMaps(difficultyOffsetMin+2, mapVPs[6], mapVPs[7]);
        } else {
            this.addMaps(difficultyOffsetMin, mapVPs[0], mapVPs[1], mapVPs[2]);
            this.addMaps(difficultyOffsetMin+1, mapVPs[3], mapVPs[4], mapVPs[5]);
            this.addMaps(difficultyOffsetMin+1, mapVPs[6], mapVPs[7], mapVPs[8]);
            this.addMaps(difficultyOffsetMin+2, mapVPs[9], mapVPs[10], mapVPs[11]);
        }
    }

    private addMaps(difficulty: number, ...maps: number[]) {
        for (let i = 0; i < maps.length - 2; i++) {
            this.maps.push(new Map(difficulty, maps[i], false));
        }

        this.maps.push(new Map(0, maps[maps.length - 1], true));
    }
}

export class SectorIdentifier {
    number: number;
    letter: string;

    /**
     *
     */
    constructor(name: string) {
        const splited = name.split('-');
        this.number = parseInt(splited[0]);
        this.letter = splited[1];
    }

    get name(): string {
        return `${this.number} - ${this.letter}`;
    }
}

export class Map {
    /**
     *
     */
    constructor(public difficulty: number, public vp: number, public isPvp: boolean) {

    }
}
