import { TestBed } from '@angular/core/testing';

import { GwMapService } from './gw-map.service';

describe('GwMapService', () => {
  let service: GwMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GwMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
