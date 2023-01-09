import { Component, EventEmitter, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
    selector: 'validation-message',
    templateUrl: './validation-message.component.html',
    // styleUrls: ['./validation-message.component.scss']
})

export class ValidationMessageComponent {

    @Input() FormControl!: FormControl;
    constructor(
        
    ) {
        
    }

}