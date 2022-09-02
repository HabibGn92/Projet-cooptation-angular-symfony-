import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstInterviewFormComponent } from './first-interview-form.component';

describe('FirstInterviewFormComponent', () => {
  let component: FirstInterviewFormComponent;
  let fixture: ComponentFixture<FirstInterviewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstInterviewFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstInterviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
