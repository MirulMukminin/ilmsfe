import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcwAsEndorsedViewComponent } from './icw-as-endorsed-view.component';

describe('IcwAsEndorsedViewComponent', () => {
  let component: IcwAsEndorsedViewComponent;
  let fixture: ComponentFixture<IcwAsEndorsedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcwAsEndorsedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcwAsEndorsedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
