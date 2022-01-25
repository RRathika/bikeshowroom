import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclepurchaseComponent } from './vehiclepurchase.component';

describe('VehiclepurchaseComponent', () => {
  let component: VehiclepurchaseComponent;
  let fixture: ComponentFixture<VehiclepurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclepurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclepurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
