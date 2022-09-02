import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerPoleCooptationComponent } from './manager-pole-cooptation.component';

describe('ManagerPoleCooptationComponent', () => {
  let component: ManagerPoleCooptationComponent;
  let fixture: ComponentFixture<ManagerPoleCooptationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerPoleCooptationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerPoleCooptationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
