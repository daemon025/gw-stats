import { Injectable } from '@angular/core';
import { PlayerStats } from '../models/player-stats';
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
    stats.wins = playerBattles.filter(h => h.result == WarResult.Win).length;
    stats.loses = playerBattles.filter(h => h.result == WarResult.Lose).length;
    stats.winStreak = this.calculateWinStreak(playerBattles, player);

    stats.resultOnTue = this.statsByDay(playerBattles, 2);
    stats.resultOnWed = this.statsByDay(playerBattles, 3);
    stats.resultOnThu = this.statsByDay(playerBattles, 4);
    stats.resultOnFri = this.statsByDay(playerBattles, 5);
    stats.resultOnSat = this.statsByDay(playerBattles, 6);
    stats.resultOnSun = this.statsByDay(playerBattles, 0);

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
    
    return `${wins}-${loses}`;
  }
}
