import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocalStorageService } from './local-storage.service';

import { LoginResponse, ForgotPasswordResponse } from '../models/interfaces';

const REGISTER_API = 'http://localhost:1337/api/auth/local/register';
const LOGIN_API = 'http://localhost:1337/api/auth/local';
const FORGOT_PASSWORD_API = 'http://localhost:1337/api/auth/forgot-password';
const RESET_PASSWORD_API = 'http://localhost:1337/api/auth/reset-password';
const CHANGE_PASSWORD_API = 'http://localhost:1337/api/auth/change-password';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private localStorage: LocalStorageService
    ) {

    }

    register(registerForm: Object): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(
            REGISTER_API,
            registerForm,
            httpOptions
        )
    } 

    login(loginForm: Object): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(
            LOGIN_API,
            loginForm,
            httpOptions
        )
    }

    forgotPassword(emailObj: Object): Observable<ForgotPasswordResponse> {
        return this.http.post<ForgotPasswordResponse>(
            FORGOT_PASSWORD_API,
            emailObj,
            httpOptions
        )
    }

    resetPassword(resetPasswordForm: Object): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(
            RESET_PASSWORD_API,
            resetPasswordForm,
            httpOptions
        )
    }

    changePassword(changePasswordForm: Object): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(
            CHANGE_PASSWORD_API,
            changePasswordForm,
            httpOptions
        )
    }

    logout() {
        this.localStorage.clear();
    }
}