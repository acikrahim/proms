import { Component, TemplateRef, ViewChild } from "@angular/core";

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html'
})

export class LoadingComponent {
    show: boolean = false;
    constructor(
    ) {
    }

    showLoading() {
        this.show = true;
    }

    hideLoading() {
        this.show = false;
    }

}