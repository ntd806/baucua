import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { WindowScrollService } from '@app/shared/common/_service/window-scroll.service';
import { fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import './app.less';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy = new Subject();
  public scrollY$: Observable<number>;

  constructor(private windowScrollService: WindowScrollService) {}

  public ngOnInit() {
    this.scrollY$ = this.windowScrollService.scrollY$;
    fromEvent(window, 'scroll')
      .pipe(takeUntil(this.destroy))
      .subscribe((e) => {
        this.windowScrollService.updateScrollY(this.getYPosition(e));
      });
  }

  public ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }

  private getYPosition(event: Event): number {
    return (event.target as Document).scrollingElement.scrollTop;
  }


}
