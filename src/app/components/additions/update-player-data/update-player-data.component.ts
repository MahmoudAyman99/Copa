import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AnotherApiService } from '../../../shared/services/another/another-api.service';
import { PlayersService } from '../../../shared/services/players/players.service';
import { NavigationService } from '../../../shared/services/shared/navigation.service';

@Component({
  selector: 'app-update-player-data',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-player-data.component.html',
  styleUrl: './update-player-data.component.scss'
})
export class UpdatePlayerDataComponent {
    loading:boolean=false
      @Output() done = new EventEmitter<void>();
        
  positions: any[] = [];
  
    constructor(private _AuthService :AuthService  ,private _NavigationService:NavigationService , private _ToastrService:ToastrService , private _AnotherApiService: AnotherApiService, private _PlayersService:PlayersService)
    {
    }
   
  
     UpdatePlayerData :FormGroup = new FormGroup ({
        Nickname: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[^<>!#%$]*$/),
          Validators.minLength(6),
          Validators.maxLength(256)
        ]),
        PositionId: new FormControl('', Validators.required),
        StoryAbout: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[a-zA-Z-_ ]*$/),
          Validators.minLength(5),
          Validators.maxLength(5000)
        ]),
        PreefAbout: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[a-zA-Z-_ ]*$/),
          Validators.minLength(5),
          Validators.maxLength(5000)
        ]),
    
      } 
    )
  
    ngOnInit(){
  
      this._AnotherApiService.getPositionOfPlayer().subscribe({
        next: (res) => {
          this.positions = res;
        },
      });
     
  }

   
  goBack(): void {
      this.done.emit();
    }
    ngAfterViewInit(): void {
    this._NavigationService.setupRevealAnimation('.reveal-left');
  }

     updateData(){
      this.loading = true;
      this._PlayersService.updatePlayerData(this.UpdatePlayerData.value).subscribe({
        next :(res)=>{
          this.loading = false;
          this._ToastrService.success(res.message)
          this.goBack();
        }, 
        error :(err)=>{
            this.loading = false
        }
      })
     }
   

}
