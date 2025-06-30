import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss'
})
export class ConfirmEmailComponent {
  loading:boolean=false
  email!:string
  data!:any 
  errorMsg!:string

  constructor(private _AuthService:AuthService , private _Router:Router , private _ToastrService :ToastrService)
  {
  }
  ngOnInit(): void {

    if(typeof localStorage !== "undefined"){
      const storedEmail = localStorage.getItem("email");
      if (storedEmail) {
        this.email = storedEmail;
      }
}}

  confirmEmailForm: FormGroup = new FormGroup({
    num1: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]$/)]),
    num2: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]$/)]),
    num3: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]$/)]),
    num4: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]$/)]),
    num5: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]$/)]),
    num6: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]$/)]),
  });

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

  // التحقق من صحة النموذج
  verify(): void {
    this.loading = true;
    if (this.confirmEmailForm.valid) {
      const code = Object.values(this.confirmEmailForm.value).join('');
      
      this.data={email :localStorage.getItem("email"), code : code}
      
      this._AuthService.verify(this.data).subscribe({
        next:(res)=>{
          this._Router.navigate(['/login']);
          this.loading = false;
          if(typeof localStorage !== "undefined"){
          localStorage.removeItem("email")
        }
        },
        error:(err)=>{
          this.loading = false;
          this.errorMsg = err.error.message;
        }
      })
    }
  }

  resend(): void {
    this.loading = true;
  if (!this.email) {
    this.errorMsg = 'Email is missing!';
    return;
  } 
  this._AuthService.resend(this.email).subscribe({
    next: (res) => {
      this.loading = false;
      this._ToastrService.success(res.message)
    },
    error: (err) => {
      this.loading = false;
    }
  });

  console.log(this.email);
}
}
