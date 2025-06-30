import { NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ManagerService } from '../../../shared/services/manager/manager.service';
import { ToastrService } from 'ngx-toastr';
import { Iplayer } from '../../../shared/interfaces/iplayer';
import { ISelectedPlayer } from '../../../shared/interfaces/i-selected-player';
import { AnotherApiService } from '../../../shared/services/another/another-api.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { DashboardService } from '../../../shared/services/dashboard/dashboard.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-active-player',
  standalone: true,
  imports: [NgIf , ReactiveFormsModule],
  templateUrl: './active-player.component.html',
  styleUrl: './active-player.component.scss'
})
export class ActivePlayerComponent {
  loading:boolean =false;
  showActions: boolean = false;
     contractImageFile!: File;
  playerVideoFile!: File;
    activePlayers !: Iplayer[];
    selectPlayer!:ISelectedPlayer;
    positions: any[] = [];
    updatePlayerForm!: FormGroup;
    playerId!:number;

  Mode: 'none' | 'update' | 'view' = 'none';

  constructor(private _ManagerService :ManagerService ,private _DashboardService :DashboardService ,  private _ToastrService:ToastrService , private _AnotherApiService:AnotherApiService , private sanitizer: DomSanitizer){

  }
  currentYear = new Date().getFullYear();
  ngOnInit(){
    this.updatePlayerForm = new FormGroup({

          Number: new FormControl('', [
            Validators.required,
            Validators.min(1),
            Validators.max(99),
          ]),
          Price: new FormControl('', [Validators.required,Validators.min(1)]),
          PositionId: new FormControl('', Validators.required),
          ContractDuration: new FormControl('', [
            Validators.required,
            this.dateRangeValidator( 2018, 2040),
          ]),
          IsAvailableForSale: new FormControl('', Validators.required),
        });
    
    if(this.Mode === 'none'){
      this.getActivePlayers()
    }
    
    

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

  
    dateRangeValidator(minYear: number, maxYear: number) {
      return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) return null;
  
        const date = new Date(control.value);
        const year = date.getFullYear();
  
        return year >= minYear && year <= maxYear
          ? null
          : { dateOutOfRange: true };
      };
    }
  
    onFileChange(event: any, type:  'ContractPictureUrl' | 'Video') {
      const file = event.target.files?.[0];
      if (!file) return;
  
      if (type === 'ContractPictureUrl') this.contractImageFile = file;
      if (type === 'Video') this.playerVideoFile = file;
    }

  deletePlayer(pId : number){
    this._DashboardService.togglePlayer(pId).subscribe({
      next :(res) =>{
        this._ToastrService.success(res.message);
        this.getActivePlayers()
      }
    })
  }
  getActivePlayers(){
    this._DashboardService.getActivePlayers().subscribe({
      next :(res) =>{
        this.activePlayers = res;
      }
    })
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

    setMode(mode: 'none' | 'update' | 'view') {
    this.Mode = mode;
  }
  updatePlayer() {
    if (
      this.updatePlayerForm.invalid ||
      !this.contractImageFile 
      // !this.playerVideoFile
    ) {
      this.updatePlayerForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    const formValue = this.updatePlayerForm.value;

    for (let key in formValue) {
      formData.append(key, formValue[key]);
    }

    formData.append('ContractPictureUrl', this.contractImageFile);
    formData.append('Video', this.playerVideoFile);

    this.loading = true;

    this._DashboardService.updatePlayer(formData ,this.playerId).subscribe({
      next: (res) => {
        this.loading = false;
        this._ToastrService.success(res.message);
        this.getActivePlayers()
        this.Mode = 'none'
        this.playerId = 0;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }
  getPlayerId(pId:number){
        this._AnotherApiService.getPositionOfPlayer().subscribe({
      next: (res) => {
        this.positions = res;
        
      },
    });
    this.playerId = pId;
    
  }
}

