import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorAdminsComponent } from './moderator-admins.component';

describe('ModeratorAdminsComponent', () => {
  let component: ModeratorAdminsComponent;
  let fixture: ComponentFixture<ModeratorAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeratorAdminsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModeratorAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
