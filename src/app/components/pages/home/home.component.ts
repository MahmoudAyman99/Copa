import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavbarComponent } from '../../additions/navbar/navbar.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FooterComponent } from '../../additions/footer/footer.component';
import { Iclubs } from '../../../shared/interfaces/iclubs';
import { ClubsService } from '../../../shared/services/clubs/clubs.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { IhomePlayers } from '../../../shared/interfaces/ihome-players';
import { PlayersService } from '../../../shared/services/players/players.service';
import { NavigationService } from '../../../shared/services/shared/navigation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent ,CarouselModule , FooterComponent  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  isLogin!:boolean
  allClubs !: Iclubs[];
  freePlayers !: IhomePlayers[];
  clubPlayers !: IhomePlayers[];

  headerOwlOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true,
    autoplay:true
  }


  clupsOwlOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      }
    },
    nav: false,
    autoplay:true
  }
  freePlayersOwlOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      }
    },
    nav: false,
    autoplay:true
  }
  clubPlayersOwlOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      }
    },
    nav: false,
    autoplay:true
  }

  constructor(private _ClubsService :ClubsService , private _Router:Router , private _AuthService:AuthService ,  private _PlayersService:PlayersService , private _NavigationService:NavigationService)
  {

  }

   
  



  ngOnInit(): void {

    if (typeof localStorage !== "undefined") {
      localStorage.setItem("currentPage", "/home");
    }
    this._ClubsService.getHomeClubs().subscribe({
      next :(res) =>{
        this.allClubs =res
        setTimeout(() => {
  this._NavigationService.setupRevealAnimation('.reveal-left');
}, 0);
    }
  }
)
    this._PlayersService.getFreePlayersHome().subscribe({
      next :(res) =>{
        this.freePlayers =res
        setTimeout(() => {
  this._NavigationService.setupRevealAnimation('.reveal-right');
}, 0);
    },
  }
)
    this._PlayersService.getClubPlayersHome().subscribe({
      next :(res) =>{
        this.clubPlayers =res
        setTimeout(() => {
  this._NavigationService.setupRevealAnimation('.reveal-left');
}, 0);
    }
  }
)
  }
 
   ngAfterViewInit(): void {

    this._NavigationService.setupRevealAnimation('.reveal')
  }


  goToDetails(id: number) {
    if(this._AuthService.UserData.getValue() == null){
        alert('You must login first')
        this._Router.navigate(["/login"])
  }

  else {
    this._Router.navigate(['/clubDetails', id]);
  }

}
goToPlayerDetails(id :number){
        this._NavigationService.goToDetails(id);
    }
}
