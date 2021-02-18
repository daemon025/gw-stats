import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { WarService } from '../../services/war.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Player } from '../../models/player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {
  private routeSub$: Subscription;
  private playersSub$: Subscription;

  player: Player | undefined;
  
  constructor(private route: ActivatedRoute, private playerService: PlayerService, private warService: WarService) { }

  ngOnInit(): void {
    this.routeSub$ = this.route.params.subscribe(params => {
      const id = parseInt(params['id']);
      this.playersSub$ = this.playerService.getPlayers(false).subscribe(r => {
        this.player = r.find(p => p.id == id);
      });
    });
  }

  ngOnDestroy() {
    this.routeSub$?.unsubscribe();
    this.playersSub$?.unsubscribe();
  }

}
