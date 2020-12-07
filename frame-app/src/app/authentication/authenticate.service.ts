import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { User } from './user';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import { AddressService } from '../utilities/address.service';

class UserResponse {
    error: boolean;
    message: string;
    user: User;
}

@Injectable()
export class AuthenticateService {

    user: User;
    logged: boolean = false;

    constructor(private http: HttpClient, private addressService: AddressService) {}

    doLogin(username: string, password: string): Subject<boolean> {
        let retVal: Subject<boolean> = new Subject();
        let params: HttpParams = new HttpParams();
        params = params.append("name", username);
        params = params.append("token", password);
        this.http.post<UserResponse>(this.addressService.getRootUrl() + '/auth/login', {
             params: params,
            withCredentials: true
        }).subscribe(data => {
            this.user = data.user;
            if (this.user) {
                retVal.next(true);
                console.log("logged in");
                this.logged = true
            } else {
                retVal.next(false);
                console.log("not logged in");
                this.logged = false;
            }
        });
        return retVal;
    }

    doAuthenticate(): Subject<boolean> {
        let retVal: Subject<boolean> = new Subject();
        this.http.post<UserResponse>(this.addressService.getRootUrl() + '/auth/check', {
            withCredentials: true
        }).subscribe(data => {
            this.user = data.user;
            if (this.user) {
                retVal.next(true);
                console.log("logged in");
                this.logged = true
            } else {
                retVal.next(false);
                console.log("not logged in");
                this.logged = false;
            }
        });
        return retVal;
    }

    doLogout(): Subject<boolean> {
        let retVal: Subject<boolean> = new Subject();
        this.http.get<User>(this.addressService.getRootUrl() + '/auth/logout', {
            withCredentials: true
        }).subscribe(data => {
            this.user = new User();
            this.logged = false;
            retVal.next(this.logged);
        });
        return retVal;
    }

    getUser(): User {
        return this.user;
    }

    isLoggedIn(): boolean {
        console.log("is logged in : " + this.logged);
        return this.logged;
    }
}
