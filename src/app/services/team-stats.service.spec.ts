import { TestBed } from '@angular/core/testing';

import { TeamStatsService } from './team-stats.service';

describe('TeamStatsService', () => {
  let service: TeamStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
