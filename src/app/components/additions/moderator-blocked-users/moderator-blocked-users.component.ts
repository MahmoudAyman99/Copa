import { Component } from '@angular/core';
import { ModeratorService } from '../../../shared/services/moderator/moderator.service';
import { ImoderatorUsers } from '../../../shared/interfaces/imoderator-users';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-moderator-blocked-users',
  standalone: true,
  imports: [],
  templateUrl: './moderator-blocked-users.component.html',
  styleUrl: './moderator-blocked-users.component.scss'
})
export class ModeratorBlockedUsersComponent {
  allUsers!:ImoderatorUsers[];
 
     constructor(private _ModeratorService : ModeratorService , private _ToastrService:ToastrService){
   
     }
   
   
   
   
     ngOnInit(){
       this._ModeratorService.getBlockedUsers().subscribe({
         next:(res) =>{
           this.allUsers = res;
           
         }
       })
     }
 
     return(userId :string){
       this._ModeratorService.blockUser(userId).subscribe({
         next :(res)=> {
             this._ToastrService.success(res.message)
             this._ModeratorService.getBlockedUsers().subscribe({
         next:(res) =>{
           this.allUsers = res;
         }
       })
         }
       })
 
     }
}
