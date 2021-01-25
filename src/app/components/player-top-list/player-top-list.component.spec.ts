import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTopListComponent } from './player-top-list.component';

describe('PlayerTopListComponent', () => {
  let component: PlayerTopListComponent;
  let fixture: ComponentFixture<PlayerTopListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerTopListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerTopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
