import { TestBed } from '@angular/core/testing';

import { EntityLoaderService } from './entity-loader.service';

describe('EntityLoaderService', () => {
  let service: EntityLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
