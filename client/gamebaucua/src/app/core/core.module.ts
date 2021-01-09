import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login';
import { SidenavComponent, LayoutComponent } from './layout';
import { RegisterComponent } from './register';
import { SharedModule } from '@app/shared/shared.module';
import { AppComponent } from './app/app.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

@NgModule({
  declarations: [
    SidenavComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    AppComponent,
    ToolbarComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    SocialLoginModule
  ],
  exports: [
    SidenavComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    AppComponent
  ],
  providers: [
      {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '516187696311-rrhd81igudtkn1georeru90ggi9k1u94.apps.googleusercontent.com'
            )
          },
          // {
          //   id: FacebookLoginProvider.PROVIDER_ID,
          //   provider: new FacebookLoginProvider('clientId')
          // }
        ]
      } as SocialAuthServiceConfig,
    }
  ]
})
export class CoreModule { }
