import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  constructor(private _Router:Router){

  }
  backHome(){
    this._Router.navigate(['./home'])
  }

}
