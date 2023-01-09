import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import $ from 'cash-dom';

import { ErrorHandlingService, ModalService, PropertyService, UnitService } from 'src/app/services';
import { Property, Unit } from 'src/app/models/interfaces';
import cash from 'cash-dom';

@Component({
    selector: 'admin-unit',
    templateUrl: './unit.component.html',
    styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {
    @ViewChild('closeCreateUnit') closeCreateUnit!: ElementRef;
    @ViewChild('closeEditUnit') closeEditUnit!: ElementRef;
    @ViewChild('openEditUnit') openEditUnit!: ElementRef;
    @ViewChild('table') table!: ElementRef;

    properties: Array<Property> = [];
    units: Array<Unit> = [];
    selectedProperty: Property | undefined;
    selectedUnitId: Number | undefined;
    isSingle: boolean = true;
    tabulator: Tabulator | undefined;
    selectedRow: any;
    checkedList: any[] = [];
    createSingleUnitForm = this.form.group({
        name: ['', Validators.required],

    })
    createMultipleUnitForm = this.form.group({
        baseName: ['', Validators.required],
        startNumber: ['', Validators.required],
        endNumber: ['', Validators.required],

    })
    editUnitForm = this.form.group({
        name: ['', Validators.required]
    })

    constructor(
        private form: FormBuilder,
        private ngbModal: NgbModal,
        private modalService: ModalService,
        private property: PropertyService,
        private unitService: UnitService,
        private errorHandling: ErrorHandlingService,
    ) {
    }

    ngOnInit(): void {
        this.refreshProperties();
    }

    private drawTable(): void {
        let self = this;
        this.tabulator = new Tabulator(this.table.nativeElement, {
            data: this.units,
            reactiveData: true,
            pagination: true,
            pageLoaded: function () {
                self.checkedList = [];
            },
            paginationSize: 100,
            paginationSizeSelector: [100, 200, 500, 1000],
            columns: [
                {
                    title: '#',
                    headerSort: false,
                    width: 60,
                    formatter: function (cell) {
                        const main = $(`<div class="d-flex items-center justify-content-center"></div>`)
                        const input = $(`<input class="form-check-input" type="checkbox" id="checkboxDelete" value="">`)
                        cash(input).on('change', (event) => {
                            event.target.checked ? self.checkedList.push(cell) : self.checkedList = self.checkedList.filter(o => o !== cell)
                        })
                        main.append(input);
                        return <HTMLElement>main[0];
                    }
                },
                {
                    title: "ID",
                    field: "id",
                    cellClick: function (e, cell) {
                        self.selectedRow = cell;
                        return self.setEditUnit(cell.getData())
                    },
                },
                {
                    title: "ID",
                    field: "id",
                    cellClick: function (e, cell) {
                        self.selectedRow = cell;
                        return self.setEditUnit(cell.getData())
                    }
                },
                { 
                    title: "Unit Name",
                    field: "name",
                    cellClick: function (e, cell) {
                        self.selectedRow = cell;
                        return self.setEditUnit(cell.getData())
                    }
                }
            ],
            height: '100%',
            layout: "fitColumns",
            responsiveLayout: "collapse",
            placeholder: "No matching records found",
        });
        document.getElementById('tabular-table')!.appendChild(this.table.nativeElement);
    }

    private refreshProperties() {
        this.property.getProperties().subscribe({
            next: (response: Array<Property>) => {
                this.properties = response
            }
        })
    }

    public propertyChanged(property: Property) {
        this.unitService.getUnits(property).subscribe({
            next: (response: Array<Unit>) => {
                this.units = response
                this.drawTable()
            }
        })
    }

    public createUnit() {
        this.createSingleUnitForm.markAllAsTouched();
        if (this.createSingleUnitForm.valid) {
            this.unitService.addSingleUnit(this.createSingleUnitForm.value, this.selectedProperty!).subscribe({
                next: (response: Property) => {
                    this.propertyChanged(this.selectedProperty!);
                    this.closeCreateUnit.nativeElement.click()
                    this.createSingleUnitForm.reset();
                },
                error: e => {
                    this.errorHandling.getErrorHandlingModal(e.error.error);
                    this.closeCreateUnit.nativeElement.click()
                    this.createSingleUnitForm.reset()
                }
            });
        }
    }

    public setEditUnit(unit: any) {
        this.openEditUnit.nativeElement.click();
        this.selectedUnitId = unit.id
        this.editUnitForm.controls['name'].setValue(unit.name)
    }

    public editUnit() {
        this.editUnitForm.markAllAsTouched();
        if (this.editUnitForm.valid) {
            this.unitService.editUnit(this.editUnitForm.value, this.selectedUnitId!).subscribe({
                next: (response: Property) => {
                    this.closeEditUnit.nativeElement.click()
                    this.editUnitForm.reset();
                    this.propertyChanged(this.selectedProperty!);
                },
                error: e => {
                    this.errorHandling.getErrorHandlingModal(e.error.error);
                    this.closeEditUnit.nativeElement.click()
                    this.editUnitForm.reset()
                }
            });
        }
    }

    public deleteUnit() {
        this.unitService.deleteUnit(this.selectedUnitId!).subscribe({
            next: (response: Property) => {
                this.checkedList = this.checkedList.filter(o => o.getData() !== this.selectedRow.getData())
                this.selectedRow.getRow().delete()
                this.closeEditUnit.nativeElement.click()
            },
            error: (e: any) => {
                this.errorHandling.getErrorHandlingModal(e.error.error);
            }
        })
    }

    public deleteUnits() {
        this.ngbModal.open(
            this.modalService.getDeleteWarning()?.templateRef,
            { centered: true }).result.then(() => {
                for (const checked of this.checkedList) {
                    this.unitService.deleteUnit(checked.getData().id!).subscribe({
                        next: (response: Property) => {
                            checked.getRow().delete()
                            this.closeEditUnit.nativeElement.click()
                        },
                        error: (e: any) => {
                            this.errorHandling.getErrorHandlingModal(e.error.error);
                        }
                    })
                }
                this.checkedList = [];
            }, (err) => {})
    }

}
