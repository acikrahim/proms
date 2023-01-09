import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { finalize } from 'rxjs/operators';

import { SessionService, LoadingService } from "../services";

@Injectable()

export class RequestInterceptorService implements HttpInterceptor {
    
    constructor(
        private session: SessionService,
        private loadingService: LoadingService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.includes('/assets/i18n')) {
            return next.handle(req)
        }

        if (this.session.isJwtTokenExist) {
            this.loadingService.showLoading()
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + this.session.jwtToken,
                },
            });
        }

        return next.handle(req).pipe(
            finalize(() => {
                this.loadingService.hideLoading()
            }),
            catchError(err => {
                if ([401, 403, 423, 400].includes(err.status)) {
                    //force logout
                    console.log('error', err)
                }
                return throwError(err)
            })
        )
    }
}