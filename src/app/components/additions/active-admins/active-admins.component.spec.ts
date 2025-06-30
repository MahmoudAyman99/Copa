import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveAdminsComponent } from './active-admins.component';

describe('ActiveAdminsComponent', () => {
  let component: ActiveAdminsComponent;
  let fixture: ComponentFixture<ActiveAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveAdminsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
