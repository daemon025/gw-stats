import { Player } from "./player";
import { WarResult } from "./war";

export class PlayerStats {
  wins: number;
  loses: number;
  winStreak: number;

  resultOnTue: string;
  resultOnWed: string;
  resultOnThu: string;
  resultOnFri: string;
  resultOnSat: string;
  resultOnSun: string;
  teammateStats: TeammateStats[];

  get total(): number {
      return this.wins + this.loses;
  }

  get winrate(): number {
    return this.total > 0 ? Math.round(this.wins / (this.total) * 100) : 0;
  }

  get top3TeammatesByWinrate(): TeammateStats[] {
    return this.teammateStats.filter(t => t.player.active).sort((a, b) => b.winrate - a.winrate || b.totalGames - a.totalGames).slice(0, 5);
  }

  get top3TeammatesByGamesPlayed(): TeammateStats[] {
    return this.teammateStats.sort((a, b) => b.totalGames - a.totalGames || b.winrate - a.winrate).slice(0, 5);
  }
}

export class TeammateStats {
  private gamesPlayed: number;
  private gamesWon: number;

  constructor(public player: Player) {
    this.gamesPlayed = 0;
    this.gamesWon = 0;
  }

  addGame(warResult: WarResult) {
    if(warResult == WarResult.Win) {
      this.gamesWon++;
    }
    this.gamesPlayed++;
  }

  get winrate(): number {
    return this.gamesPlayed > 0 ? Math.round(this.gamesWon / (this.gamesPlayed) * 100) : 0;
  }

  get totalGames(): number {
    return this.gamesPlayed;
  }
}