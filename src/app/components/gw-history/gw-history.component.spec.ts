import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GwHistoryComponent } from './gw-history.component';

describe('GwHistoryComponent', () => {
  let component: GwHistoryComponent;
  let fixture: ComponentFixture<GwHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GwHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GwHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
