import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwcyCwInventoriesComponent } from './cwcy-cw-inventories.component';

describe('CwcyCwInventoriesComponent', () => {
  let component: CwcyCwInventoriesComponent;
  let fixture: ComponentFixture<CwcyCwInventoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwcyCwInventoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwcyCwInventoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
