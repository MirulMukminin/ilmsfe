import { TestBed } from '@angular/core/testing';

import { TransferOwnerService } from './transfer-owner.service';

describe('TransferOwnerService', () => {
  let service: TransferOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
