import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FeatherModule } from 'angular-feather';
import { ArrowRightCircle, ArrowLeftCircle, Clock, DollarSign, FileText, MessageCircle, Trello } from 'angular-feather/icons';

import { TranslationModule } from "src/app/shared";

// import { AuthGuard } from "src/app/guard/auth.guard";

import { ResidenceComponent } from "./residence.component";
import { DashboardComponent } from "../residence/dashboard/dashboard.component";
import { RequestComponent } from "./request/request.component";
import { BookingComponent } from "./booking/booking.component";
import { TransactionComponent } from "./transaction/transaction.component";
import { FeedbackComponent } from "./feedback/feedback.component";

const routes: Routes = [
    {
        path: '',
        component: ResidenceComponent,
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'requests',
                component: RequestComponent
            },
            {
                path: 'booking',
                component: BookingComponent
            },
            {
                path: 'transaction',
                component: TransactionComponent
            },
            {
                path: 'feedback',
                component: FeedbackComponent
            }
        ]
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslateModule,
        TranslationModule,
        FeatherModule.pick({
            ArrowRightCircle,
            ArrowLeftCircle,
            Clock,
            DollarSign,
            FileText,
            MessageCircle,
            Trello
        }),
    ],
    declarations: [
        ResidenceComponent,
        DashboardComponent,
        RequestComponent,
        BookingComponent,
        TransactionComponent,
        FeedbackComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})

export class ResidenceModule { }