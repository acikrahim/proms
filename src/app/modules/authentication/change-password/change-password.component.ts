import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService, SessionService, ErrorHandlingService } from "src/app/services/";

import { LoginResponse } from "src/app/models/interfaces";

@Component({
    selector: 'auth-change-password',
    templateUrl: 'change-password.component.html'
})

export class AuthChangePassword implements OnInit {
    constructor(
        private form: FormBuilder,
        private auth: AuthService,
        private session: SessionService,
        public router: Router,
        private errorHandling: ErrorHandlingService
    ) {

    }

    changePasswordForm = this.form.group({
        password: [null, Validators.required],
        currentPassword: [null, Validators.required],
        passwordConfirmation: [null, Validators.required]
    })

    ngOnInit(): void {
        
    }

    public sendChangePasswordForm() {
        this.changePasswordForm.markAllAsTouched();
        if (this.changePasswordForm.valid) {
            this.auth.changePassword(this.changePasswordForm.value).subscribe({
                next: (response: LoginResponse) => {
                    this.session.user = response.user;
                    this.session.jwtToken = response.jwt;
                    this.router.navigate(['./home/parallax'])
                },
                error: e => {
                    this.errorHandling.getErrorHandlingModal(e.error.error);
                }
            });
        }
    }
}