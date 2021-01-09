import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { filter, catchError, tap } from 'rxjs/operators';
import { User, AlertService, UserService, AuthenticationService } from '@app/shared/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

class MyProvider {
  constructor() {
    console.log('This is my provider');
  }

  myProviderName = 'My Provider';
}

class MyProviderV2 {
  constructor() {
    console.log('This is my provider v2');
  }

  name = 'my provider v2';

  getProviderName() {
    return this.name;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  exportAs: 'MyHomeComponent',
  viewProviders: [MyProvider, MyProviderV2]
})
export class HomeComponent implements OnInit {
  loading: false;
  currentUser$: Observable<User>;
  userFromApi$: Observable<User>;
  contactData$: any;
  movies = [
    '1. How to upgrade to Angular 7',
    '2. Angular 7 CLI Prompts',
    '3. Application Performance',
    '4. Documentation Updates',
    '5. Dependency Updates',
    '6. Drag and Drop',
    '7. Virtual Scrolling',
    '8. Improved Accessibility of Selects',
    '9. Partner Launches',
    '10. Angular Elements'
  ];

  todo = [
    'Angular 5',
    'Angular js',
    'CSS',
    'Javascript',
    'Mango DB'
  ];

  done = [
    'Angular 7',
    'TypeScript',
    'HTML 5',
    'Entity Freamwork',
    'Bootstrap',
    'Sql Server'
  ];

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private myProvider: MyProvider,
    private myProviderV2: MyProviderV2
  ) { }

  ngOnInit() {
    this.currentUser$ = this.authenticationService.currentUser$;
    this.userFromApi$ = this.userService.getById(this.authenticationService.getCurrentUser().id).pipe(
      tap(res => {
        if (res) {
          this.alertService.success('Success', false);
        }
      }),
      catchError(error => {
        this.alertService.error(error, false);
        return throwError(error);
      })
    );

    console.log(this.myProvider.myProviderName);
    console.log(this.myProviderV2.getProviderName());

    this.contactData$ = new BehaviorSubject({
      phone: '03244611633',
      address: '20 Le Van Huan TPHCM'
    });
  }

  changeContact() {
    this.contactData$.next({
      phone: '1234567899',
      address: '256 Dat Thanh Tan Binh, TPHCM'
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
