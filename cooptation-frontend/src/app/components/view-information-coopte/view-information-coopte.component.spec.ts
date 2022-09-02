import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInformationCoopteComponent } from './view-information-coopte.component';

describe('ViewInformationCoopteComponent', () => {
  let component: ViewInformationCoopteComponent;
  let fixture: ComponentFixture<ViewInformationCoopteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInformationCoopteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInformationCoopteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
