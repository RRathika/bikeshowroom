import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesaleslistComponent } from './vehiclesaleslist.component';

describe('VehiclesaleslistComponent', () => {
  let component: VehiclesaleslistComponent;
  let fixture: ComponentFixture<VehiclesaleslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclesaleslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesaleslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
