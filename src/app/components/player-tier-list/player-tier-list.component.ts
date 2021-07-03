import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { WarService } from '../../services/war.service';
import { forkJoin } from 'rxjs';
import { Survivor } from './survivor/survivor';
import { WarResult, PlayerScore } from '../../models/war';
import { Router } from '@angular/router';
import { PlayerStatsService } from '../../services/player-stats.service';

@Component({
  selector: 'app-player-tier-list',
  templateUrl: './player-tier-list.component.html',
  styleUrls: ['./player-tier-list.component.css']
})
export class PlayerTierListComponent implements OnInit {
  private readonly LastResultsToTake = 2;
  private readonly AdjustingNumber = -15;

  survivors: Survivor[];
  constructor(
    private playerService: PlayerService, 
    private warService: WarService, 
    private router: Router, 
    private statsService: PlayerStatsService) { }

  ngOnInit(): void {
    forkJoin(this.playerService.getPlayers(true), this.warService.getWarhistory()).subscribe(([players, history]) => {
      let data: Survivor[] = [];
      players.forEach(p => {
        const battles = history.filter(h => h.participants.some(pr => pr.player.id == p.id));
        const nestedScores = battles.map(w => w.participants);
        const scores = ([] as PlayerScore[]).concat(...nestedScores).filter(ps => ps.player.id == p.id);
        const vpScores = scores.map(ps => ps.score).sort((a,b) => b - a).slice(0, this.LastResultsToTake);
        const sum = vpScores.reduce((a, b) => a + b, 0) + this.AdjustingNumber;
        const avg = vpScores.length > 0 ? (sum / vpScores.length) : 0;
        const winLoseStats = this.statsService.getPlayerWinLoseStats(p, battles);
        const daysStats = this.statsService.getDaysStats(p, battles);
        const rarity = Math.floor(avg / 100) - 1;
        console.log(`Player: ${p.name} with average score of ${avg} has ${rarity+1} stars...${JSON.stringify(vpScores)}`);
        const team = 0;
        const player = new Survivor(p.id, p.name, p.countryCode, rarity, p.profileIcon, team, avg, winLoseStats, daysStats);
        data.push(player);
      });
      this.survivors = data;
    });
  }

  openPlayerProfile(playerId: number) {
    this.router.navigateByUrl(`/player/${playerId}`);
  }

  getWinLoseStats(player: Survivor) {

  }
}
