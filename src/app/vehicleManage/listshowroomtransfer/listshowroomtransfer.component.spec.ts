import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListshowroomtransferComponent } from './listshowroomtransfer.component';

describe('ListshowroomtransferComponent', () => {
  let component: ListshowroomtransferComponent;
  let fixture: ComponentFixture<ListshowroomtransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListshowroomtransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListshowroomtransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
