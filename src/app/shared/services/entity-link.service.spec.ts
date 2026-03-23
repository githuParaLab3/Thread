import { TestBed } from '@angular/core/testing';

import { EntityLinkService } from './entity-link.service';

describe('EntityLinkService', () => {
  let service: EntityLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
