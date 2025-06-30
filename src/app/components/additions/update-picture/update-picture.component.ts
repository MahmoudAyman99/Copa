import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationService } from '../../../shared/services/shared/navigation.service';

@Component({
  selector: 'app-update-picture',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-picture.component.html',
  styleUrl: './update-picture.component.scss'
})
export class UpdatePictureComponent {
  loading:boolean=false
  picture:any
  @Output() done = new EventEmitter<void>();


  constructor( private _NavigationService :NavigationService , private _UserService:UserService ,private _ToastrService:ToastrService){
 
  }

getFile(event :any){
  this.picture = event.target.files[0];
  
}

goBack(): void {
    this.done.emit();
  }

      ngAfterViewInit(): void {
  this._NavigationService.setupRevealAnimation('.reveal-left');
}

UpdatedUPicture(){
  this.loading=true;
  const formData = new FormData();
  formData.append('picture', this.picture);

  this._UserService.updateUserPicture(formData).subscribe({
    next: (res) => {
      this.loading=false;
      this.goBack();
      this._ToastrService.success(res.message)
    },
    error: (err) => {
      this.loading=false;
    }
  });
}



}
