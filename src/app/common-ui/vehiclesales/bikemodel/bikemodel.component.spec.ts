import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikemodelComponent } from './bikemodel.component';

describe('BikemodelComponent', () => {
  let component: BikemodelComponent;
  let fixture: ComponentFixture<BikemodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BikemodelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikemodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
