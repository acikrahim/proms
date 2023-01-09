import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { TranslateModule } from '@ngx-translate/core';
import { TranslationModule } from '../translation/translation.module';
import { ValidationMessageComponent } from '../validation-message/validation-message.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        TranslationModule,
    ],
    declarations: [
        ValidationMessageComponent,
    ],
    exports: [
        ValidationMessageComponent,
    ]
})
export class ValidationMessageModule { }