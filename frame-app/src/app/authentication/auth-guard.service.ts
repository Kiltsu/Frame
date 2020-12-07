import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { User } from './user';
import { AuthenticateService } from './authenticate.service';
import { Observable, Subject } from 'rxjs/Rx';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthenticateService, private router: Router) { }

    canActivate() {
        return this.checkLogin();
    }

    checkLogin(): Subject<boolean> {
        let retVal: Subject<boolean> = new Subject();
        this.authService.doAuthenticate().subscribe(value => {
            retVal.next(value);
            if (!this.authService.getUser()) {
                this.router.navigate(['/login']);
            }
        });
        // Navigate to the login page with extras
        return retVal;
    }
}
