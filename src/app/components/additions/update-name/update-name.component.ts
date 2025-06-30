import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationService } from '../../../shared/services/shared/navigation.service';

@Component({
  selector: 'app-update-name',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './update-name.component.html',
  styleUrl: './update-name.component.scss'
})
export class UpdateNameComponent {
  firstName!:string
  lastName!:string
   errorMsg!:string
    loading:boolean=false
           @Output() done = new EventEmitter<void>();
    
           
           constructor(private _NavigationService: NavigationService , private _UserService:UserService , private _ToastrService:ToastrService)
           {
           }

   UpdateName :FormGroup = new FormGroup ({
        firstName : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(64) , Validators.pattern(/^[a-zA-Z-_ ]*$/)]),
        lastName : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(128) , Validators.pattern(/^[a-zA-Z-_ ]*$/)])
    
      } )

        ngOnInit(){
        //get user data
        this._UserService.getUserData().subscribe({
          next : (res)=>{
            this.UpdateName.patchValue({
        firstName: res.firstname,
        lastName: res.lastname
      });
          }
        })

      }
  goBack(): void {
      this.done.emit();
    }
    ngAfterViewInit(): void {
    this._NavigationService.setupRevealAnimation('.reveal-left');
  }
  updateUserName()
  {
    this.loading= true
    this._UserService.updateUserName(this.UpdateName.value).subscribe({
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
