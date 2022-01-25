import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLeftNavMenuComponent } from './main-left-nav-menu.component';

describe('MainLeftNavMenuComponent', () => {
  let component: MainLeftNavMenuComponent;
  let fixture: ComponentFixture<MainLeftNavMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainLeftNavMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLeftNavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
