import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoModelComponent } from './video-model.component';

describe('VideoModelComponent', () => {
  let component: VideoModelComponent;
  let fixture: ComponentFixture<VideoModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
