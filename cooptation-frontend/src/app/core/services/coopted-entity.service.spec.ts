import { TestBed } from '@angular/core/testing';

import { CooptedEntityService } from './coopted-entity.service';

describe('CooptedEntityService', () => {
  let service: CooptedEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CooptedEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
