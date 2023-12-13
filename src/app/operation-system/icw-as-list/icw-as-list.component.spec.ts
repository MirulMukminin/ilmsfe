import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcwAsListComponent } from './icw-as-list.component';

describe('IcwAsListComponent', () => {
  let component: IcwAsListComponent;
  let fixture: ComponentFixture<IcwAsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcwAsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcwAsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
