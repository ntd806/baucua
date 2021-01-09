import { Router, NavigationStart } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject: BehaviorSubject<any>;
  message$: Observable<any>;
  // This variable is used to check keeping or not alert message.
  keepAfterRouteChange: boolean;

  constructor(private router: Router) {
    this.subject = new BehaviorSubject<any>(null);
    this.message$ = this.subject.asObservable();

    // clear alert message on route change until keepAfterRouteChange
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        }
      } else {
        this.clear();
      }
    });

    this.keepAfterRouteChange = false;
  }

  success(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    return this.subject.next({ type: 'success', text: message});
  }

  error(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    return this.subject.next({ error: 'error', text: message});
  }

  clear() {
    return this.subject.next(null);
  }
}
