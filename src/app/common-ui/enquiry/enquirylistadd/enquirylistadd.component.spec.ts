import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquirylistaddComponent } from './enquirylistadd.component';

describe('EnquirylistaddComponent', () => {
  let component: EnquirylistaddComponent;
  let fixture: ComponentFixture<EnquirylistaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquirylistaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquirylistaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
