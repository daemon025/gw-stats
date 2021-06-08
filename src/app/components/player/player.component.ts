import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { WarService } from '../../services/war.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { Player } from '../../models/player';
import { PlayerInfo } from './player-info';
import { WarResult, War } from '../../models/war';
import { PlayerStatsService } from '../../services/player-stats.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {
  private routeSub$: Subscription;
  private playersSub$: Subscription;
  private players: Player[];
  private history: War[];

  player: PlayerInfo;

  constructor(private route: ActivatedRoute, private playerService: PlayerService, private warService: WarService, private statsService: PlayerStatsService) { }

  ngOnInit(): void {
    this.routeSub$ = this.route.params.subscribe(params => {
      const id = parseInt(params['id']);
      forkJoin(this.playerService.getPlayers(false), this.warService.getWarhistory()).subscribe(([players, history]) => {
        this.players = players;
        this.history = history;

        const player: Player | undefined = this.players.find(p => p.id == id);
        if (player) {
          const stats = this.statsService.getPlayerStats(player, history);
          this.player = new PlayerInfo(player, stats, history);
        }
      });
    });
  }
    
  ngOnDestroy() {
    this.routeSub$?.unsubscribe();
    this.playersSub$?.unsubscribe();
  }

  getPlayerVP(match: War) {
    const stats = match.participants.find(p => p.player.name == this.player.name);
    return stats ? stats.score : 0;
  }
}
