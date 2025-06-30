import { Component, Pipe } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../additions/footer/footer.component';
import { PlayersService } from '../../../shared/services/players/players.service';
import { IhomePlayers } from '../../../shared/interfaces/ihome-players';
import { NavigationService } from '../../../shared/services/shared/navigation.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [FooterComponent ],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss'
})
export class PlayersComponent {
    freePlayers !: IhomePlayers[];
    clubPlayers !: IhomePlayers[];

  constructor(private _Router:Router  , private _PlayersService:PlayersService , private _NavigationService:NavigationService){

  }

  
  ngOnInit(){

      if (typeof localStorage !== "undefined") {
        localStorage.setItem("currentPage", "/players");
    }

          this._PlayersService.getFreePlayersPage().subscribe({
      next :(res) =>{
        this.freePlayers =res
        setTimeout(() => {
  this._NavigationService.setupRevealAnimation('.reveal-left');
}, 0);
    }
  }
)
    this._PlayersService.getClubPlayersPage().subscribe({
      next :(res) =>{
        this.clubPlayers =res
        setTimeout(() => {
  this._NavigationService.setupRevealAnimation('.reveal-right');
}, 0);
    }
  }
)
  }

   ngAfterViewInit(): void {

    this._NavigationService.setupRevealAnimation('.reveal-left')
    this._NavigationService.setupRevealAnimation('.reveal-right')
  }


  goBack(): void {
      this._Router.navigate(['\home']);
  }
    
    
    goToPlayerDetails(id :number){
        this._NavigationService.goToDetails(id);
    }
}
