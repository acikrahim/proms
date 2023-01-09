import { Component } from "@angular/core";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'app-translation',
    templateUrl: './translation.component.html',
    styleUrls: ['./translation.component.scss']
})

export class TranslationComponent {
    selectedLanguage: string = 'en';
    languageList = [
        {
            value: 'en',
            label: 'English'
        },
        {
            value: 'ms',
            label: 'Malay'
        }
    ]

    selectedLangObj: any;

    get currentSelectedLanguage() {
        return this.selectedLanguage;
    }

    constructor(
        private translate: TranslateService
    ) {
        this.selectedLanguage = translate.currentLang;
        this.selectedLangObj = this.languageList.filter((o: any) => {
            return o.value == this.selectedLanguage;
        })[0];
        this.translate.onLangChange.subscribe((languageObject: LangChangeEvent) => {
            this.selectedLanguage = languageObject.lang;
        })
    }

    setLanguage(langObj: any) {
        this.selectedLangObj = langObj;
        this.translate.use(langObj.value)
    }
}