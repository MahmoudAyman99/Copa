import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagerService } from '../../../shared/services/manager/manager.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-club-form',
  standalone: true,
  imports: [NgIf , ReactiveFormsModule],
  templateUrl: './club-form.component.html',
  styleUrl: './club-form.component.scss'
})
export class ClubFormComponent {

clubForm: FormGroup;

  logoFile: File | null = null;
  mainShirtFile: File | null = null;
  clubPictureFile: File | null = null;

  constructor(private fb: FormBuilder , private _Router:Router , private _ManagerService:ManagerService , private _ToastrService:ToastrService) {
    this.clubForm = this.fb.group({
          clubName: new FormControl(null , [Validators.required , Validators.minLength(5)  ,Validators.maxLength(128) , Validators.pattern(/^[a-zA-Z-_ ]*$/)]) ,
          about: new FormControl(null , [Validators.required , Validators.minLength(5)  ,Validators.maxLength(1024) , Validators.pattern(/^[^<>!#%$]*$/) ]),
          story: new FormControl(null , [Validators.required , Validators.minLength(5)  ,Validators.maxLength(5000) , Validators.pattern(/^[^<>!#%$]*$/) ])
      });
  }

  get logoInvalid() {
    return !this.logoFile;
  }

  get mainShirtInvalid() {
    return !this.mainShirtFile;
  }

  get clubPictureInvalid() {
    return !this.clubPictureFile;
  }

  onFileChange(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      if (type === 'logo') this.logoFile = file;
      if (type === 'mainShirt') this.mainShirtFile = file;
      if (type === 'clubPicture') this.clubPictureFile = file;
    }
  }

  onSubmit() {
    if (this.clubForm.invalid || this.logoInvalid || this.mainShirtInvalid || this.clubPictureInvalid) {
      this.clubForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('clubName', this.clubForm.get('clubName')?.value);
    formData.append('about', this.clubForm.get('about')?.value);
    formData.append('story', this.clubForm.get('story')?.value);
    formData.append('logo', this.logoFile!);
    formData.append('MainShirt', this.mainShirtFile!);
    formData.append('ClubPicture', this.clubPictureFile!);

  this._ManagerService.createClub(formData).subscribe({
    next :(res)=> {
      this._ToastrService.success(res.message)
      this._Router.navigate(['/settings']); 
    }
  })

  }
      goBack(): void {
    if (typeof localStorage !== "undefined") {
      if (localStorage.getItem('currentPage') === 'subscribe'||localStorage.getItem('currentPage') === 'settings'){
      this._Router.navigate([localStorage.getItem('currentPage')]);
    }
    else {
      this._Router.navigate(['/profile']); 
    }
  }
    }}

