import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcwAsFormComponent } from './icw-as-form.component';

describe('IcwAsFormComponent', () => {
  let component: IcwAsFormComponent;
  let fixture: ComponentFixture<IcwAsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcwAsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcwAsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
