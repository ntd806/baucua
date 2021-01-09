import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowScrollService {
  private scrollY: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public scrollY$: Observable<number>;

  constructor() {
    this.scrollY$ = this.scrollY.asObservable();
  }

  public updateScrollY(value: number) {
    this.scrollY.next(value);
  }
}
