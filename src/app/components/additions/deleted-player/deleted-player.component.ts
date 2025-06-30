import { Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ManagerService } from '../../../shared/services/manager/manager.service';
import { ToastrService } from 'ngx-toastr';
import { NgClass, NgIf } from '@angular/common';
import { Iplayer } from '../../../shared/interfaces/iplayer';
import { ISelectedPlayer } from '../../../shared/interfaces/i-selected-player';
import { DashboardService } from '../../../shared/services/dashboard/dashboard.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-deleted-player',
  standalone: true,
  imports: [NgIf ],
  templateUrl: './deleted-player.component.html',
  styleUrl: './deleted-player.component.scss'
})
export class DeletedPlayerComponent {

   Mode: 'none' | 'view' = 'none';
    isAdmin = false;
  isManager = false;
  
      showActions: boolean = false;
      selectPlayer!:ISelectedPlayer;
      deletedPlayers !: Iplayer[]

      constructor(private _ManagerService :ManagerService , private _DashboardService :DashboardService,  private _ToastrService:ToastrService , private _AuthService:AuthService ,  private sanitizer: DomSanitizer){
    
      }

      

      getDeletedPlayers(){
        this._DashboardService.getDeletedPlayers().subscribe({
          next :(res) =>{
            this.deletedPlayers = res
          }
        })
      }

      ngOnInit(){
        this._AuthService.UserData.subscribe(() => {
      const data = this._AuthService.UserData.getValue();
      if (data) {
        const roles = data.roles || [];
        this.isAdmin = roles.includes('Admin');
        this.isManager = roles.includes('Manager');
      }
    });
        this.getDeletedPlayers()
      }
    
       @ViewChildren('menuWrapper') menuRefs!: QueryList<ElementRef>;
   openIndex: number | null = null;
   
   toggleActions(index: number) {
     this.openIndex = this.openIndex === index ? null : index;
   }
   
     @HostListener('document:click', ['$event'])
   onClickOutside(event: MouseEvent) {
     const clickedInsideAny = this.menuRefs?.some(ref =>
       ref.nativeElement.contains(event.target)
     );
   
     if (!clickedInsideAny) {
       this.openIndex = null;
     }
   }
    
      restorePlayer(pId : number){
        this._DashboardService.togglePlayer(pId).subscribe({
          next :(res) =>{
            this._ToastrService.success(res.message);
            this.getDeletedPlayers()
          }
        })
      }

      removePlayer(pId : number){
        this._ManagerService.removePlayer(pId).subscribe({
          next :(res) =>{
            this._ToastrService.success(res.message);
            this.getDeletedPlayers()
          }
        })
      }

      setMode(mode: 'none' |'view') {
       this.Mode = mode;
      }

    getSelectPlayer(pId : number){
    this._DashboardService.getSelectedPlayer(pId).subscribe({
      next : (res) =>{
        this.selectPlayer = res ;
        if (this.selectPlayer.videoUrl) {
              this.selectPlayer.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectPlayer.videoUrl);
      }
      }
    })
  }
}
