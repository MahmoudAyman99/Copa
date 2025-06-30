import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationService } from '../../../shared/services/shared/navigation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor( private _NavigationService: NavigationService)
  {

  }

   ngAfterViewInit(): void {

    this._NavigationService.setupRevealAnimation('.reveal')
  }

}
