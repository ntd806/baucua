import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild } from '@angular/router';
import { AuthenticationService } from '@app/shared/common/_service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    getCurrentUser() {
        const currentUser = this.authenticationService.getCurrentUser();
        return currentUser;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.getCurrentUser()) {
            // authorized so return true
            return true;
        }

        // not logged in so redirect to login page with the returnUrl
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // check if route is restricted by role
        if (this.getCurrentUser() && route.data.roles && route.data.roles.indexOf(this.getCurrentUser().role) === -1) {
            // role not authorized so redirect to home page
            this.router.navigate(['/web']);
            return false;
        }
        return true;
    }
}
