import { Component } from '@angular/core';
import { ModeratorService } from '../../../shared/services/moderator/moderator.service';
import { ImoderatorUsers } from '../../../shared/interfaces/imoderator-users';

@Component({
  selector: 'app-moderator-admins',
  standalone: true,
  imports: [],
  templateUrl: './moderator-admins.component.html',
  styleUrl: './moderator-admins.component.scss'
})
export class ModeratorAdminsComponent {
   allAdmins!:ImoderatorUsers[];
  
      constructor(private _ModeratorService : ModeratorService ){
    
      }
    
  
    
      ngOnInit(){
        this._ModeratorService.getAllAdmins().subscribe({
          next:(res) =>{
            this.allAdmins = res;
            
          }
        })
      }
  

}
