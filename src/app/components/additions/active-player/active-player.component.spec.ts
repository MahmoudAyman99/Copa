import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePlayerComponent } from './active-player.component';

describe('ActivePlayerComponent', () => {
  let component: ActivePlayerComponent;
  let fixture: ComponentFixture<ActivePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivePlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
