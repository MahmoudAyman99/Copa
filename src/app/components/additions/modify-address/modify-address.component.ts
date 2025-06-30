import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationService } from '../../../shared/services/shared/navigation.service';

@Component({
  selector: 'app-modify-address',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './modify-address.component.html',
  styleUrl: './modify-address.component.scss'
})
export class ModifyAddressComponent {
       loading:boolean=false
       @Output() done = new EventEmitter<void>();

       
       constructor( private _NavigationService: NavigationService , private _UserService:UserService , private _ToastrService:ToastrService)
       {
       }

      modfyAddress :FormGroup = new FormGroup ({
        street : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(256) , Validators.pattern(/^[^<>!#%$]*$/) ]),
        regoin : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(256) ,Validators.pattern(/^[^<>!#%$]*$/) ] ),
        city : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(256) ,Validators.pattern(/^[^<>!#%$]*$/) ]),
        governrate : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(256) ,Validators.pattern(/^[^<>!#%$]*$/) ]),
        country : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(256) ,Validators.pattern(/^[^<>!#%$]*$/) ]),
      } )

      
goBack(): void {
    this.done.emit();
  }
  ngAfterViewInit(): void {
  this._NavigationService.setupRevealAnimation('.reveal-left');
}
modifyAddress()
{
  this.loading= true
  this._UserService.modifyUserAddress(this.modfyAddress.value).subscribe({
    next :(res)=>{
        this.loading=false
      this.goBack();
      this._ToastrService.success(res.message)
    },
       error :(err)=>{
        this.loading=false
      }
  })
}

}
