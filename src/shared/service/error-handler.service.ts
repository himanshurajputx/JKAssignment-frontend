import { Injectable, Injector, ErrorHandler } from '@angular/core';

import {AlertService} from '../alert';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

  constructor(private _injector: Injector,
              private alertService: AlertService) {
  }

  handleError(err: any) {
    console.error(err);
    // const _toaster: AlertToasterService = this._injector.get(AlertToasterService);

    this.alertService.error(err, 'error');
    return;
  }
}
