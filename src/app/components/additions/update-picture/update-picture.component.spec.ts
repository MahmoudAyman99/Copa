import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePictureComponent } from './update-picture.component';

describe('UpdatePictureComponent', () => {
  let component: UpdatePictureComponent;
  let fixture: ComponentFixture<UpdatePictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePictureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
