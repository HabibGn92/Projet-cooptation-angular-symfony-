import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationCoopteFormComponent } from './information-coopte-form.component';

describe('InformationCoopteFormComponent', () => {
  let component: InformationCoopteFormComponent;
  let fixture: ComponentFixture<InformationCoopteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationCoopteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationCoopteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
