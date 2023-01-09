import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginResponse } from "src/app/models/interfaces";

import { AuthService, SessionService, ErrorHandlingService } from "src/app/services/";

@Component({
    selector: 'auth-register',
    templateUrl: 'register.component.html'
})

export class AuthRegister implements OnInit {
    constructor(
        private form: FormBuilder,
        private auth: AuthService,
        private session: SessionService,
        public router: Router,
        private errorHandling: ErrorHandlingService
    ) {

    }

    registerForm = this.form.group({
        username: [null, Validators.required],
        email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        password: [null, Validators.required]
    })

    ngOnInit(): void {
        
    }

    public sendRegistration() {
        console.log(this.registerForm)

        this.registerForm.markAllAsTouched();
        if (this.registerForm.valid) {
            this.auth.register(this.registerForm.value).subscribe({
                next: (response: LoginResponse) => {
                    this.session.user = response.user;
                    this.session.jwtToken = response.jwt;
                    this.router.navigate(['./home/parallax'])
                },
                error: e => {
                    this.errorHandling.getErrorHandlingModal(e.error.error);
                    this.registerForm.reset()
                }
            });
        }
    }
}