import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { LocalStorageService, ModalService } from '../services';
import { Property } from '../models/interfaces';

const PROPERTY_API = 'http://localhost:1337/api/properties/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})
export class PropertyService {
    constructor(
        private http: HttpClient,
        private modal: ModalService,
        private localStorage: LocalStorageService
    ) {

    }

    getProperties() {
        return this.http.get(
            PROPERTY_API,
            httpOptions
        ).pipe(
            map((response: any) => {
                return response.data.map((o: any) => {
                    return Object.assign({}, { id: o.id }, o.attributes);
                }, Array<Property>);
            })
        )
    }

    addProperty(propertyForm: Object): Observable<Property> {
        return this.http.post<Property>(
            PROPERTY_API,
            {
                data: propertyForm
            },
            httpOptions
        )
    }

    editProperty(propertyForm: Object, id: Number): Observable<Property> {
        return this.http.put<Property>(
            PROPERTY_API + id,
            {
                data: propertyForm
            },
            httpOptions
        )
    }

    deleteProperty(id: Number): Observable<Property> {
        return this.http.delete<Property>(
            PROPERTY_API + id,
            httpOptions
        ).pipe(
            map((response: any) => {
                return <Property>Object.assign({}, { id: response.data.id}, response.data.attributes)
            })
        )
        
    }

}