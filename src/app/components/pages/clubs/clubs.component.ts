import { Component } from '@angular/core';
import { FooterComponent } from '../../additions/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { ClubsService } from '../../../shared/services/clubs/clubs.service';
import { Iclubs } from '../../../shared/interfaces/iclubs';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { NavigationService } from '../../../shared/services/shared/navigation.service';

@Component({
  selector: 'app-clubs',
  standalone: true,
  imports: [FooterComponent ],
  templateUrl: './clubs.component.html',
  styleUrl: './clubs.component.scss'
})
export class ClubsComponent {
  allClubs !: Iclubs[];

  constructor(private _Router:Router , private _NavigationService: NavigationService, private _ClubsService:ClubsService , private _AuthService:AuthService){
  
    }
    
     goBack(): void {
      this._Router.navigate(['\home']);
    
     }
    
    
  ngOnInit(): void {


    if (typeof localStorage !== "undefined") {
      localStorage.setItem("currentPage", "/clubs");
  }


    this._ClubsService.getClubsPage().subscribe({
      next :(res) =>{
        this.allClubs =res
        setTimeout(() => {
  this._NavigationService.setupRevealAnimation('.reveal-left');
}, 1000);
    }
  }
)
  }
   ngAfterViewInit(): void {
    this._NavigationService.setupRevealAnimation('.reveal')
    this._NavigationService.setupRevealAnimation('.reveal-left')
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

}
