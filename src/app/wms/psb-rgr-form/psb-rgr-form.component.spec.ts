import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsbRgrFormComponent } from './psb-rgr-form.component';

describe('PsbRgrFormComponent', () => {
  let component: PsbRgrFormComponent;
  let fixture: ComponentFixture<PsbRgrFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsbRgrFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsbRgrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
