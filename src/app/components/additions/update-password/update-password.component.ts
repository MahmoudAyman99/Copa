import { NgClass } from '@angular/common';
import { Component, EventEmitter , Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationService } from '../../../shared/services/shared/navigation.service';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent {
  errorMsg!:string
  loading:boolean=false
  @Output() done = new EventEmitter<void>();

  constructor(private _NavigationService: NavigationService , private _UserService :UserService , private _ToastrService:ToastrService){}

  updatePassword :FormGroup = new FormGroup ({
      oldPassword : new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[0-9])(?=.*[\!@#$%^&*()_+{}\[\]:;<>,.?/~`|\\-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/ ) ]),
      newPassword : new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[0-9])(?=.*[\!@#$%^&*()_+{}\[\]:;<>,.?/~`|\\-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/ ) ]),
      confirmationPassword : new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[0-9])(?=.*[\!@#$%^&*()_+{}\[\]:;<>,.?/~`|\\-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/ ) ]),
  
    } , this.checkPassword)


goBack(): void {
    this.done.emit();
  }
  ngAfterViewInit(): void {
  this._NavigationService.setupRevealAnimation('.reveal-left');
}
  
  checkPassword(form :any){
    if(form.get("newPassword").value == form.get("confirmationPassword").value){
      return null
    }
    else {
      return {"passwordMatch" : true}
    }
  }

  updateUserPassword(){
    this.loading=true
    this._UserService.updateUserPassword(this.updatePassword.value).subscribe({
      next :(res)=>{
        this.loading=false
      this.goBack();
      this._ToastrService.success(res.message)
    },
       error :(err)=>{
        this.loading=false
        this.errorMsg =err.error.message
      }
    })
  }

}
