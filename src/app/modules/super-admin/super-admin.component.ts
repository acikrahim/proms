import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html'
})
export class SuperAdminComponent {
  compactNavbar: boolean = false;
  hideLabel: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.compactNavbar = window.innerWidth < 1200 ? true : false;
  }
  constructor(

  ) {
  }
}
