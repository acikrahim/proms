import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TranslationModule } from "src/app/shared";

// import { AuthGuard } from "src/app/guard/auth.guard";

import { HomeComponent } from "./home.component";
import { HomeParallax } from "./parallax/parallax.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: HomeParallax
            },
            // {
            //     path: 'register',
            //     component: AuthRegister
            // },
            // {
            //     path: 'forgot-password',
            //     component: AuthForgotPassword
            // },
            // {
            //     path: 'reset-password',
            //     component: AuthResetPassword,
            //     canActivate: [AuthGuard]
            // },
            // {
            //     path: 'change-password',
            //     component: AuthChangePassword,
            //     canActivate: [AuthGuard]
            // }
        ]
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        // FormsModule,
        // ReactiveFormsModule,
        TranslateModule,
        TranslationModule,
    ],
    declarations: [
        HomeComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})

export class HomeModule { }