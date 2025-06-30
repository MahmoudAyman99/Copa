import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { IplayerDetails } from '../../../shared/interfaces/iplayer-details';
import { PlayersService } from '../../../shared/services/players/players.service';
import { ImageModelComponent } from '../image-model/image-model.component';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-player-details',
  standalone: true,
  imports: [  ImageModelComponent],
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.scss'
})
export class PlayerDetailsComponent {
  player!:IplayerDetails;
  imageUrl: string = '';
  previousPage!:string;
    constructor( private _AuthService:AuthService , private _Router : Router , private _ActivatedRoute:ActivatedRoute , private _PlayersService:PlayersService  , private sanitizer: DomSanitizer){}

      openImageModal(imgUrl: string) {
    
    this.imageUrl = imgUrl;
    
  }

    ngOnInit(): void {
      if (typeof localStorage !== "undefined") {
      const previousPage = localStorage.getItem('currentPage');
    if (previousPage) {
      this.previousPage = previousPage;
    } 
  }
    

    this._ActivatedRoute.paramMap.subscribe((res :any ) =>{
          this._PlayersService.getPlayerDetails(res.params.id).subscribe({
            next :(res) =>{
              this.player = res;

              if (this.player.video) {
              this.player.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.player.video);

  }

              
            }
          })
    })
  
}

  goBack(): void {
      this._Router.navigate([this.previousPage]);
  }
    
 
}
