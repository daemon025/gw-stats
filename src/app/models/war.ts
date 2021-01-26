import { Player } from "./player";

export class War {
    private _scores: PlayerScore[] = [];

    constructor(
        public date: Date, 
        public score: number, 
        public result: WarResult) {
    }

    addPlayerScore(player: Player, score: number) {
        const playerScore = new PlayerScore(player, score);
        this._scores.push(playerScore);
    }

    get participants() {
        return this._scores;
    }
}

export enum WarResult {
    Lose = 0,
    Win = 1
}

export class PlayerScore {
    constructor(public player: Player, public score: number) {
        
    }
}
