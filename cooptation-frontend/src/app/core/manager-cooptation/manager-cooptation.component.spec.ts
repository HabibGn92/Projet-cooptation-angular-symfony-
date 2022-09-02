import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCooptationComponent } from './manager-cooptation.component';

describe('ManagerCooptationComponent', () => {
  let component: ManagerCooptationComponent;
  let fixture: ComponentFixture<ManagerCooptationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerCooptationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerCooptationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
