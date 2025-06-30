import { Component } from '@angular/core';
import { NavbarComponent } from '../../additions/navbar/navbar.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FooterComponent } from '../../additions/footer/footer.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ NavbarComponent ,ReactiveFormsModule , FooterComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  constructor(private _AuthService:AuthService , private _ToastrService:ToastrService){

  }


  contactForm :FormGroup = new FormGroup ({
        email : new FormControl(null , [Validators.required , Validators.email ]),
        fullname : new FormControl(null , [Validators.required ,Validators.minLength(6) , Validators.maxLength(256),Validators.pattern(/^[a-zA-Z-_ ]*$/ ) ]),
        subject : new FormControl(null , [Validators.required ,Validators.minLength(6) , Validators.maxLength(256), Validators.maxLength(1024) , Validators.pattern(/^(?=.*[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z])[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z0-9 _-]+$/) ])
      } )

  ngOnInit(){
    
    if(typeof localStorage !== "undefined"){
      localStorage.setItem("currentPage" , "/contactUs")
    }
}

sendMessage(): void{
  this._AuthService.sendMessage(this.contactForm.value).subscribe({
    next:(res) =>{
        this._ToastrService.success(res.message);
    }
  })
  

}

}
