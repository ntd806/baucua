import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBtnAnimate]'
})
export class AnimateDirective implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2
  ) { }

  public ngOnInit() {
    this.renderer2.addClass(this.elementRef.nativeElement, 'btn--animate');
  }
}
