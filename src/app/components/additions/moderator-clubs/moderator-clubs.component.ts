import { Component} from '@angular/core';
import { ModeratorService } from '../../../shared/services/moderator/moderator.service';
import { ImoderatorClubs } from '../../../shared/interfaces/imoderator-clubs';

@Component({
  selector: 'app-moderator-clubs',
  standalone: true,
  imports: [],
  templateUrl: './moderator-clubs.component.html',
  styleUrl: './moderator-clubs.component.scss'
})
export class ModeratorClubsComponent {
 
  allClubs!:ImoderatorClubs[];


  constructor(private _ModeratorService : ModeratorService){

  }



  ngOnInit(){
    this._ModeratorService.getAllClubs().subscribe({
      next:(res) =>{
        this.allClubs = res;
        
      }
    })
  }

}
