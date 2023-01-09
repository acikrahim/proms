import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { AuthService, SessionService } from "src/app/services";

import { LoginResponse } from "src/app/models/interfaces";

@Component({
    selector: 'auth-reset-password',
    templateUrl: 'reset-password.component.html'
})

export class AuthResetPassword implements OnInit {
    code: string | null = null;

    constructor(
        private form: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private session: SessionService,
        private auth: AuthService,
    ) {

    }

    resetPasswordForm = this.form.group({
        password: [null, Validators.required],
        passwordConfirmation: [null, Validators.required],
        code: ['', Validators.required]
    })

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.code = params.get('code');
            this.resetPasswordForm.controls['code'].setValue(this.code)
        })
    }

    public sendResetPasswordForm() {
        this.auth.resetPassword(this.resetPasswordForm.value).subscribe({
            next: (response: LoginResponse) => {
                this.session.user = response.user;
                console.log(response)
            },
            error: err => {
                console.log(err)
            }
        });
    }
}