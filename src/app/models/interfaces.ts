import { TemplateRef } from '@angular/core';

export interface ApiErrorResponse {
    details: Object | {};
    message: string;
    name: string;
    status: number;
}

export interface LoginResponse {
    jwt: string;
    user: User;
}

export interface ForgotPasswordResponse {
    ok: boolean
}

export interface ModalContent {
    modalTitle: string;
    modalBody: string;
}

export interface Property {
    createdAt?: string;
    updatedAt?: string;
    id?: Number;
    name: string;
    address1?: string | undefined;
    address2?: string | undefined;
    city?: string | undefined;
    state?: string | undefined;
    postcode?: string | undefined;
    capacity?: Number | undefined;
}

export interface TemplateRefObj {
    templateName: string;
    templateRef: TemplateRef<any>;
}

export interface Unit {
    createdAt?: string;
    id?: Number;
    name: string;
    updatedAt?: string;
}

export interface User {
    blocked: boolean;
    confirmed: boolean;
    createdAt: string;
    email: string;
    id: number;
    provider: string;
    updatedAt: string;
    username: string;
}

