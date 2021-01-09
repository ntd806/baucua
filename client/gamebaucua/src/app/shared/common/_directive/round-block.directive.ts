import { Renderer2, ElementRef, Directive, OnInit, Input, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appRoundBlock]'
})
export class RoundBlockDirective implements OnInit {
  @Input() appRoundBlock: string;
  @Input() className: string;
  @Input() styleName: string;

  constructor(
     private renderer2: Renderer2,
     private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.initialize();
  }

  @HostListener('click') onClick() {
    this.elementRef.nativeElement.classList.toggle(this.className);
  }

  private setStyles(style: string, value: string) {
    this.renderer2.setStyle(this.elementRef.nativeElement, style, value);
  }

  private setClass(className: string) {
    this.renderer2.addClass(this.elementRef.nativeElement, className);
  }

  private initialize() {
    this.setStyles(this.styleName, this.appRoundBlock);
    this.setClass(this.className);
  }
}
