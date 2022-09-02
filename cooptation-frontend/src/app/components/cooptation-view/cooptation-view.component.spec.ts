import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooptationViewComponent } from './cooptation-view.component';

describe('CooptationViewComponent', () => {
  let component: CooptationViewComponent;
  let fixture: ComponentFixture<CooptationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CooptationViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CooptationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
