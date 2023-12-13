import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcwAsEndorsedListComponent } from './icw-as-endorsed-list.component';

describe('IcwAsEndorsedListComponent', () => {
  let component: IcwAsEndorsedListComponent;
  let fixture: ComponentFixture<IcwAsEndorsedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcwAsEndorsedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcwAsEndorsedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
