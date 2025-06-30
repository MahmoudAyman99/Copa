import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClubsService } from '../../../shared/services/clubs/clubs.service';
import { IclubDetails } from '../../../shared/interfaces/iclub-details';
import { IManagerClub } from '../../../shared/interfaces/i-manager-club';
import { ImageModelComponent } from '../image-model/image-model.component';
import { IhomePlayers } from '../../../shared/interfaces/ihome-players';
import { NavigationService } from '../../../shared/services/shared/navigation.service';

@Component({
  selector: 'app-club-details',
  standalone: true,
  imports: [  ImageModelComponent],
  templateUrl: './club-details.component.html',
  styleUrl: './club-details.component.scss'
})

export class ClubDetailsComponent  {
  previousPage!:string;
  imageUrl: string = '';
  clubDetails!:IclubDetails 
  managerDetails!:IManagerClub 
  players!:IhomePlayers[];
  constructor(private _Router : Router , private _ActivatedRoute:ActivatedRoute ,private _ClubsService : ClubsService , private _NavigationService:NavigationService)
  {

  }

  openImageModal(imageUrl: string) {
    this.imageUrl = imageUrl;
  }
  
  ngOnInit():void
  {


    if (typeof localStorage !== "undefined") {
      const previousPage = localStorage.getItem('currentPage');
    if (previousPage) {
      this.previousPage = previousPage;
    } 
  }

    this._ActivatedRoute.paramMap.subscribe((res :any ) =>{
          console.log(res.params.id);
          this._ClubsService.getClubDetails(res.params.id).subscribe({
            next : (res)=>{
              this.clubDetails = res;
            }
          })
          this._ClubsService.getManagerOfClubDetails(res.params.id).subscribe({
            next : (res)=>{
              this.managerDetails = res;
            }
          })
          this._ClubsService.getPlayersOfClubDetails(res.params.id).subscribe({
            next : (res)=>{
              this.players =res;
            }
          })


          
    })
  }

  
  goBack(): void {
      this._Router.navigate([this.previousPage]);
    }

     goToPlayerDetails(id :number){
        this._NavigationService.goToDetails(id);
    }

}
