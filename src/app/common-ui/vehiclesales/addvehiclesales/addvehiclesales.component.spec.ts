import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvehiclesalesComponent } from './addvehiclesales.component';

describe('AddvehiclesalesComponent', () => {
  let component: AddvehiclesalesComponent;
  let fixture: ComponentFixture<AddvehiclesalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddvehiclesalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvehiclesalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
