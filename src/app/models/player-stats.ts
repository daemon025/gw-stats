import { Player } from "./player";
import { WarResult } from "./war";

export class PlayerStats {
  winLoseStats: WinLoseStats;
  winStreak: number;

  resultOnTue: string;
  resultOnWed: string;
  resultOnThu: string;
  resultOnFri: string;
  resultOnSat: string;
  resultOnSun: string;
  teammateStats: TeammateStats[];
  opponentStats: OpponentStats[];

  get winrate(): number {
    return this.winLoseStats.winrate;
  }

  get top3TeammatesByWinrate(): TeammateStats[] {
    return this.teammateStats.filter(t => t.player.active || t.totalGames >= 5).sort((a, b) => b.winrate - a.winrate || b.totalGames - a.totalGames).slice(0, 5);
  }

  get top3TeammatesByGamesPlayed(): TeammateStats[] {
    return this.teammateStats.sort((a, b) => b.totalGames - a.totalGames || b.winrate - a.winrate).slice(0, 5);
  }

  get top5Opponents(): OpponentStats[] {
    return this.opponentStats.sort((a, b) => a.opponentRank - b.opponentRank).slice(0, 10);
  }
}

export class WinLoseStats {
  /**
   *
   */
  constructor(public wins: number, public loses: number) {
  }

  get winrate() {
    const total = this.wins + this.loses;
    return total > 0 ? Math.round(this.wins / (total) * 100) : 0;
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

export class OpponentStats {
  /**
   *
   */
  constructor(public name: string, public season: number, public opponentRank: number, public warResult: WarResult, public rank: number) {
  }
}