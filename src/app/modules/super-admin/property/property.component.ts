import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ErrorHandlingService, PropertyService, ModalService } from 'src/app/services';
import { Property } from 'src/app/models/interfaces';

@Component({
    selector: 'admin-property',
    templateUrl: './property.component.html',
    styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
    @ViewChild('closeCreateProperty') closeCreateProperty!: ElementRef;
    @ViewChild('closeEditProperty') closeEditProperty!: ElementRef;
    
    constructor(
        private form: FormBuilder,
        private ngbModal: NgbModal,
        private modalService: ModalService,
        private property: PropertyService,
        private errorHandling: ErrorHandlingService,
    ) {
    }

    properties: Array<Property> = [];
    selectedId: Number | undefined;
    createPropertyForm = this.form.group({
        name: ['', Validators.required]
    })
    editPropertyForm = this.form.group({
        name: ['', Validators.required]
    })

    ngOnInit(): void {
        this.refreshProperties();
    }

    private refreshProperties() {
        this.property.getProperties().subscribe({
            next: (response: Array<Property>) => {
                this.properties = response
            }
        })
    }

    public createProperty() {
        this.createPropertyForm.markAllAsTouched();
        if (this.createPropertyForm.valid) {
            this.property.addProperty(this.createPropertyForm.value).subscribe({
                next: (response: Property) => {
                    this.refreshProperties();
                    this.closeCreateProperty.nativeElement.click()
                    this.createPropertyForm.reset();
                },
                error: e => {
                    this.errorHandling.getErrorHandlingModal(e.error.error);
                    this.closeCreateProperty.nativeElement.click()
                    this.createPropertyForm.reset()
                }
            });
        }
    }

    public setEditProperty(property: Property) {
        this.selectedId = property.id
        this.editPropertyForm.controls['name'].setValue(property.name)
    }

    public editProperty() {
        this.editPropertyForm.markAllAsTouched();
        if (this.editPropertyForm.valid) {
            this.property.editProperty(this.editPropertyForm.value, this.selectedId!).subscribe({
                next: (response: Property) => {
                    this.refreshProperties();
                    this.closeEditProperty.nativeElement.click()
                    this.editPropertyForm.reset();
                },
                error: e => {
                    this.errorHandling.getErrorHandlingModal(e.error.error);
                    this.closeEditProperty.nativeElement.click()
                    this.editPropertyForm.reset()
                }
            });
        }
    }

    public deleteProperty(id: Number) {
        this.ngbModal.open(
            this.modalService.getDeleteWarning()?.templateRef,
            { centered: true }).result.then(() => {
                this.property.deleteProperty(id).subscribe({
                    next: (response: Property) => {},
                    error: (e: any) => {
                        this.errorHandling.getErrorHandlingModal(e.error.error);
                    }
                })
            }, (err) => {})
    }

}
