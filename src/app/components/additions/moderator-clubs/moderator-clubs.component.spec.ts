import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorClubsComponent } from './moderator-clubs.component';

describe('ModeratorClubsComponent', () => {
  let component: ModeratorClubsComponent;
  let fixture: ComponentFixture<ModeratorClubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeratorClubsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModeratorClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
