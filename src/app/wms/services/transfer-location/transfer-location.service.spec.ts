import { TestBed } from '@angular/core/testing';

import { TransferLocationService } from './transfer-location.service';

describe('TransferLocationService', () => {
  let service: TransferLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
