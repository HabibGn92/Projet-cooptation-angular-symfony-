import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityCooptedFormComponent } from './identity-coopted-form.component';

describe('IdentityCooptedFormComponent', () => {
  let component: IdentityCooptedFormComponent;
  let fixture: ComponentFixture<IdentityCooptedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentityCooptedFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityCooptedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
