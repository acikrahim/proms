import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { LocalStorageService, ModalService } from '../services';
import { Property, Unit } from '../models/interfaces';

const FACILITY_API = 'http://localhost:1337/api/facilities/';
const COMPONENT_API = 'http://localhost:1337/api/content-type-builder/components'
const FILTER_FACILITY_API = 'http://localhost:1337/api/facilities?';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})
export class FacilityService {
    constructor(
        private http: HttpClient,
        private modal: ModalService,
        private localStorage: LocalStorageService
    ) {

    }

    getFacilities(property: Property) {
        return this.http.get(
            `${FILTER_FACILITY_API}populate=%2A&filters[property][id][$eq]=${property.id}`,
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
        let form = Object.assign({}, unitForm, { property: property.id })
        return this.http.post<Unit>(
            FACILITY_API,
            {
                data: form
            },
            httpOptions
        )
    }

    editUnit(unitForm: Object, id: Number): Observable<Unit> {
        return this.http.put<Unit>(
            FACILITY_API + id,
            {
                data: unitForm
            },
            httpOptions
        )
    }

    deleteUnit(id: Number): Observable<Unit> {
        return this.http.delete<Unit>(
            FACILITY_API + id,
            httpOptions
        ).pipe(
            map((response: any) => {
                return <Unit>Object.assign({}, { id: response.data.id }, response.data.attributes)
            })
        )

    }

    getComponents(): Observable<any> {
        return this.http.get<any>(
            COMPONENT_API,
            httpOptions
        ).pipe(
            map((response: any) => {
                return response.data.map((o: any) => {
                    return Object.assign({}, { id: o.id }, o.attributes);
                }, Array<any>);
            })
        )
    }

}