import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appScrollToView]',
})
export class ScrollToViewDirective {
  /*
    There are 4 the ways to listen window scrolling event
    1. using rendered2 with the listen method.
    2. using @HostListener decorator which is provided by angular
    3. using RxJS with fromevent operator
    4. using (window:scroll) or (scroll) event emitter on any HTML element to trigger scrolling event.
    Example: https://itnext.io/4-ways-to-listen-to-page-scrolling-for-dynamic-ui-in-angular-ft-rxjs-5a83f91ee487
  */

  @Input() targetId: string;

  @HostListener('click', ['$event.target']) onClick() {
    const targetElementRef = document.getElementById(this.targetId);
    targetElementRef.scrollIntoView();
  }
}
