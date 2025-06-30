import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../shared/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { NavigationService } from '../../../shared/services/shared/navigation.service';

@Component({
  selector: 'app-update-phone',
  standalone: true,
  imports: [NgClass , ReactiveFormsModule],
  templateUrl: './update-phone.component.html',
  styleUrl: './update-phone.component.scss'
})
export class UpdatePhoneComponent {
  errorMsg!:string
  loading:boolean=false
         @Output() done = new EventEmitter<void>();
  
         
         constructor(private _NavigationService: NavigationService , private _UserService:UserService , private _ToastrService:ToastrService)
         {
         }
  
        updatePhone :FormGroup = new FormGroup ({
          Phonenumber : new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/ ) ])
        } )
  
        
  goBack(): void {
      this.done.emit();
    }
    ngAfterViewInit(): void {
    this._NavigationService.setupRevealAnimation('.reveal-left');
  }
  updateUserPhone()
  {
     console.log(this.updatePhone.value.Phonenumber);
    this.loading= true
    this._UserService.updateUserPhone(this.updatePhone.value.Phonenumber).subscribe({
      next :(res)=>{
          this.loading=false
        this.goBack();
        this._ToastrService.success(res.message)
      },
         error :(err)=>{
          this.errorMsg = err.error.message
          this.loading=false
        }
    })
  }

}
