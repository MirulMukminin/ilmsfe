import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcwRequestStorageEndorsedListComponent } from './icw-request-storage-endorsed-list.component';

describe('IcwRequestStorageEndorsedListComponent', () => {
  let component: IcwRequestStorageEndorsedListComponent;
  let fixture: ComponentFixture<IcwRequestStorageEndorsedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcwRequestStorageEndorsedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcwRequestStorageEndorsedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
