import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListyardtransferComponent } from './listyardtransfer.component';

describe('ListyardtransferComponent', () => {
  let component: ListyardtransferComponent;
  let fixture: ComponentFixture<ListyardtransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListyardtransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListyardtransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
