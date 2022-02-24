import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrolemasterComponent } from './addrolemaster.component';

describe('AddrolemasterComponent', () => {
  let component: AddrolemasterComponent;
  let fixture: ComponentFixture<AddrolemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddrolemasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrolemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
