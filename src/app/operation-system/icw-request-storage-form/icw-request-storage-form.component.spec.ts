import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcwRequestStorageFormComponent } from './icw-request-storage-form.component';

describe('IcwRequestStorageFormComponent', () => {
  let component: IcwRequestStorageFormComponent;
  let fixture: ComponentFixture<IcwRequestStorageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcwRequestStorageFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcwRequestStorageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
