import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooptationsHeaderComponent } from './cooptations-header.component';

describe('CooptationsHeaderComponent', () => {
  let component: CooptationsHeaderComponent;
  let fixture: ComponentFixture<CooptationsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CooptationsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CooptationsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
