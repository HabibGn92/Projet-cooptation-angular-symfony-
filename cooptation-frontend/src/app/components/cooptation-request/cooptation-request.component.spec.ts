import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooptationRequestComponent } from './cooptation-request.component';

describe('CooptationRequestComponent', () => {
  let component: CooptationRequestComponent;
  let fixture: ComponentFixture<CooptationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CooptationRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CooptationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
