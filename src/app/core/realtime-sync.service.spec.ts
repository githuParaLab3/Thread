import { TestBed } from '@angular/core/testing';

import { RealtimeSyncService } from './realtime-sync.service';

describe('RealtimeSyncService', () => {
  let service: RealtimeSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealtimeSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
