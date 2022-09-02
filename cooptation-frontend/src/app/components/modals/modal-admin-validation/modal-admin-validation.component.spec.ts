import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminValidationComponent } from './modal-admin-validation.component';

describe('ModalAdminValidationComponent', () => {
  let component: ModalAdminValidationComponent;
  let fixture: ComponentFixture<ModalAdminValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdminValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdminValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
