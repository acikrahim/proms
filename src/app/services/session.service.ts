import { Injectable } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";

import { User } from "../models/interfaces";

@Injectable({
    providedIn: 'root'
})

export class SessionService {
    private readonly jwtKey = 'jwtKey';

    constructor(
        private localStorage: LocalStorageService
    ) {

    }

    set jwtToken(jwt: string) {
        this.localStorage.set(this.jwtKey, jwt);
    }

    get jwtToken() {
        return this.localStorage.getData(this.jwtKey);
    }

    get isJwtTokenExist() {
        return this.jwtToken != undefined && this.jwtToken != '';
    }

    set user(user: User) {
        this.localStorage.set('user', JSON.stringify(user))
    }

    removeUser() {
        this.localStorage.clear();
    }

}