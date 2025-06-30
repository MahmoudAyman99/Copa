import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ModeratorService } from '../../../shared/services/moderator/moderator.service';
import { IfreePlayersOfMod } from '../../../shared/interfaces/ifree-players-of-mod';
import { ToastrService } from 'ngx-toastr';
import { IviewSelectPlayerOfMod } from '../../../shared/interfaces/iview-select-player-of-mod';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-moderator-free-players',
  standalone: true,
  imports: [NgClass , NgIf],
  templateUrl: './moderator-free-players.component.html',
  styleUrl: './moderator-free-players.component.scss'
})
export class ModeratorFreePlayersComponent {

  players! :IfreePlayersOfMod[]

  selectPlayer!:IviewSelectPlayerOfMod;

  currentPlayersTab: 'active' | 'binned' = 'active';
   Mode: 'none' |  'view' = 'none';

  constructor(private _ModeratorService:ModeratorService , private _ToastrService:ToastrService , private sanitizer: DomSanitizer){

  }


   setPlayersTab(tab: 'active'  | 'binned') {
    this.currentPlayersTab = tab;
  }
      setMode(mode: 'none' | 'view') {
    this.Mode = mode;
  }
  
  

  ngOnInit(){
    this._ModeratorService.getActiveFreePlayers().subscribe({
      next :(res) =>{
        this.players =res;
      }
    })

  }

  getActivePlayers(){
     this._ModeratorService.getActiveFreePlayers().subscribe({
      next :(res) =>{
        this.players =res;
      }
    })
  }

  getBinnedPlayers(){
     this._ModeratorService.getBinnedFreePlayers().subscribe({
      next :(res) =>{
        this.players =res;
        
      }
    })
  }
  acceptPlayer(pId : number){
    this._ModeratorService.acceptPlayer(pId).subscribe({
      next : (res) =>{
          this._ToastrService.success(res.message)
          this.setMode('none');
          this.getBinnedPlayers();
          
      }
    })
  }
  
  rejectPlayer(pId : number){
    this._ModeratorService.rejectPlayer(pId).subscribe({
      next : (res) =>{
          this._ToastrService.success(res.message);
          this.setMode('none');
          this.getBinnedPlayers();
      }
    })
  }
  getSelectPlayer(pId : number){
    this._ModeratorService.getSelectedPlayer(pId).subscribe({
      next:(res) =>
        {
          this.selectPlayer = res ;
          
              if (this.selectPlayer.videoUrl) {
              this.selectPlayer.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectPlayer.videoUrl);
      }
    }
    })
  }

}
