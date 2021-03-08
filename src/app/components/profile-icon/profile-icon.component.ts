import { Component, OnInit, Input } from '@angular/core';
import { ProfileIcon } from '../../models/player';

@Component({
  selector: 'profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.css']
})
export class ProfileIconComponent implements OnInit {
  @Input('icon') profileIcon: ProfileIcon;

  constructor() { }

  ngOnInit(): void {
  }

}
