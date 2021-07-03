import { Component, Input, OnInit } from '@angular/core';
import { DaysStats, WinLoseStats } from '../../models/player-stats';

@Component({
  selector: 'gw-weekdays-stats',
  templateUrl: './weekdays-stats.component.html',
  styleUrls: ['./weekdays-stats.component.css']
})
export class WeekdaysStatsComponent implements OnInit {
  @Input() stats: DaysStats[];

  constructor() { }

  ngOnInit(): void {
  }

  getBackgroundColor(stats: WinLoseStats): string {
    if (stats.wins === 0 && stats.loses === 0)
      return '#777777';
    
      if(stats.winrate <= 25)
        return '#D9534F';
      else if(stats.winrate > 25 && stats.winrate <= 50)
        return '#F0AD4E';
      else if(stats.winrate > 50 && stats.winrate <= 75)
        return '#337AB7';
      return '#5CB85C';
  }
}
