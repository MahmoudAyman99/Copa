import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManClubDetailsComponent } from './man-club-details.component';

describe('ManClubDetailsComponent', () => {
  let component: ManClubDetailsComponent;
  let fixture: ComponentFixture<ManClubDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManClubDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManClubDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
