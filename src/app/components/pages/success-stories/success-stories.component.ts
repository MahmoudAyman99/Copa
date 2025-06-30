import { ISuccessPlayers } from '../../../shared/interfaces/isuccess-players';
import { PlayersService } from '../../../shared/services//players/players.service';
import { NavigationService } from '../../../shared/services/shared/navigation.service';
import { FooterComponent } from '../../additions/footer/footer.component';
import { VideoModelComponent } from '../../additions/video-model/video-model.component';
import { NavbarComponent } from './../../additions/navbar/navbar.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-success-stories',
  standalone: true, 
  imports: [NavbarComponent ,FooterComponent ,VideoModelComponent] ,
  templateUrl: './success-stories.component.html',
  styleUrls: ['./success-stories.component.scss']
})
export class SuccessStoriesComponent {
  videoUrl: string = ''; 
  allSuccessPlayers !: ISuccessPlayers[];

  constructor(private _PlayersService : PlayersService , private _NavigationService: NavigationService)
  {

  }

  ngOnInit(){
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("currentPage", "/successStories");
    }
  
    this._PlayersService.getSuccessPlayers().subscribe({
      next: (res) => {
    this.allSuccessPlayers = res;
    setTimeout(() => {
  this._NavigationService.setupRevealAnimation('.reveal-left');
}, 0);

    }
    })

  }

  

 
   ngAfterViewInit(): void {
    

    this._NavigationService.setupRevealAnimation('.reveal-left')
    this._NavigationService.setupRevealAnimation('.reveal')
  }



  openVideo(url: string) {
    this.videoUrl = `https://www.youtube.com/embed/${url}`; // تعيين رابط الفيديو
  }

  closeVideo() {
    this.videoUrl = ''; // إغلاق المودال بإزالة الرابط
  }
}
