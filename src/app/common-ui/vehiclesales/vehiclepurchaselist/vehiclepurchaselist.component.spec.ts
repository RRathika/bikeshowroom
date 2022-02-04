import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclepurchaselistComponent } from './vehiclepurchaselist.component';

describe('VehiclepurchaselistComponent', () => {
  let component: VehiclepurchaselistComponent;
  let fixture: ComponentFixture<VehiclepurchaselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclepurchaselistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclepurchaselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
