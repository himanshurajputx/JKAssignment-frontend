
import {Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {LoaderService} from '../service/loader.service';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'loading',
  template: `
    <div id="pause" class="d-flex align-items-center justify-content-center" *ngIf="(loader.isLoading$ | async)">
      <div id="spinner"></div>
    </div>`,

  imports: [
    AsyncPipe,
    NgIf
  ]
})

export class LoadingComponent {
  constructor(public loader: LoaderService) { }
}
