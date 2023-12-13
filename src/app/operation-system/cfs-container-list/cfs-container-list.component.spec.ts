import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsContainerListComponent } from './cfs-container-list.component';

describe('CfsContainerListComponent', () => {
  let component: CfsContainerListComponent;
  let fixture: ComponentFixture<CfsContainerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfsContainerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsContainerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
