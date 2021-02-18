import { War, WarResult } from "../models/war";

export class SeasonStats {
    /**
     *
     */
    constructor(private season: number, public matches: War[]) { }

    get name(): string {
        return `Season ${this.season}`;
    }

    get wins(): number {
        return this.matches.filter(x => x.result == WarResult.Win).length;
    }

    get loses(): number {
        return this.matches.filter(x => x.result == WarResult.Lose).length;
    }

    get victoryPoints(): number {
        return this.matches.reduce((sum, current) => sum + current.score, 0);
    }
}
