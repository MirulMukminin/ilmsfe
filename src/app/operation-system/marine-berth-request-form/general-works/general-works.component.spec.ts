import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralWorksComponent } from './general-works.component';

describe('GeneralWorksComponent', () => {
  let component: GeneralWorksComponent;
  let fixture: ComponentFixture<GeneralWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralWorksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
