import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Player } from '../../models/player';
import { PlayerService } from '../../services/player.service';
import { WarService } from '../../services/war.service';
import { PlayerListModel } from './player-list';
import { WarResult } from '../../models/war';

@Component({
  selector: 'msa-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  displayedColumns: string[] = ['countryCode', 'name', 'wins', 'loses', 'winrate'];

  playerList: PlayerListModel[];

  constructor(private playerService: PlayerService, private warService: WarService) {
    this.playerList = [];
  }

  ngOnInit(): void {
    forkJoin(this.playerService.getPlayers(true), this.warService.getWarhistory()).subscribe(([players, history]) => {
      let data: PlayerListModel[] = [];
      players.forEach(p => {
        const wins = history.filter(h => h.result == WarResult.Win && h.participants.some(pr => pr.player.name == p.name)).length;
        const loses = history.filter(h => h.result == WarResult.Lose && h.participants.some(pr => pr.player.name == p.name)).length;
        const winrate = Math.round(wins / (wins + loses) * 100);

        const player = new PlayerListModel(p.countryCode, p.name, wins, loses, winrate);
        data.push(player);
      });
      this.playerList = data.sort((a,b) => b.winrate - a.winrate);
    });
  }
}
