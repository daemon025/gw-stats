import { Injectable } from '@angular/core';
import { TeamStats } from '../models/team-stats';
import { War } from '../models/war';

@Injectable({
  providedIn: 'root'
})
export class TeamStatsService {

  constructor() { }

  getTeamStats(battles: War[]): TeamStats[] {
    let teamStats: TeamStats[] = [];

    teamStats.push(this.getStatsByPlayerNumber(5, battles));
    teamStats.push(this.getStatsByPlayerNumber(6, battles));
    teamStats.push(this.getStatsByPlayerNumber(7, battles));
    teamStats.push(this.getStatsByPlayerNumber(8, battles));
    teamStats.push(this.getStatsByPlayerNumber(9, battles));
    teamStats.push(this.getStatsByPlayerNumber(10, battles));

    return teamStats;
  }

  private getStatsByPlayerNumber(noOfPlayers: number, battles: War[]): TeamStats {
    const stats = battles.filter(w => w.participants.length == noOfPlayers)
      .sort((a, b) => b.score - a.score)
      .splice(0, 5)
      .map(w => w.score);

    return new TeamStats(noOfPlayers, stats);
  }
}
