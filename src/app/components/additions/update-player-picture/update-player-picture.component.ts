import { NavigationService } from './../../../shared/services/shared/navigation.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { PlayersService } from '../../../shared/services/players/players.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-player-picture',
  standalone: true,
  imports: [],
  templateUrl: './update-player-picture.component.html',
  styleUrl: './update-player-picture.component.scss'
})
export class UpdatePlayerPictureComponent {

  
    loading:boolean=false
    picture:any
    @Output() done = new EventEmitter<void>();
  
  
    constructor( private _NavigationService :NavigationService , private _PlayersService:PlayersService ,private _ToastrService:ToastrService ){
   
    }
  
  getFile(event :any){
    this.picture = event.target.files[0];
    
  }
  
  goBack(): void {
      this.done.emit();
    }
  
        ngAfterViewInit(): void {
    this._NavigationService.setupRevealAnimation('.reveal-left');
  }
  
  UpdatedUPicture(){
    this.loading=true;
    const formData = new FormData();
    formData.append('File', this.picture);
  
    this._PlayersService.updatePlayerPicture(formData).subscribe({
      next: (res) => {
        this.loading=false;
        this.goBack();
        this._ToastrService.success(res.message)
      },
      error: (err) => {
        this.loading=false;
      }
    });
  
  }

}
