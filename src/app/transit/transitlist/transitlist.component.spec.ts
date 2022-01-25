import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitlistComponent } from './transitlist.component';

describe('TransitlistComponent', () => {
  let component: TransitlistComponent;
  let fixture: ComponentFixture<TransitlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransitlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
