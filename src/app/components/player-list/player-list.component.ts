import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../../models/player';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'msa-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  playerList: Observable<Player[]>;
  constructor(private playerService: PlayerService) {
    this.playerList = this.playerService.getPlayers(true);
   }

  ngOnInit(): void {
  }

}
