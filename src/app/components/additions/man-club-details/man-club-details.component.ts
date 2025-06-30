import { ToastrService } from 'ngx-toastr';
import { ManagerService } from './../../../shared/services/manager/manager.service';
import { Component } from '@angular/core';
import { DashboardService } from '../../../shared/services/dashboard/dashboard.service';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-man-club-details',
  standalone: true,
  imports: [NgIf , NgClass],
  templateUrl: './man-club-details.component.html',
  styleUrl: './man-club-details.component.scss'
})
export class ManClubDetailsComponent {
  loading:boolean = false
  Mode: 'none' | 'updateLogo' | 'updatePicture' | 'updateShirt' = 'none';
  clubDetails:any;
  picture:any;
  isAdmin = false;
  isManager = false;
  constructor(private _ManagerService:ManagerService ,  private _DashboardService:DashboardService , private _ToastrService:ToastrService , private _AuthService:AuthService){

  }

  ngOnInit()
      {
        this._AuthService.UserData.subscribe(() => {
      const data = this._AuthService.UserData.getValue();
      if (data) {
        const roles = data.roles || [];
        this.isAdmin = roles.includes('Admin');
        this.isManager = roles.includes('Manager');
      }
    });
        this.getClubDeyails()
      }

  
getFile(event :any){
  this.picture = event.target.files[0];
  
}
getClubDeyails(){
  this._DashboardService.getManOrAdminClubDetails().subscribe({
          next:(res)=>{
            this.clubDetails = res
            
          }
        })
}
      
    setMode(mode: 'updateLogo' | 'updatePicture'| 'updateShirt') {
    this.Mode = mode;
  }
   goBack(){
    this.Mode = 'none'
  }
  Update(mode : 'updateLogo' | 'updatePicture' | 'updateShirt' ){
  this.loading=true;
  const formData = new FormData();
  formData.append('File', this.picture);

  if(mode === 'updateLogo'){
        this._ManagerService.updateClubLogo(formData).subscribe({
    next: (res) => {
      this.getClubDeyails()
      this.loading=false;
      this.goBack();
      this._ToastrService.success(res.message)
    },
    error: (err) => {
      this.loading=false;
    }
  });
  }
  else if(mode === 'updatePicture'){
        this._ManagerService.updateClubPicture(formData).subscribe({
    next: (res) => {
      this.getClubDeyails()
      this.loading=false;
      this.goBack();
      this._ToastrService.success(res.message)
    },
    error: (err) => {
      this.loading=false;
    }
  });
  }
   else if(mode === 'updateShirt'){
        this._ManagerService.updateClubShirt(formData).subscribe({
    next: (res) => {
      this.getClubDeyails()
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
}
