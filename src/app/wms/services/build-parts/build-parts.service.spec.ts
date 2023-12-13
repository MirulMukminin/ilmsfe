import { TestBed } from '@angular/core/testing';

import { BuildPartsService } from './build-parts.service';

describe('BuildPartsService', () => {
  let service: BuildPartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildPartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
