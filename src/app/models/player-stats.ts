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

  get total(): number {
      return this.wins + this.loses;
  }

  get winrate(): number {
    return this.total > 0 ? Math.round(this.wins / (this.total) * 100) : 0;
  }
}