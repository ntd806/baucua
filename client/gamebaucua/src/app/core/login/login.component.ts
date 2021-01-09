import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, first } from 'rxjs/operators';
import { AuthenticationService, AlertService } from '@app/shared/common/_service';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public returnUrl: string;
  public submitted = false;
  public loading = false;
  public backgroundImages = [
    `
    linear-gradient(rgba(32, 32, 32, 0.4), rgba(49, 48, 48, 0.8)),
      url('https://images.hdqwalls.com/download/fitness-gym-girl-nb-1920x1080.jpg')`,
    `
    linear-gradient(rgba(32, 32, 32, 0.4), rgba(49, 48, 48, 0.8)),
      url('https://images7.alphacoders.com/692/thumb-1920-692042.jpg')
    `,
    `
    linear-gradient(rgba(32, 32, 32, 0.4), rgba(49, 48, 48, 0.8)),
      url('https://cdn.wallpapersafari.com/63/30/0eVMPo.jpg')
    `,
    `
    linear-gradient(rgba(32, 32, 32, 0.4), rgba(49, 48, 48, 0.8)),
      url(' https://eskipaper.com/images/gym-wallpaper-3.jpg')
    `
  ];

  user: SocialUser;
  loggedIn: boolean;
  provider = '';
  
  constructor(
    private authenticationService: AuthenticationService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authService: SocialAuthService
  ) { }

  ngOnInit() {
    this.signInWithSocial();

    // redirect user to home page if user has logged in.
    if (this.authenticationService.getCurrentUser()) {
      this.router.navigate(['/web/welcome-fitness']);  //replace url to redirect to BAUCUA dashboard page
    }
    this.createForm();

    // get returnUrl from router params or default to '/home'
    this.returnUrl = this.activatedRouter.snapshot.queryParams.returnUrl || '/welcome-fitness'; //replace url to redirect to BAUCUA dashboard page
  }

  get f() {
    return this.loginForm.controls;
  }

  createForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  signInWithSocial() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  onSubmit() {
    this.submitted = true;

    // stopped if login form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
    .pipe(
      debounceTime(2000),
      first(),
      )
      .subscribe(res => {
        if (res) {
          this.router.navigate([this.returnUrl]);
        }
      }, error => {
        // call alert service to emit error message.
        this.alertService.error(error, false);
        this.loading = false;
      });
  }

  signInWithGoogle(): void {
    this.provider = GoogleLoginProvider.PROVIDER_ID;
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.provider = FacebookLoginProvider.PROVIDER_ID;
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
