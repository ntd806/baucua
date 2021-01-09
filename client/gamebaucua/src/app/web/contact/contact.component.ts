import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit {
  @Input() contact$: Observable<{phone: string, address: string}>;
  constructor(private changeDetection: ChangeDetectorRef) { }

  ngOnInit() {
    this.contact$.subscribe(contact => {
      if(contact) {
        this.changeDetection.markForCheck();
      }
    });
  }

}
