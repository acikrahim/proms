import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";

import { AuthService, SessionService, ErrorHandlingService, LoadingService } from "src/app/services/";

import { LoginResponse } from "src/app/models/interfaces";

@Component({
    selector: 'auth-login',
    templateUrl: 'login.component.html'
})

export class AuthLogin implements OnInit {

    constructor(
        private form: FormBuilder,
        private auth: AuthService,
        private session: SessionService,
        public router: Router,
        private errorHandling: ErrorHandlingService,
        private loadingService: LoadingService
    ) {

    }

    loginForm = this.form.group({
        identifier: [null, Validators.required],
        password: [null, Validators.required]
    })

    ngOnInit(): void {
        this.auth.logout();
    }

    public sendLoginForm() {
        this.loginForm.markAllAsTouched();
        if (this.loginForm.valid) {
            this.loadingService.showLoading()
            this.auth.login(this.loginForm.value).subscribe({
                next: (response: LoginResponse) => {
                    this.session.user = response.user;
                    this.session.jwtToken = response.jwt;
                    this.loadingService.hideLoading()
                    this.router.navigate(['./'])
                },
                error: e => {
                    this.errorHandling.getErrorHandlingModal(e.error.error);
                    this.loginForm.reset()
                }
            });
        }
    }
}