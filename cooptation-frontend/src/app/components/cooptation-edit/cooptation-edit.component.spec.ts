import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooptationEditComponent } from './cooptation-edit.component';

describe('CooptationEditComponent', () => {
  let component: CooptationEditComponent;
  let fixture: ComponentFixture<CooptationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CooptationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CooptationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
