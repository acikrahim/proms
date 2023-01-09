import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

import { LoadingComponent, LoadingService,  ModalComponent, ModalService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'Property Management System';
  compactNavbar: boolean = false;

  @ViewChild('loading') loadingComponent!: LoadingComponent;
  @ViewChild('modalComponent') modalComponent!: ModalComponent;

  constructor(
    private translate: TranslateService,
    private modalService: ModalService,
    private loadingService: LoadingService
  ) {

    this.translate.setDefaultLang('en')
    this.translate.use('en')
  }

  ngAfterViewInit(): void {
    this.loadingService.component = this.loadingComponent;
    this.modalService.modal = this.modalComponent;
  }
}
