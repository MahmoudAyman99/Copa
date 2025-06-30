import { Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ManagerService } from '../../../shared/services/manager/manager.service';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { Iadmins } from '../../../shared/interfaces/iadmins';
import { IselectedAdmin } from '../../../shared/interfaces/iselected-admin';

@Component({
  selector: 'app-active-admins',
  standalone: true,
  imports: [NgIf],
  templateUrl: './active-admins.component.html',
  styleUrl: './active-admins.component.scss'
})
export class ActiveAdminsComponent {
  
    showActions: boolean = false;
    admins!:Iadmins[]
    selectAdmin!:IselectedAdmin
    Mode: 'none' | 'view' = 'none';

    constructor(private _ManagerService :ManagerService , private _ToastrService:ToastrService){
    
    }



    ngOnInit(){
      this.getActiveAdmins()
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

  
    deleteAdmin(adminId : number){
      this._ManagerService.toggleAdmin(adminId).subscribe({
        next :(res) =>{
          this._ToastrService.success(res.message);
          this.getActiveAdmins()
        }
      })
    }

    getActiveAdmins(){
      this._ManagerService.getActiveAdmins().subscribe({
        next :(res) =>{
          this.admins = res;
        }
      })
    }

    getSelectAdmin(pId : number){
    this._ManagerService.getSelectedAdmin(pId).subscribe({
      next : (res) =>{
        console.log(res);
        this.selectAdmin = res ;
      }
    })
  }

  
    setMode(mode: 'none' | 'view') {
    this.Mode = mode;
  }

}
