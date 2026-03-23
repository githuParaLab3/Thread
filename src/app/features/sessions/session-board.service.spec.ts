import { TestBed } from '@angular/core/testing';

import { SessionBoardService } from './session-board.service';

describe('SessionBoardService', () => {
  let service: SessionBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
