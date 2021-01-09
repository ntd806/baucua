import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { User, Role } from '@app/shared/common';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ToolbarComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('currentUser') currentUser: User;
  @Output() toggle = new EventEmitter<any>();
  @Output() logout = new EventEmitter<any>();
  admin = Role.Admin;

  constructor() { }

  ngOnInit() {
  }

  toggleSideBar() {
    this.toggle.emit();
  }
}
