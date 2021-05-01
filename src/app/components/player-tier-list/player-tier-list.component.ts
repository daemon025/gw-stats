import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { WarService } from '../../services/war.service';
import { forkJoin } from 'rxjs';
import { Survivor } from './survivor/survivor';
import { WarResult, PlayerScore } from '../../models/war';

@Component({
  selector: 'app-player-tier-list',
  templateUrl: './player-tier-list.component.html',
  styleUrls: ['./player-tier-list.component.css']
})
export class PlayerTierListComponent implements OnInit {
  private readonly team1 = [''];
  private readonly LastResultsToTake = 2;
  private readonly AdjustingNumber = 15;
  survivors: Survivor[];
  constructor(private playerService: PlayerService, private warService: WarService) { }

  ngOnInit(): void {
    forkJoin(this.playerService.getPlayers(false), this.warService.getWarhistory()).subscribe(([players, history]) => {
      let data: Survivor[] = [];
      players.forEach(p => {
        const battles = history.filter(h => h.result == WarResult.Win && h.participants.some(pr => pr.player.id == p.id));
        const nestedScores = battles.map(w => w.participants);
        const scores = ([] as PlayerScore[]).concat(...nestedScores).filter(ps => ps.player.id == p.id);
        const vpScores = scores.map(ps => ps.score).sort((a,b) => b - a).slice(0, this.LastResultsToTake);
        const sum = vpScores.reduce((a, b) => a + b, 0) + this.AdjustingNumber;
        const avg = vpScores.length > 0 ? (sum / vpScores.length) : 0;

        const rarity = Math.floor(avg / 100) - 1;
        console.log(`Player: ${p.name} with average score of ${avg} has ${rarity} stars...`);
        const team = this.team1.indexOf(p.name) != -1 ? 1 : 2;
        const player = new Survivor(p.name, p.countryCode, rarity, p.profileIcon, team, avg);
        data.push(player);
      });
      this.survivors = data;
    });
  }

}
