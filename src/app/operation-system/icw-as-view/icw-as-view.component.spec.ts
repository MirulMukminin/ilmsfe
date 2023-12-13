import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcwAsViewComponent } from './icw-as-view.component';

describe('IcwAsViewComponent', () => {
  let component: IcwAsViewComponent;
  let fixture: ComponentFixture<IcwAsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcwAsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcwAsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
