import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcwRequestStorageListComponent } from './icw-request-storage-list.component';

describe('IcwRequestStorageListComponent', () => {
  let component: IcwRequestStorageListComponent;
  let fixture: ComponentFixture<IcwRequestStorageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcwRequestStorageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcwRequestStorageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
