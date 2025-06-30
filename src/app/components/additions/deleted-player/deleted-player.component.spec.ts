import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedPlayerComponent } from './deleted-player.component';

describe('DeletedPlayerComponent', () => {
  let component: DeletedPlayerComponent;
  let fixture: ComponentFixture<DeletedPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletedPlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletedPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
