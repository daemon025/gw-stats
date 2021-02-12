import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player, ProfileIcon } from '../models/player';
import { Observable, of, empty } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private proxyUrl = '';//'https://cors-anywhere.herokuapp.com/';
  private playerListUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTrOl6_y7SWwOEcXY3gUhhk4fCHF3M10DTmkNIvUqRFx38kBbEyhNujw56a7GkBGtPC2cCqmYlLYMk9/pub?gid=0&single=true&output=csv';
  private players: Player[] = [];

  constructor(private http: HttpClient) { }

  getPlayers(onlyActive: boolean): Observable<Player[]> {
    if (this.players.length > 0)
      return of(this.players.filter(p => p.active));

    const requestUrl = `${this.proxyUrl}${this.playerListUrl}`;

    return this.http.get(requestUrl, {
      responseType: 'text'
    }).pipe(
        shareReplay(1),
        map((response: string) => {
          const players = [];
          const lines = response.split('\r\n');
          const header = lines[0].split(',');

          for (var i = 1; i < lines.length; i++) {
            const arr = lines[i].split(',');

            const id = parseInt(arr[header.indexOf('Id')].trim());
            const name = arr[header.indexOf('Name')].trim();
            const active = (/true/i).test(arr[header.indexOf('Active')].trim());
            const border = parseInt(arr[header.indexOf('Border')].trim());
            const icon = parseInt(arr[header.indexOf('Icon')].trim());
            const color = parseInt(arr[header.indexOf('Color')].trim());
            const country = arr[header.indexOf('Country')].trim();
            const difficulty = parseInt(arr[header.indexOf('Difficulty')].trim());

            const profileIcon = new ProfileIcon(border, color, icon);
            const player = new Player(id, name, active, profileIcon, country, difficulty);
            players.push(player);
          }

          this.players = players;
          return this.players.filter(p => p.active);
        }),
        catchError((err, caught) => {
          console.log(err);
          return empty();
        }));
  }
}
