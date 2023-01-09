import { Injectable } from '@angular/core';
import { ModalComponent } from './modal.component';
import { TemplateRefObj, ModalContent } from 'src/app/models/interfaces';

@Injectable({
    providedIn: 'root',
})

export class ModalService {
    modal: ModalComponent | undefined;
    templateRefs: Array<TemplateRefObj> | undefined;
    
    constructor() {
    }

    set modalComponent(modal: ModalComponent) {
        this.modal = modal;
    }

    set templateRefList(templateRefList: Array<TemplateRefObj>) {
        this.templateRefs = templateRefList;
    }

    getTemplateRef(label: string, modalContent: ModalContent) {
        this.modal!.setModalContent = modalContent;
        return this.templateRefs?.filter((o: TemplateRefObj) => {
            return o.templateName == label
        })[0];
    }

    getDeleteWarning() {
        this.modal!.setModalContent = {
            modalTitle: 'Delete Warning',
            modalBody: 'Are you sure you want to delete this?'
        };
        return this.templateRefs?.filter((o: TemplateRefObj) => {
            return o.templateName == 'warningModal'
        })[0];
    }
}