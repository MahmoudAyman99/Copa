import { Component } from '@angular/core';
import { NavbarComponent } from '../../additions/navbar/navbar.component';
import { FooterComponent } from '../../additions/footer/footer.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ManagerService } from '../../../shared/services/manager/manager.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationService } from '../../../shared/services/shared/navigation.service';
import { AnotherApiService } from '../../../shared/services/another/another-api.service';
import { PlayersService } from '../../../shared/services/players/players.service';

@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [NavbarComponent , FooterComponent , NgClass , ReactiveFormsModule ],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.scss'
})
export class SubscribeComponent {
  loading:boolean=false
  showPlayerForm:boolean=true;
  showManagerForm:boolean=false;
  createPlayerForm!: FormGroup;
  
  Picture!: File;
  Video!: File;
positions: any[] = [];

  constructor(private _AuthService :AuthService , private _Router : Router , private _NavigationService: NavigationService , private _ManagerService:ManagerService , private _ToastrService:ToastrService , private _AnotherApiService: AnotherApiService , private _PlayersService:PlayersService)
  {
  }
 

   managerForm :FormGroup = new FormGroup ({
      storyAbout : new FormControl(null , [Validators.required , Validators.minLength(5) , Validators.maxLength(5000) , Validators.pattern(/^[a-zA-Z-_ ]*$/) ]),
      storyWithClub : new FormControl(null , [Validators.required , Validators.minLength(5) , Validators.maxLength(5000) , Validators.pattern(/^[^<>!#%$]*$/) ]),
      appoitmentDate: new FormControl(null, [
    Validators.required,
    this.dateRangeValidator(2015)
  ]),
  contractEndsOn: new FormControl(null, [
    Validators.required,
    this.dateRangeValidator(2024)
  ])
  
    } 
  )
  dateRangeValidator( minYear: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
  
      const date = new Date(control.value);
      const year = date.getFullYear();
  
      return (year > minYear) ? null : { dateOutOfRange: true };
    };
  }

  ngOnInit(){
    this.createPlayerForm = new FormGroup({
      Nickname: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[^<>!#%$]*$/),
        Validators.minLength(6),
        Validators.maxLength(256)
      ]),
      PhoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
      PositionId: new FormControl('', Validators.required),
      StoryAbout: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z-_ ]*$/),
        Validators.minLength(5),
        Validators.maxLength(5000)
      ]),
      PreefAbout: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z-_ ]*$/),
        Validators.minLength(5),
        Validators.maxLength(5000)
      ]),
    });

    this._AnotherApiService.getPositionOfPlayer().subscribe({
      next: (res) => {
        this.positions = res;
      },
    });
    
    if(typeof localStorage !== "undefined"){
      localStorage.setItem("currentPage" , "/subscribe")
    }
 
}



ngAfterViewInit(): void {
  this._NavigationService.setupRevealAnimation('.reveal');
  this._NavigationService.setupRevealAnimation('.reveal2');
}
goPlayerForm()
{
  this.showPlayerForm = true;
  this.showManagerForm = false;
}
goManagerForm()
{
  this.showPlayerForm = false;
  this.showManagerForm = true;
}
subscribeAsManager()
{
  this.loading = true;
  this._ManagerService.subscribeAsManager(this.managerForm.value).subscribe({
    next:(res)=>{
      this._ToastrService.success('You are now a manager, please add your club information')
      this.loading =false;
      this._Router.navigate(['/clubForm']);

      // To add role
      if(typeof localStorage !== "undefined"){
          localStorage.setItem("userToken" , res.token)
          this._AuthService.decodeUserData()
        }
    },
    error:(err)=>{
      this.loading = false;
    },
  })
}


  onFileChange(event: any, type: 'Picture' | 'Video') {
    const file = event.target.files?.[0];
    if (!file) return;

    if (type === 'Picture') this.Picture = file;
    if (type === 'Video') this.Video = file;
  }

  subscribeAsPlayer() {
    if (
      this.createPlayerForm.invalid 
    ) {
      this.createPlayerForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    const formValue = this.createPlayerForm.value;

    for (let key in formValue) {
      formData.append(key, formValue[key]);
    }

    formData.append('Picture', this.Picture);
    formData.append('Video', this.Video);

    this.loading = true;

    this._PlayersService.subscribeAsFreePlayer(formData).subscribe({
      next : (res) =>{
        this._ToastrService.success(res.message);
        this.loading = false;
      },
      error : (err) => {
        this.loading = false ;
      }
    })

  }


}
