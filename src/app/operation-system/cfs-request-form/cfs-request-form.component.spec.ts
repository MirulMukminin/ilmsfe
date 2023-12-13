import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsRequestFormComponent } from './cfs-request-form.component';

describe('CfsRequestFormComponent', () => {
  let component: CfsRequestFormComponent;
  let fixture: ComponentFixture<CfsRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfsRequestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
