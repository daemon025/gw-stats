import { Component, OnInit, OnDestroy } from '@angular/core';
import { WarService } from '../../services/war.service';
import { Observable, Subscription } from 'rxjs';
import { War, WarResult } from '../../models/war';
import { SeasonStats } from '../season-stats';

@Component({
  selector: 'msa-gw-history',
  templateUrl: './gw-history.component.html',
  styleUrls: ['./gw-history.component.css']
})
export class GwHistoryComponent implements OnInit, OnDestroy {
  resultsSub$: Subscription;
  seasons: SeasonStats[] =[];
  results: War[] =[];

  constructor(private warService: WarService) { 
    this.resultsSub$ = this.warService.getWarhistory().subscribe(r => {
      this.results = r;
      const seasons = r.map(x => x.season)
        .filter((v, i, a) => a.indexOf(v) == i)
        .sort((a, b) => b - a);
      seasons.forEach(s => {
        this.seasons.push(this.getSeasonStats(s));
      });
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.resultsSub$?.unsubscribe();
  }

  getSeasonStats(season: number): SeasonStats {
    const matches = this.results
      .filter(r => r.season == season);
    return new SeasonStats(season, matches);
  }
}
