import { TestBed } from '@angular/core/testing';

import { GraphOrganizerService } from './graph-organizer.service';

describe('GraphOrganizerService', () => {
  let service: GraphOrganizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphOrganizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
