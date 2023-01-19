import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FeatherModule } from 'angular-feather';
import { ArrowRightCircle, ArrowLeftCircle, Dribbble, Edit, Home, Layers, Search, Trash2, Trello } from 'angular-feather/icons';

import { TranslationModule, ValidationMessageModule } from "src/app/shared";

import { AuthGuard } from "src/app/guard/auth.guard";

import { SuperAdminComponent } from "./super-admin.component";
import { DashboardSuperAdminComponent } from "./dashboard/dashboard.component";
import { PropertyComponent } from "./property/property.component";
import { UnitComponent } from "./unit/unit.component";
import { FacilityComponent } from "./facility/facility.component";

const routes: Routes = [
    {
        path: '',
        component: SuperAdminComponent,
        children: [
            {
                path: '',
                component: DashboardSuperAdminComponent
            },
            {
                path: 'property',
                component: PropertyComponent
            },
            {
                path: 'unit',
                component: UnitComponent
            },
            {
                path: 'facility',
                component: FacilityComponent
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
        ValidationMessageModule,
        FeatherModule.pick({
            ArrowRightCircle,
            ArrowLeftCircle,
            Dribbble,
            Edit,
            Home,
            Layers,
            Search,
            Trash2,
            Trello
        }),
    ],
    declarations: [
        SuperAdminComponent,
        DashboardSuperAdminComponent,
        PropertyComponent,
        UnitComponent,
        FacilityComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})

export class SuperAdminModule { }