import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclestockComponent } from './vehiclestock.component';

describe('VehiclestockComponent', () => {
  let component: VehiclestockComponent;
  let fixture: ComponentFixture<VehiclestockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclestockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
