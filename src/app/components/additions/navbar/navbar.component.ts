import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { UserService } from '../../../shared/services/user/user.service';
import { Iuser } from '../../../shared/interfaces/iuser';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isAdmOrModOrMan!:boolean
  isLogin:boolean=false;
  profileImg!:string
  roles!:string[]
  constructor( private _AuthService:AuthService , private _Router : Router , private _UserService :UserService){}

  ngOnInit(): void {
    
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

    this._AuthService.UserData.subscribe(()=>{
      if(this._AuthService.UserData.getValue() !== null){
        
        //get user data
        
                this.isLogin=true;

                 // check is admin or moderator or user or manager
        this.roles = this._AuthService.UserData.value.roles;
    for (let index = 0; index < this.roles.length; index++) {
      const role = this.roles[index];
      if (role == "Moderator" || role == "Admin" || role == "Manager") {
        this.isAdmOrModOrMan = true;
      }
    }
  }
  else{
    this.isAdmOrModOrMan=false;
  }
      }
    )

  }

  



signOut(){
  // login
  this._Router.navigate(["/login"]);
  this.isLogin = false;
  
  // remove user token and currentpage
  if(typeof localStorage !== "undefined"){
    localStorage.removeItem("userToken");
    localStorage.removeItem("currentPage");
  }
  

  // set userData (null)
  this._AuthService.UserData.next(null);

  
}

}
