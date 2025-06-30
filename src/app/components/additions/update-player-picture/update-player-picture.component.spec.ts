import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlayerPictureComponent } from './update-player-picture.component';

describe('UpdatePlayerPictureComponent', () => {
  let component: UpdatePlayerPictureComponent;
  let fixture: ComponentFixture<UpdatePlayerPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePlayerPictureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePlayerPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
