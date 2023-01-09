import { AfterViewInit, Component, TemplateRef, ViewChild } from "@angular/core";

import { ModalService } from "./modal.service";
import { ModalContent } from "src/app/models/interfaces";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements AfterViewInit {
    @ViewChild('successModal') successModal!: TemplateRef<any>;
    @ViewChild('errorModal') errorModal!: TemplateRef<any>;
    @ViewChild('warningModal') warningModal!: TemplateRef<any>;
    modalContent: ModalContent;

    constructor(
        private modalService: ModalService
    ) {
        this.modalContent = {
            modalTitle: '',
            modalBody: ''
        }
    }

    ngAfterViewInit(): void {
        this.modalService.templateRefList = [
            {
                templateName: 'successModal',
                templateRef: this.successModal
            },
            {
                templateName: 'errorModal',
                templateRef: this.errorModal
            },
            {
                templateName: 'warningModal',
                templateRef: this.warningModal
            }
        ]
    }

    set setModalContent(modalContent: ModalContent) {
        this.modalContent = modalContent;
    }

}