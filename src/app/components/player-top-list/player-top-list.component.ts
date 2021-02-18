import { Component, OnInit } from '@angular/core';
import { WarService } from '../../services/war.service';
import { Subscription } from 'rxjs';
import { PlayerScore } from '../../models/war';

@Component({
  selector: 'msa-player-top-list',
  templateUrl: './player-top-list.component.html',
  styleUrls: ['./player-top-list.component.css']
})
export class PlayerTopListComponent implements OnInit {
  topScores: any[] = [];

  constructor(private warService: WarService) {
  }

  ngOnInit(): void {
    this.warService.getWarhistory().subscribe(h => {
      let topScores: any[] = [];
      let scoresToTake = 10;

      const nestedScores = h.map(w => w.participants);
      const scores: PlayerScore[] = ([] as PlayerScore[]).concat(...nestedScores);
      const sortedScores = scores.sort((a, b) => b.score - a.score);
      let previousMax = sortedScores.length > 1 ? sortedScores[0].score : 1000;
      let place = 1;
      sortedScores.forEach(ps => {
        if (ps.score < previousMax) {
          place++;
          previousMax = ps.score;
        }

        if (place <= scoresToTake) {
          topScores.push({ place: place, player: ps.player.name, score: ps.score });
        }
      });

      this.topScores = topScores;
    });
  }
}