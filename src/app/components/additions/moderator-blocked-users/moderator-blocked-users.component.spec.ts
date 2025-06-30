import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorBlockedUsersComponent } from './moderator-blocked-users.component';

describe('ModeratorBlockedUsersComponent', () => {
  let component: ModeratorBlockedUsersComponent;
  let fixture: ComponentFixture<ModeratorBlockedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeratorBlockedUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModeratorBlockedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
