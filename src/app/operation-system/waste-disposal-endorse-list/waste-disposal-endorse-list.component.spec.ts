import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteDisposalEndorseListComponent } from './waste-disposal-endorse-list.component';

describe('WasteDisposalEndorseListComponent', () => {
  let component: WasteDisposalEndorseListComponent;
  let fixture: ComponentFixture<WasteDisposalEndorseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WasteDisposalEndorseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WasteDisposalEndorseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
