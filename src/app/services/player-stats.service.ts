import { Injectable } from '@angular/core';
import { PlayerStats, TeammateStats, OpponentStats, WinLoseStats, DaysStats } from '../models/player-stats';
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
    stats.daysStats = this.getDaysStats(player, playerBattles);
    stats.teammateStats = this.getTeammateStats(player, playerBattles);
    stats.opponentStats = this.getOpponentStats(playerBattles);

    return stats;
  }

  getPlayerWinLoseStats(player: Player, history: War[]): WinLoseStats {
    const playerBattles = history.filter(h => h.participants.some(pr => pr.player.id == player.id));
    const wins = playerBattles.filter(h => h.result == WarResult.Win).length;
    const loses = playerBattles.filter(h => h.result == WarResult.Lose).length;

    return new WinLoseStats(wins, loses);
  }

  getDaysStats(player: Player, history: War[]) : DaysStats[] {
    let result: DaysStats[] = [];
    const playerBattles = history.filter(h => h.participants.some(pr => pr.player.id == player.id));

    result.push(new DaysStats('Tue', this.statsByDay(playerBattles, 2)));
    result.push(new DaysStats('Wed', this.statsByDay(playerBattles, 3)));
    result.push(new DaysStats('Thu', this.statsByDay(playerBattles, 4)));
    result.push(new DaysStats('Fri', this.statsByDay(playerBattles, 5)));
    result.push(new DaysStats('Sat', this.statsByDay(playerBattles, 6)));
    result.push(new DaysStats('Sun', this.statsByDay(playerBattles, 0)));
    return result;
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

  private statsByDay(history: War[], day: number): WinLoseStats {
    const wins = history.filter(r => r.date.getDay() == day && r.result == WarResult.Win).length;
    const loses = history.filter(r => r.date.getDay() == day && r.result == WarResult.Lose).length;
    
    return new WinLoseStats(wins, loses);
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
