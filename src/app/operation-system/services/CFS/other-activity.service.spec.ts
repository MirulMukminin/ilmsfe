import { TestBed } from '@angular/core/testing';

import { OtherActivityService } from './other-activity.service';

describe('OtherActivityService', () => {
  let service: OtherActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
