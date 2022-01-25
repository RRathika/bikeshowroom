import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslistComponent } from './translist.component';

describe('TranslistComponent', () => {
  let component: TranslistComponent;
  let fixture: ComponentFixture<TranslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
