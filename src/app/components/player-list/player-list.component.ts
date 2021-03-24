import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Player } from '../../models/player';
import { PlayerService } from '../../services/player.service';
import { WarService } from '../../services/war.service';
import { PlayerListModel } from './player-list';
import { WarResult, War } from '../../models/war';

@Component({
  selector: 'msa-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  displayedColumns: string[] = ['countryCode', 'name', 'wins', 'loses', 'winrate', 'winstreak'];

  playerList: PlayerListModel[];

  constructor(private playerService: PlayerService, private warService: WarService) {
    this.playerList = [];
  }

  ngOnInit(): void {
    forkJoin(this.playerService.getPlayers(true), this.warService.getWarhistory()).subscribe(([players, history]) => {
      let data: PlayerListModel[] = [];
      players.forEach(p => {
        const wins = history.filter(h => h.result == WarResult.Win && h.participants.some(pr => pr.player.id == p.id)).length;
        const loses = history.filter(h => h.result == WarResult.Lose && h.participants.some(pr => pr.player.id == p.id)).length;
        const total = wins + loses;
        const winrate = total > 0 ? Math.round(wins / (total) * 100) : 0;
        const winStreak = this.calculateWinStreak(history, p);

        const player = new PlayerListModel(p.countryCode, p.name, wins, loses, winrate, winStreak, p.profileIcon);
        data.push(player);
      });
      this.playerList = data.sort((a,b) => b.winrate - a.winrate);
    });
  }

  private calculateWinStreak(history: War[], player: Player): number {
    let streak = 0;
    const playerHistory = history.filter(h => h.participants.some(pr => pr.player.id == player.id));
    for(let i = playerHistory.length - 1; i > 0; i--) {
      if(playerHistory[i].result == WarResult.Win) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }
}
