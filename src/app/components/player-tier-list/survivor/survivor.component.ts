import { Component, OnInit, Input } from '@angular/core';
import { Survivor } from './survivor';

@Component({
  selector: 'app-survivor',
  templateUrl: './survivor.component.html',
  styleUrls: ['./survivor.component.css']
})
export class SurvivorComponent implements OnInit {
  @Input() survivor: Survivor;
  
  constructor() { }

  ngOnInit(): void {
  }

  getUrl(survivor: Survivor): string {
    return `url('${survivor.image}')`;
  }
}
