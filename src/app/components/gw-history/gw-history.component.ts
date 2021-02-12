import { Component, OnInit } from '@angular/core';
import { WarService } from '../../services/war.service';
import { Observable } from 'rxjs';
import { War } from '../../models/war';

@Component({
  selector: 'msa-gw-history',
  templateUrl: './gw-history.component.html',
  styleUrls: ['./gw-history.component.css']
})
export class GwHistoryComponent implements OnInit {
  results: Observable<War[]>;

  constructor(private warService: WarService) {
    this.results = this.warService.getWarhistory();
   }

  ngOnInit(): void {
  }

}
