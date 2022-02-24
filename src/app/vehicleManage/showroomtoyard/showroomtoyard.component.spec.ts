import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowroomtoyardComponent } from './showroomtoyard.component';

describe('ShowroomtoyardComponent', () => {
  let component: ShowroomtoyardComponent;
  let fixture: ComponentFixture<ShowroomtoyardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowroomtoyardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowroomtoyardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
