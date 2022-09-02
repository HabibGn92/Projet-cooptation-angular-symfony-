import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFirstInterviewComponent } from './view-first-interview.component';

describe('ViewFirstInterviewComponent', () => {
  let component: ViewFirstInterviewComponent;
  let fixture: ComponentFixture<ViewFirstInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFirstInterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFirstInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
