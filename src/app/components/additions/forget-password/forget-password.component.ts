import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  loading:boolean=false
  isCode:boolean=false
  isReset:boolean=false
  email!:string
  data!:any 
  errorMsg!:string

  constructor(private _AuthService : AuthService , private _Router:Router){
   
  }


  emailForm:FormGroup = new FormGroup({
    email : new FormControl(null , [Validators.required , Validators.email ])
  })
  codeForm: FormGroup = new FormGroup({
    num1: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]$/)]),
    num2: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]$/)]),
    num3: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]$/)]),
    num4: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]$/)]),
    num5: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]$/)]),
    num6: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]$/)]),
  });

  resetPasswordForm:FormGroup = new FormGroup({
    password : new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[0-9])(?=.*[\!@#$%^&*()_+{}\[\]:;<>,.?/~`|\\-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/ ) ]),
    confirmationPassword : new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[0-9])(?=.*[\!@#$%^&*()_+{}\[\]:;<>,.?/~`|\\-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/ ) ]),
    } ,this.checkPassword)


  sendEmail(){
    this.loading = true;
    this.email = this.emailForm.value.email
    this._AuthService.sendEmailForgetPassword(this.email).subscribe({
      next:(res: string)=>{
        console.log(res);
        this.isCode = true
        this.loading = false;
        this.errorMsg = '';
      },
      error:(err)=>{
        this.loading = false;
        console.log(err);
        this.errorMsg = err.error.message;
      }
    })

  }
  sendCode(): void {
    this.loading = true;
    if (this.codeForm.valid) {
      const code = Object.values(this.codeForm.value).join('');
      console.log('تم إدخال الكود:', code);
      
      this.data={email :this.email, code : code}
      console.log(this.data);
      this._AuthService.sendCodeForgetPassword(this.data).subscribe({
        next:(res)=>{
          console.log(res);
          this.isCode=false
          this.isReset=true
          this.loading =false
          this.errorMsg = '';
          
        },
        error:(err)=>{
          console.log(err.error.message);
          
           this.errorMsg =err.error.message;
          this.loading =false
        }
      })
    }
  }
  resetData(){
    this.loading =true
    this.data={email :this.email,  password:this.resetPasswordForm.value.password , confirmationPassword:this.resetPasswordForm.value.confirmationPassword }
    console.log(this.data);
    
    this._AuthService.resetDataAfterConfirm(this.data).subscribe({
      next :(res)=>{
        this.errorMsg = '';
        this.loading =false
        this._Router.navigate(['/login'])},
      error :(err)=>{
        console.log(err.error.message);
        
        this.errorMsg =err.error.message;
          this.loading =false
      }
    }
  

  )}

 

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  // الانتقال للحقل التالي تلقائيًا
  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (/^[0-9]$/.test(value)) {
      if (index < this.otpInputs.length - 1) {
        this.otpInputs.toArray()[index + 1].nativeElement.focus();
      }
    } else {
      input.value = ''; // مسح الحقل إذا لم تكن القيمة رقمًا صحيحًا
    }
  }

  // العودة للحقل السابق عند الضغط على Backspace
  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && !input.value && index > 0) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
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
