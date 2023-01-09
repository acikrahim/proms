import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  compactNavbar: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.compactNavbar = window.innerWidth < 1200 ? true : false;
  }
  constructor(
    
  ) {
  }
}
