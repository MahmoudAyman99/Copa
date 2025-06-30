import { ManagerService } from '../../../shared/services/manager/manager.service';
import { NgClass, NgIf, NgSwitchCase } from '@angular/common';
import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ManClubDetailsComponent } from '../man-club-details/man-club-details.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreatePlayerComponent } from '../create-player/create-player.component';
import { ToastrService } from 'ngx-toastr';
import { ActivePlayerComponent } from '../active-player/active-player.component';
import { DeletedPlayerComponent } from '../deleted-player/deleted-player.component';
import { ActiveAdminsComponent } from '../active-admins/active-admins.component';
import { DeletedAdminsComponent } from '../deleted-admins/deleted-admins.component';
import { ModeratorClubsComponent } from '../moderator-clubs/moderator-clubs.component';
import { ModeratorUsersComponent } from '../moderator-users/moderator-users.component';
import { ModeratorAdminsComponent } from '../moderator-admins/moderator-admins.component';
import { ModeratorBlockedUsersComponent } from '../moderator-blocked-users/moderator-blocked-users.component';
import { ModeratorDashboardComponent } from '../moderator-dashboard/moderator-dashboard.component';
import { UserService } from '../../../shared/services/user/user.service';
import { ModeratorFreePlayersComponent } from '../moderator-free-players/moderator-free-players.component';
import { DashboardService } from '../../../shared/services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgClass , NgIf  , RouterLink , ManClubDetailsComponent , ReactiveFormsModule , CreatePlayerComponent , ActivePlayerComponent  , DeletedPlayerComponent , ActiveAdminsComponent , DeletedAdminsComponent, ModeratorClubsComponent , ModeratorUsersComponent , ModeratorAdminsComponent , ModeratorBlockedUsersComponent , ModeratorDashboardComponent , ModeratorFreePlayersComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  profileImg!:string
  erorrMsg!:string
  loading : boolean =false;
  isAdmin = false;
  isModerator  : boolean= false;
  isManager : boolean = false;
  isManagerNotAddClub : boolean =false;

  moderatorSection: 'dashboard'| 'clubs' | 'users' | 'blockedUsers' | 'admins' | 'freePlayers' = 'dashboard';
  managerSection: 'club' | 'players' | 'admins' = 'club';
  currentPlayersTab: 'active' | 'deleted' = 'active';
  currentAdminsTab: 'active' | 'deleted' = 'active';
  
  Mode: 'view' | 'update' | 'add' = 'view';

  isopen = false;

  constructor(private eRef: ElementRef, private _AuthService: AuthService, private _Router: Router , private _ManagerService:ManagerService , private _ToastrService:ToastrService , private _UserService :UserService , private _DashboardService:DashboardService) {}

  addAdmin :FormGroup = new FormGroup ({
      adminEmail : new FormControl(null , [Validators.required , Validators.email ])
  })
  updateClub :FormGroup = new FormGroup ({
      clubName: new FormControl(null , [Validators.required , Validators.minLength(5)  ,Validators.maxLength(128) , Validators.pattern(/^[a-zA-Z-_ ]*$/)]) ,
      about: new FormControl(null , [Validators.required , Validators.minLength(5)  ,Validators.maxLength(1024) , Validators.pattern(/^[^<>!#%$]*$/) ]),
      story: new FormControl(null , [Validators.required , Validators.minLength(5)  ,Validators.maxLength(5000) , Validators.pattern(/^[^<>!#%$]*$/) ])
  })

  ngOnInit() {
this._UserService.getUserData().subscribe({
          next : (res)=>{
            if(res.profilePictureUrl){
              this.profileImg = res.profilePictureUrl
            }
            else{
              this.profileImg = res.profilePictureThumbnailUrl
            }
          }
        })

    this._AuthService.UserData.subscribe(() => {
      const data = this._AuthService.UserData.getValue();
      if (data) {
        const roles = data.roles || [];
        this.isAdmin = roles.includes('Admin');
        this.isModerator = roles.includes('Moderator');
        this.isManager = roles.includes('Manager');
      }
    });
    if (this.isManager){
      this._DashboardService.getManOrAdminClubDetails().subscribe({
          next :(res) =>{
              if (res == null){
                this.isManagerNotAddClub = true;
              }
            }
          })
    }

     if (typeof localStorage !== "undefined") {
     localStorage.setItem('currentPage' , 'settings');
     }
    }

  toggle() {
    this.isopen = !this.isopen;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isopen = false;
    }
  }

  signOut() {
    this._Router.navigate(['/login']);
    localStorage.removeItem('userToken');
    localStorage.removeItem('currentPage');
    this._AuthService.UserData.next(null);
  }

  setSection(section: 'club' | 'players' | 'admins') {
    this.managerSection = section;
    this.Mode = 'view'
    if (section === 'players') {
      this.currentPlayersTab = 'active';

    }
    else if (section === 'admins'){
      this.currentAdminsTab = 'active';
    }
  }
  setModeratorSection(section: 'clubs' | 'freePlayers' | 'admins' | 'users' | 'dashboard' | 'blockedUsers') {
    this.moderatorSection = section;
    this.Mode = 'view'
  }

  setPlayersTab(tab: 'active' | 'deleted') {
    this.currentPlayersTab = tab;
  }
  setAdminsTab(tab: 'active' | 'deleted') {
    this.currentAdminsTab = tab;
  }
  setViewMode()
  {
    this.Mode = 'view'
  }
  setUpdateMode() {
    this.Mode = 'update';
  }
  setAddMode() {
    this.Mode = 'add';
  }

  AddAdmin(){
    this.loading = true ;
    this._ManagerService.assignAdmin(this.addAdmin.value).subscribe({
      next : (res) =>{
        this._ToastrService.success('Admin is added successfully');
        this.loading = false ;
        this.setViewMode()
      },
      error : (err) =>{
        this.loading = false ;
        this.erorrMsg = err.error.message
      }
    })
  }
  updateClubDetails(){
    
    this._ManagerService.updateClub(this.updateClub.value).subscribe({
      next : (res) =>{
        this.setViewMode()
        this._ToastrService.success(res.message)
      }
    })
  }
}



