import { ResetPassword } from './../../../shared/interfaces/reset-password';
import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { ImoderatorUsers } from '../../../shared/interfaces/imoderator-users';
import { ModeratorService } from '../../../shared/services/moderator/moderator.service';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-moderator-users',
  standalone: true,
  imports: [NgIf],
  templateUrl: './moderator-users.component.html',
  styleUrl: './moderator-users.component.scss'
})

export class ModeratorUsersComponent {
  allUsers!:ImoderatorUsers[];

    constructor(private _ModeratorService : ModeratorService , private _ToastrService:ToastrService){
  
    }
  
  
  
     @ViewChildren('menuWrapper') menuRefs!: QueryList<ElementRef>;
    
    openIndex: string | null = null;
    
    toggleActions(index: string) {
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
  
    ngOnInit(){
      this._ModeratorService.getAllUsers().subscribe({
        next:(res) =>{
          this.allUsers = res;
          
        }
      })
    }

    block(userId :string){
      this._ModeratorService.blockUser(userId).subscribe({
        next :(res)=> {
            this._ToastrService.success(res.message)
            this._ModeratorService.getAllUsers().subscribe({
        next:(res) =>{
          this.allUsers = res;
        }
      })
        }
      })

    }
    toggle(userId :string){
      this._ModeratorService.toggleUser(userId).subscribe({
        next :(res)=> {
            this._ToastrService.success(res.message)
            this._ModeratorService.getAllUsers().subscribe({
        next:(res) =>{
          this.allUsers = res;
        }
      })
        }
      })
    }
    resetPassword(pId : string){
      this._ModeratorService.resetPasswordToUser(pId).subscribe({
        next :(res) =>{
          this._ToastrService.success(res.message);
        }
      })

    }

}
