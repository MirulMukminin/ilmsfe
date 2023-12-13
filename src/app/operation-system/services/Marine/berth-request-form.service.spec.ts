import { TestBed } from '@angular/core/testing';

import { BerthRequestFormService } from './berth-request-form.service';

describe('BerthRequestFormService', () => {
  let service: BerthRequestFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BerthRequestFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
