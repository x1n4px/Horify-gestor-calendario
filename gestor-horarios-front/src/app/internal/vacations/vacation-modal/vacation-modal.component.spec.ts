import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationModalComponent } from './vacation-modal.component';

describe('VacationModalComponent', () => {
  let component: VacationModalComponent;
  let fixture: ComponentFixture<VacationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
