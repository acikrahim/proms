import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

import { TranslationComponent } from "./translation.component";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [TranslationComponent],
    declarations: [TranslationComponent],
    providers: []
})

export class TranslationModule {};