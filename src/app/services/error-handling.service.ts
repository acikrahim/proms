import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../services';
import { ApiErrorResponse } from '../models/interfaces';


@Injectable({
	providedIn: 'root',
})
export class ErrorHandlingService {
	constructor(
		private modal: ModalService,
		private ngbModal: NgbModal
	) {

	}

	getErrorHandlingModal(errorResponse: ApiErrorResponse) {
		this.ngbModal.open(
			this.modal.getTemplateRef(
				'errorModal',
				{
					modalTitle: errorResponse.name.replace(/([A-Z])/g, ' $1').trim(),
					modalBody: errorResponse.message
				}
			)?.templateRef,
			{ centered: true }).result.then((result) => {
				console.log(result)
			}, (reason) => {
				console.log(reason)
			});
	}

}