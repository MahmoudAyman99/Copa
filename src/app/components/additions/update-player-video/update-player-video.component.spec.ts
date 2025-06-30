import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlayerVideoComponent } from './update-player-video.component';

describe('UpdatePlayerVideoComponent', () => {
  let component: UpdatePlayerVideoComponent;
  let fixture: ComponentFixture<UpdatePlayerVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePlayerVideoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePlayerVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
