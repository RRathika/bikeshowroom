import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancebookComponent } from './advancebook.component';

describe('AdvancebookComponent', () => {
  let component: AdvancebookComponent;
  let fixture: ComponentFixture<AdvancebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancebookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
