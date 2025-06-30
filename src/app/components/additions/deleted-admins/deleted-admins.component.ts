import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { ManagerService } from '../../../shared/services/manager/manager.service';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { Iadmins } from '../../../shared/interfaces/iadmins';
import { IselectedAdmin } from '../../../shared/interfaces/iselected-admin';

@Component({
  selector: 'app-deleted-admins',
  standalone: true,
  imports: [NgIf],
  templateUrl: './deleted-admins.component.html',
  styleUrl: './deleted-admins.component.scss'
})
export class DeletedAdminsComponent {
        
        Mode: 'none' | 'view' = 'none';
        showActions: boolean = false;
        admins!:Iadmins[]
        selectAdmin!:IselectedAdmin
        constructor(private _ManagerService :ManagerService , private _ToastrService:ToastrService){
      
        }
        ngOnInit(){
          this.getDeletedAdmins()
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
      
        restoreAdmin(adminId : number){
          this._ManagerService.toggleAdmin(adminId).subscribe({
            next :(res) =>{
              this._ToastrService.success(res.message);
              this.getDeletedAdmins()
            }
          })
        }
            getSelectAdmin(pId : number){
            this._ManagerService.getSelectedAdmin(pId).subscribe({
      next : (res) =>{
        this.selectAdmin = res ;
      }
    })
  }

      removeAdmin(adminId : number){
            this._ManagerService.removeAdmin(adminId).subscribe({
          next :(res) =>{
            this._ToastrService.success(res.message);
            this.getDeletedAdmins()
          }
        })
      }

    setMode(mode: 'none' | 'view') {
    this.Mode = mode;
  }
  getDeletedAdmins(){
    this._ManagerService.getDeletedAdmins().subscribe({
            next :(res) =>{
              this.admins = res;
            }
          })
  }

}
