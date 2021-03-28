import { Injectable } from '@angular/core';
import { Sector } from '../models/sector';
import { Observable, of, empty } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { shareReplay, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GwMapService {
  private readonly gwMapUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTrOl6_y7SWwOEcXY3gUhhk4fCHF3M10DTmkNIvUqRFx38kBbEyhNujw56a7GkBGtPC2cCqmYlLYMk9/pub?gid=1147156187&single=true&output=csv';
  private sectors: Sector[] = [];

  constructor(private http: HttpClient) { }

  getSectors(): Observable<Sector[]> {
    if (this.sectors.length > 0)
      return of(this.sectors);

    return this.http.get(this.gwMapUrl, {
      responseType: 'text'
    }).pipe(
      shareReplay(1),
      map((response: string) => {
        const sectors: Sector[] = [];
        const lines = response.split('\r\n');
        const header = lines[0].split(',');
        const mapIndexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        for (var i = 1; i < lines.length; i++) {
          const arr = lines[i].split(',');

          const name = arr[header.indexOf('Name')].trim();
          const difficultyRange = arr[header.indexOf('Diff')].trim();
          const bonus = parseInt(arr[header.indexOf('Bonus')].trim());

          let mapVPs: number[] = [];
          mapIndexes.forEach(index => {
            const mapVP = arr[header.indexOf(index.toString())].trim();
            if (mapVP) {
              mapVPs.push(parseInt(mapVP));
            }
          });

          const sector = new Sector(name, difficultyRange, bonus, mapVPs);
          sectors.push(sector);
        }

        this.sectors = sectors;
        return this.sectors;
      }),
      catchError((err, caught) => {
        console.log(err);
        return empty();
      }));
  }
}
