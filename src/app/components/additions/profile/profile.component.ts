import { Component } from '@angular/core';
import { UserService } from '../../../shared/services/user/user.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Iuser } from '../../../shared/interfaces/iuser';
import { UpdatePictureComponent } from '../update-picture/update-picture.component';
import { UpdatePasswordComponent } from '../update-password/update-password.component';
import { ModifyAddressComponent } from '../modify-address/modify-address.component';
import { UpdatePhoneComponent } from '../update-phone/update-phone.component';
import { UpdateNameComponent } from '../update-name/update-name.component';
import { ImageModelComponent } from '../image-model/image-model.component';
import { NavigationService } from '../../../shared/services/shared/navigation.service';
import { DashboardService } from '../../../shared/services/dashboard/dashboard.service';
import { NgIf } from '@angular/common';
import { PlayersService } from '../../../shared/services/players/players.service';
import { IprofilePlayer } from '../../../shared/interfaces/iprofile-player';
import { DomSanitizer } from '@angular/platform-browser';
import { UpdatePlayerPictureComponent } from '../update-player-picture/update-player-picture.component';
import { UpdatePlayerVideoComponent } from '../update-player-video/update-player-video.component';
import { UpdatePlayerDataComponent } from '../update-player-data/update-player-data.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink , NgIf , UpdatePictureComponent ,  UpdatePasswordComponent ,  ModifyAddressComponent , UpdatePhoneComponent , UpdateNameComponent , ImageModelComponent ,UpdatePlayerPictureComponent , UpdatePlayerVideoComponent , UpdatePlayerDataComponent ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  isManager:boolean=false;
  isPlayer:boolean = false;
  imageUrl: string = '';
  userData!:Iuser;
  playerData!:IprofilePlayer;
  managerHasClub:boolean = false ;
  editMode: 'none' | 'name' | 'picture' | 'phone'  | 'address' | 'password' | 'playerPicture' | 'playerVideo' | 'playerData' = 'none';



  constructor(private _AuthService:AuthService, private _UserService:UserService , private _Router :Router , private _NavigationService: NavigationService , private _DashboardService:DashboardService , private _PlayersService:PlayersService , private sanitizer: DomSanitizer){}


  setEditMode(mode: 'name' | 'picture' | 'phone' | 'password' | 'address' | 'playerPicture' | 'playerVideo'| 'playerData') {
    this.editMode = mode;
  }

   ngOnInit(){
        //get user data
        this._UserService.getUserData().subscribe({
          next : (res)=>{
            this.userData =res;
          }
        })

 

             this._AuthService.UserData.subscribe(()=>{
      if(this._AuthService.UserData.getValue() !== null){

      // check is admin or moderator or user or manager
        const roles = this._AuthService.UserData.value.roles;
    for (let index = 0; index < roles.length; index++) {
      const role = roles[index];
      if (role === "Player" ) {
        this.isPlayer =true;
        this._PlayersService.getPlayerData().subscribe({
          next : (res) =>{
            this.playerData = res;
              if (this.playerData.videoUrl) {
              this.playerData.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.playerData.videoUrl);
          }
        }
        })
      }
      else if (role === "Manager")
      {
        this.isManager =true;
        this._DashboardService.getManOrAdminClubDetails().subscribe({
          next :(res) =>{
              if (res !== null){
                this.managerHasClub = true
              }
          }
        })
      }
    }
  }
      }
    )

      }

    
  openImageModal(imageUrl: string) {
    this.imageUrl = imageUrl;
  }
  
    goBack(): void {
    this._Router.navigate([localStorage.getItem('currentPage')]);
    }

    ngAfterViewInit(): void {
  this._NavigationService.setupRevealAnimation('.reveal-right');
}
  clearEditMode() {
     //get user data
        this._UserService.getUserData().subscribe({
          next : (res)=>{
            this.userData =res;
          }
        })

        if (this.isPlayer){
          this._PlayersService.getPlayerData().subscribe({
          next : (res) =>{
            this.playerData = res;
              if (this.playerData.videoUrl) {
              this.playerData.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.playerData.videoUrl);
          }
        }
        })
        }

    this.editMode = 'none';
     setTimeout(() => {
    this._NavigationService.setupRevealAnimation('.reveal-right');
  }, 0);
  }
}


