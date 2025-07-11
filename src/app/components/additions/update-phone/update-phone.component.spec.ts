import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhoneComponent } from './update-phone.component';

describe('UpdatePhoneComponent', () => {
  let component: UpdatePhoneComponent;
  let fixture: ComponentFixture<UpdatePhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePhoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
