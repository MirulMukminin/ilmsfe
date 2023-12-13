import { TestBed } from '@angular/core/testing';

import { GoodsInOutService } from './goods-in-out.service';

describe('GoodsInOutService', () => {
  let service: GoodsInOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoodsInOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
