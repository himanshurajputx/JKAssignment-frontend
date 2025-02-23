import { Injectable, Injector, ErrorHandler } from '@angular/core';
import {ToastrService} from 'ngx-toastr';


@Injectable()
export class ErrorHandlerService implements ErrorHandler {

  constructor(private _injector: Injector,
              private toastr: ToastrService
  ) {
  }

  handleError(err: any) {
    console.error(err);
    // const _toaster: AlertToasterService = this._injector.get(AlertToasterService);

    this.toastr.error(err, 'error');
    return;
  }
}
