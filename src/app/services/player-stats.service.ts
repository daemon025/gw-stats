import { Injectable } from '@angular/core';
import { PlayerStats, TeammateStats, OpponentStats, WinLoseStats } from '../models/player-stats';
import { Player } from '../models/player';
import { War, WarResult } from '../models/war';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatsService {

  constructor() { }

  getPlayerStats(player: Player, history: War[]): PlayerStats {
    let stats = new PlayerStats();
    const playerBattles = history.filter(h => h.participants.some(pr => pr.player.id == player.id));
    const wins = playerBattles.filter(h => h.result == WarResult.Win).length;
    const loses = playerBattles.filter(h => h.result == WarResult.Lose).length;
    stats.winLoseStats = new WinLoseStats(wins, loses);
    stats.winStreak = this.calculateWinStreak(playerBattles, player);

    stats.resultOnTue = this.statsByDay(playerBattles, 2);
    stats.resultOnWed = this.statsByDay(playerBattles, 3);
    stats.resultOnThu = this.statsByDay(playerBattles, 4);
    stats.resultOnFri = this.statsByDay(playerBattles, 5);
    stats.resultOnSat = this.statsByDay(playerBattles, 6);
    stats.resultOnSun = this.statsByDay(playerBattles, 0);

    stats.teammateStats = this.getTeammateStats(player, playerBattles);
    stats.opponentStats = this.getOpponentStats(playerBattles);

    return stats;
  }
  
  
  private calculateWinStreak(history: War[], player: Player): number {
    let streak = 0;
    const playerHistory = history.filter(h => h.participants.some(pr => pr.player.id == player.id));
    for(let i = playerHistory.length - 1; i >= 0; i--) {
      if(playerHistory[i].result == WarResult.Win) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }

  private statsByDay(history: War[], day: number):string {
    const wins = history.filter(r => r.date.getDay() == day && r.result == WarResult.Win).length;
    const loses = history.filter(r => r.date.getDay() == day && r.result == WarResult.Lose).length;
    const winrate = (wins+loses) > 0 ? Math.round(wins / (wins+loses) * 100) : 0;
    return `${wins}-${loses} (${winrate}%)`;
  }

  private getTeammateStats(player: Player, playerBattles: War[]): TeammateStats[] {
    let teammates: TeammateStats[] = [];

    playerBattles.forEach(pb => {
      pb.participants.filter(p => p.player.id != player.id).forEach(p => {
        
        let teammate = teammates.find(t => t.player.id == p.player.id); 
        if(!teammate) {
          teammate = new TeammateStats(p.player);
          teammates.push(teammate);
        } 

        teammate.addGame(pb.result);
      });
    });

    return teammates;
  }

  private getOpponentStats(playerBattles: War[]): OpponentStats[] {
    let stats: OpponentStats[] = [];

    playerBattles.forEach(w => {

      const stat = new OpponentStats(w.opponent, w.season, w.opponentRank, w.result, this.getMSARank(w.season));
      stats.push(stat);
    });

    return stats;
  }

  private getMSARank(season: number) {
    switch (season) {
      case 6:
        return 89;
      case 7:
        return 49;
      case 8:
        return 33;
        case 9:
        return 43;
      default:
        return 9999;
    }
  }
}
