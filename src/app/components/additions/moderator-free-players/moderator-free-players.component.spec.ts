import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorFreePlayersComponent } from './moderator-free-players.component';

describe('ModeratorFreePlayersComponent', () => {
  let component: ModeratorFreePlayersComponent;
  let fixture: ComponentFixture<ModeratorFreePlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeratorFreePlayersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModeratorFreePlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
