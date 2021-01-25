import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTopListComponent } from './team-top-list.component';

describe('TeamTopListComponent', () => {
  let component: TeamTopListComponent;
  let fixture: ComponentFixture<TeamTopListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamTopListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamTopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
