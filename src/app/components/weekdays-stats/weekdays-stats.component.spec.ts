import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekdaysStatsComponent } from './weekdays-stats.component';

describe('WeekdaysStatsComponent', () => {
  let component: WeekdaysStatsComponent;
  let fixture: ComponentFixture<WeekdaysStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekdaysStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekdaysStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
