import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TabulatorFull as Tabulator } from 'tabulator-tables';

@Component({
    selector: 'chart',
    templateUrl: './chart.component.html',
    // styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges {
    @Input() tableData: any[] = [];
    @Input() columnNames: any[] = [];
    @Input() height: string = '311px';
    // list properties you want to set per implementation here...

    tab = document.createElement('div');

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        
    }
}