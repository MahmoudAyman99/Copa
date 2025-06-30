import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorUsersComponent } from './moderator-users.component';

describe('ModeratorUsersComponent', () => {
  let component: ModeratorUsersComponent;
  let fixture: ComponentFixture<ModeratorUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeratorUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModeratorUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
