import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeamStats } from '../../models/team-stats';
import { TeamStatsService } from '../../services/team-stats.service';
import { WarService } from '../../services/war.service';

@Component({
  selector: 'msa-team-top-list',
  templateUrl: './team-top-list.component.html',
  styleUrls: ['./team-top-list.component.css']
})
export class TeamTopListComponent implements OnInit, OnDestroy {
  teamStats: TeamStats[] = [];
  sub$: Subscription;

  constructor(private teamStatsService: TeamStatsService, private warService: WarService) { }

  ngOnInit(): void {
    this.sub$ = this.warService.getWarhistory().subscribe(h => {
      this.teamStats = this.teamStatsService.getTeamStats(h);
    });
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
}
