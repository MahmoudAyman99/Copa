import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlayerDataComponent } from './update-player-data.component';

describe('UpdatePlayerDataComponent', () => {
  let component: UpdatePlayerDataComponent;
  let fixture: ComponentFixture<UpdatePlayerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePlayerDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePlayerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
