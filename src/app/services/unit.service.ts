import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { LocalStorageService, ModalService } from '../services';
import { Property, Unit } from '../models/interfaces';

const UNIT_API = 'http://localhost:1337/api/units/';
const FILTER_UNIT_API = 'http://localhost:1337/api/units?';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})
export class UnitService {
    constructor(
        private http: HttpClient,
        private modal: ModalService,
        private localStorage: LocalStorageService
    ) {

    }

    getUnits(property: Property) {
        return this.http.get(
            `${FILTER_UNIT_API}filters[property][id][$eq]=${property.id}`,
            httpOptions
        ).pipe(
            map((response: any) => {
                return response.data.map((o: any) => {
                    return Object.assign({}, { id: o.id }, o.attributes);
                }, Array<Property>);
            })
        )
    }

    addSingleUnit(unitForm: Object, property: Property): Observable<Unit> {
        let form = Object.assign({}, unitForm, { property: property.id})
        return this.http.post<Unit>(
            UNIT_API,
            {
                data: form
            },
            httpOptions
        )
    }

    editUnit(unitForm: Object, id: Number): Observable<Unit> {
        return this.http.put<Unit>(
            UNIT_API + id,
            {
                data: unitForm
            },
            httpOptions
        )
    }

    deleteUnit(id: Number): Observable<Unit> {
        return this.http.delete<Unit>(
            UNIT_API + id,
            httpOptions
        ).pipe(
            map((response: any) => {
                return <Unit>Object.assign({}, { id: response.data.id }, response.data.attributes)
            })
        )

    }

}