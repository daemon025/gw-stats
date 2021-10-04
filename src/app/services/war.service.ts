import { Injectable } from '@angular/core';
import { War, WarResult } from '../models/war';
import { PlayerService } from './player.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin, empty } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WarService {
  private warResults: War[] = [];

  constructor(private playerService: PlayerService, private http: HttpClient) { }

  getWarhistory(): Observable<War[]> {
    if (this.warResults.length > 0)
      return of(this.warResults);

    const playerPromise = this.playerService.getPlayers(false);
    const playerScorePromise = this.http.get(environment.playerScoresUrl, {
      responseType: 'text'
    });
    const teamScorePromise = this.http.get(environment.teamScoresUrl, {
      responseType: 'text'
    });

    return forkJoin([playerPromise, playerScorePromise, teamScorePromise])
      .pipe(map(([players, playerScoresCsv, teamScoresCsv]) => {
        const warResults: War[] = [];
        const playerScores = this.parsePlayerScores(playerScoresCsv);
        const teamScores = this.parseTeamScores(teamScoresCsv);
        let id = 0;
        teamScores.forEach((ts) => {
          const date = this.parseDate(ts.day);
          const teamScore = parseInt(ts.score);
          const result = ts.result === 'win' ? WarResult.Win : WarResult.Lose;
          const season = parseInt(ts.season);
          const opponent = ts.opponent;
          let war = new War(++id, date, teamScore, result, season, opponent);

          playerScores.filter(ps => ps.day == ts.day).forEach((ps) => {
            const score = parseInt(ps.score);
            const player = players.find(p => p.name == ps.name);
            if (!player) {
              throw new Error(`Player ${ps.name} was not found!`);
            } else {
              war.addPlayerScore(player, score);
            }
          });

          warResults.push(war);
        });

        this.warResults = warResults;
        return this.warResults;
      }), catchError((err, caught) => {
        console.log(err);
        return empty();
      }));
  }

  private parseDate(day: string): Date {
    const dateParts = day.split('/');
    return new Date(parseInt(dateParts[2], 10),
      parseInt(dateParts[1], 10) - 1,
      parseInt(dateParts[0], 10));
  }

  private parsePlayerScores(playerScoresCsv: string): PlayerScoreCsvModel[] {
    let playerScores: PlayerScoreCsvModel[] = [];
    const lines = playerScoresCsv.split('\r\n');
    const header = lines[0].split(',');

    for (var i = 1; i < lines.length; i++) {
      const arr = lines[i].split(',');

      const day = arr[header.indexOf('Day')].trim();
      const name = arr[header.indexOf('Player')].trim();
      const score = arr[header.indexOf('Score')].trim();

      const playerScore = new PlayerScoreCsvModel(day, name, score);
      playerScores.push(playerScore);
    }

    return playerScores;
  }

  private parseTeamScores(teamScoresCsv: string): TeamScoreCsvModel[] {
    let teamScores: TeamScoreCsvModel[] = [];
    const lines = teamScoresCsv.split('\r\n');
    const header = lines[0].split(',');

    for (var i = 1; i < lines.length; i++) {
      const arr = lines[i].split(',');

      const day = arr[header.indexOf('Day')].trim();
      const score = arr[header.indexOf('Score')].trim();
      const players = arr[header.indexOf('Players')].trim();
      const result = arr[header.indexOf('Outcome')].trim();
      const season = arr[header.indexOf('Season')].trim();
      const opponent = arr[header.indexOf('Opponent')].trim();
      const rank = arr[header.indexOf('Rank')].trim();

      const teamScore = new TeamScoreCsvModel(day, score, players, result, season, opponent, rank);
      teamScores.push(teamScore);
    }

    return teamScores;
  }
}

class PlayerScoreCsvModel {
  constructor(public day: string, public name: string, public score: string) { }
}

class TeamScoreCsvModel {
  /**
   *
   */
  constructor(
    public day: string,
    public score: string,
    public players: string,
    public result: string,
    public season: string,
    public opponent: string,
    public rank: string) { }
}
