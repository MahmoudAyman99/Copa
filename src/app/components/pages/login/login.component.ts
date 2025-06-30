import { Router, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { NavbarComponent } from '../../additions/navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink , ReactiveFormsModule , NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loading:boolean=false
  errorMsg!:string

  constructor(private _AuthService:AuthService , private _Router:Router){
  
    }
    

    loginForm :FormGroup = new FormGroup ({
      email : new FormControl(null , [Validators.required , Validators.email ]),
      password : new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[0-9])(?=.*[\!@#$%^&*()_+{}\[\]:;<>,.?/~`|\\-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/ ) ])
    } )

    signin():void{
      this.loading = true;
      this._AuthService.login(this.loginForm.value).subscribe({
        next:(res)=>{
          this.loading = false;
    if (typeof localStorage !== "undefined") {
      const previousPage = localStorage.getItem('currentPage');
    if (previousPage) {
      this._Router.navigate([previousPage]);
    } else {
      this._Router.navigate(['/']); 
    }
    if(typeof localStorage !== "undefined"){
          localStorage.setItem("userToken" , res.token)
          this._AuthService.decodeUserData()
        }
  }
        },
        error:(err)=>{
          this.loading = false;
          this.errorMsg = err.error.message;
          
        }
      }
    )
    
    }
    
}
