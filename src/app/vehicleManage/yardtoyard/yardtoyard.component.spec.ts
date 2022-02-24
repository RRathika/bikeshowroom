import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YardtoyardComponent } from './yardtoyard.component';

describe('YardtoyardComponent', () => {
  let component: YardtoyardComponent;
  let fixture: ComponentFixture<YardtoyardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YardtoyardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YardtoyardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
