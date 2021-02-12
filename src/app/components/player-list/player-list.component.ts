import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Player } from '../../models/player';
import { PlayerService } from '../../services/player.service';
import { WarService } from '../../services/war.service';

@Component({
  selector: 'msa-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  displayedColumns: string[] = ['countryCode', 'name', 'difficulty'];

  playerList: Observable<Player[]>;

  constructor(private playerService: PlayerService, private warService: WarService) {
    this.playerList = this.playerService.getPlayers(true);
   }

  ngOnInit(): void {
    forkJoin(this.playerService.getPlayers(true), this.warService.getWarhistory()).subscribe(([players, history]) => {
      debugger;
    });
  }
}
