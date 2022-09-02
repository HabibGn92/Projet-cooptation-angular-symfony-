import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIdentityCooptedComponent } from './view-identity-coopted.component';

describe('ViewIdentityCooptedComponent', () => {
  let component: ViewIdentityCooptedComponent;
  let fixture: ComponentFixture<ViewIdentityCooptedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewIdentityCooptedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIdentityCooptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
