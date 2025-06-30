import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private _Router: Router, private _AuthService: AuthService) {}

  goToDetails(id: number): void {
    if (this._AuthService.UserData.getValue() == null) {
      alert('You must login first');
      this._Router.navigate(['/login']);
    } else {
      this._Router.navigate(['/playerDetails', id]);
    }
  }

  setupRevealAnimation(selector: string): void {
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('done');
        } else {
          entry.target.classList.remove('done');
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  }
}
