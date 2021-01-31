import { Injectable } from '@angular/core';
import { War } from '../models/war';
import { PlayerService } from './player.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarService {
  private proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  private playerScoreUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTrOl6_y7SWwOEcXY3gUhhk4fCHF3M10DTmkNIvUqRFx38kBbEyhNujw56a7GkBGtPC2cCqmYlLYMk9/pub?gid=526121686&single=true&output=csv';
  private teamScoreUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTrOl6_y7SWwOEcXY3gUhhk4fCHF3M10DTmkNIvUqRFx38kBbEyhNujw56a7GkBGtPC2cCqmYlLYMk9/pub?gid=37365078&single=true&output=csv';

  private warResults = [];

  constructor(private playerService: PlayerService, private http: HttpClient) { }

  getWarhistory(): Observable<War[]> {
     if(this.warResults.length > 0)
       return of(this.warResults);

     const playerPromise = this.playerService.getPlayers(false);
     const playerScorePromise = this.http.get(`${this.proxyUrl}${this.playerScoreUrl}`, {
      responseType: 'text'
     });
     const teamScorePromise = this.http.get(`${this.proxyUrl}${this.teamScoreUrl}`, {
      responseType: 'text'
     });
  }
}
