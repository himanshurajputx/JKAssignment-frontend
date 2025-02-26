import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[lowercase]',
})
export class LowercaseInputDirective {
  lastValue: string = '';

  constructor(private ref: ElementRef) {}

  @HostListener('input', ['$event']) onInput($event: Event) {
    const input = $event.target as HTMLInputElement;
    const start = input.selectionStart;
    const end = input.selectionEnd;

    input.value = input.value.toLowerCase();
    input.setSelectionRange(start, end);
    $event.preventDefault();

    if (!this.lastValue || this.lastValue !== input.value) {
      this.lastValue = this.ref.nativeElement.value = input.value;

      // Propagate the change
      const evt = new Event('input', { bubbles: true, cancelable: true });
      input.dispatchEvent(evt);
    }
  }
}
