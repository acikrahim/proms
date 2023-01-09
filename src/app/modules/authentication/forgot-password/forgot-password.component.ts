import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { AuthService } from "src/app/services/auth.service";

import { ForgotPasswordResponse } from "src/app/models/interfaces";

@Component({
    selector: 'auth-forgot-password',
    templateUrl: 'forgot-password.component.html'
})

export class AuthForgotPassword implements OnInit {
    constructor(
        private form: FormBuilder,
        private auth: AuthService,
    ) {

    }

    forgotPasswordForm = this.form.group({
        email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    })

    ngOnInit(): void {
        
    }

    public sendForgotPasswordForm() {
        console.log(this.forgotPasswordForm.controls.email)
        this.forgotPasswordForm.markAllAsTouched();
        if (this.forgotPasswordForm.valid) {
            this.auth.forgotPassword(this.forgotPasswordForm.value).subscribe({
                next: (response: ForgotPasswordResponse) => {
                    console.log(response)
                },
                error: err => {
                    console.log(err)
                }
            });
        }
    }
}