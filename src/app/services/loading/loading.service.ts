import { Injectable, TemplateRef } from '@angular/core';
import { LoadingComponent } from './loading.component';

@Injectable({
    providedIn: 'root',
})

export class LoadingService {
    component: LoadingComponent | undefined;
    
    constructor() {
    }

    set loadingComponent(component: LoadingComponent) {
        this.component = component;
    }

    showLoading() {
        this.component?.showLoading();
    }

    hideLoading() {
        this.component?.hideLoading();
    }
}