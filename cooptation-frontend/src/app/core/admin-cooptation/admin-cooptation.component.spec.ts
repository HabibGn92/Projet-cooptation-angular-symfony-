import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCooptationComponent } from './admin-cooptation.component';

describe('AdminCooptationComponent', () => {
  let component: AdminCooptationComponent;
  let fixture: ComponentFixture<AdminCooptationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCooptationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCooptationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
