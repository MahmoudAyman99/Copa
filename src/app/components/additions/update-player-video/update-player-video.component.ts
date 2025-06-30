import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationService } from '../../../shared/services/shared/navigation.service';
import { PlayersService } from '../../../shared/services/players/players.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-player-video',
  standalone: true,
  imports: [],
  templateUrl: './update-player-video.component.html',
  styleUrl: './update-player-video.component.scss'
})
export class UpdatePlayerVideoComponent {

  
    
      loading:boolean=false
      video:any
      @Output() done = new EventEmitter<void>();
    
    
      constructor( private _NavigationService :NavigationService , private _PlayersService:PlayersService ,private _ToastrService:ToastrService ){
     
      }
    
    getFile(event :any){
      this.video = event.target.files[0];
      console.log(this.video);
      
    }
    
    goBack(): void {
        this.done.emit();
      }
    
          ngAfterViewInit(): void {
      this._NavigationService.setupRevealAnimation('.reveal-left');
    }
    
    UpdatedVideo(){
      this.loading=true;
      const formData = new FormData();
      formData.append('File', this.video);
    
      this._PlayersService.updatePlayerVideo(formData).subscribe({
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
