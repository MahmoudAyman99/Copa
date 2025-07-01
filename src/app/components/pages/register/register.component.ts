import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { NavbarComponent } from '../../additions/navbar/navbar.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule, NavbarComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  loading:boolean=false

  errorMsg!:string

  constructor(private _AuthService:AuthService , private _Router : Router){

  }
  
  registerForm :FormGroup = new FormGroup ({
    firstName : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(64) ]),
    lastName : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(12) ]),
    username : new FormControl(null , [Validators.required , Validators.pattern(/^[a-zA-Z0-9-._@+]*$/ ) ]),
    email : new FormControl(null , [Validators.required , Validators.email ]),
    password : new FormControl(null , [Validators.required ,  Validators.maxLength(64) , Validators.pattern(/^(?=.*[0-9])(?=.*[\!@#$%^&*()_+{}\[\]:;<>,.?/~`|\\-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/ ) ]),
    confirmationPassword : new FormControl(null , [Validators.required ,  Validators.maxLength(64) , Validators.pattern(/^(?=.*[0-9])(?=.*[\!@#$%^&*()_+{}\[\]:;<>,.?/~`|\\-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/ ) ]),
    birthDate: new FormControl(null, [
  Validators.required,
  this.dateRangeValidator( 1940 ,2016)
])

  } , this.checkPassword)


  
  
  dateRangeValidator( minYear :number , maxYear: number ) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
  
      const date = new Date(control.value);
      const year = date.getFullYear();
  
      return ( year > minYear&& year < maxYear) ? null : { dateOutOfRange: true };
    };
  }

  sendData(){
    this.loading = true;
    this._AuthService.sendRegister(this.registerForm.value).subscribe({
      next:(res)=>{
        this.loading = false;
        if(typeof localStorage !== "undefined"){
          localStorage.setItem("email" ,this.registerForm.value.email)
        }
        this._Router.navigate(['/confirmEmail'])
      },
      error:(err)=>{
        this.loading = false;
        this.errorMsg = err.error.message;
        if(typeof localStorage !== "undefined"){
          localStorage.setItem("email" ,this.registerForm.value.email)
        }
      }
    })
    
  }


  checkPassword(form :any){
    if(form.get("password").value == form.get("confirmationPassword").value){
      return null
    }
    else {
      return {"passwordMatch" : true}
    }
  }

}
