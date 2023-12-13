import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwcyCyInventoriesComponent } from './cwcy-cy-inventories.component';

describe('CwcyCyInventoriesComponent', () => {
  let component: CwcyCyInventoriesComponent;
  let fixture: ComponentFixture<CwcyCyInventoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwcyCyInventoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwcyCyInventoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
