import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FeatherModule } from 'angular-feather';
import { ArrowRightCircle, ArrowLeftCircle, Trello } from 'angular-feather/icons';

import { TranslationModule } from "src/app/shared";

import { AuthGuard } from "src/app/guard/auth.guard";

import { AdminComponent } from "./admin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            }
        ]
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        TranslationModule,
        FeatherModule.pick({
            ArrowRightCircle,
            ArrowLeftCircle,
            Trello
        }),
    ],
    declarations: [
        AdminComponent,
        DashboardComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})

export class AdminModule { }