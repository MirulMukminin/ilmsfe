import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineEndorseBodListComponent } from './marine-endorse-bod-list.component';

describe('MarineEndorseBodListComponent', () => {
  let component: MarineEndorseBodListComponent;
  let fixture: ComponentFixture<MarineEndorseBodListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineEndorseBodListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineEndorseBodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
