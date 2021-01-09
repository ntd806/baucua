import { AlertService } from './../../_service/alert.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  message$: Observable<any>;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.message$ = this.alertService.message$.pipe(
      tap((message) => {
        switch (message && message.type) {
          case 'success':
            message.cssClass = 'alert alert-success';
            break;
          case 'error':
            message.cssClass = 'alert alert-error';
            break;
        }
        return message;
      })
    );
  }

  close() {
    this.alertService.clear();
  }
}
