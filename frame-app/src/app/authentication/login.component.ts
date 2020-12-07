import { Component } from '@angular/core';
import { NgModule, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { AuthenticateService } from './authenticate.service';
import { AddressService } from '../utilities/address.service';
import { User } from './user';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

@Component ({
  selector: 'login_prompt',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    @Input() user: User = new User();
    @Output() onLogin = new EventEmitter<User>();
    private logged: boolean = false;
    message: string;
    username: string;
    password: string;

    constructor(private http: HttpClient, private authService: AuthenticateService, private addressService: AddressService, private router: Router) { }

    ngOnInit(): void {
        this.logged = this.authService.isLoggedIn();
        this.user = this.authService.getUser();
    }

    doLogin(): void {
        this.authService.doLogin(this.username, this.password).subscribe(data => {
            this.user = this.authService.getUser();
            this.username = "";
            this.password = "";
            if (this.user) {
                console.log(data);
                this.logged = true;
                this.router.navigate(['/admin']);
            } else {
                this.logged = false;
                this.message = this.authService.getUser().name;
            }
        });
    }

    doLogout(): void {
        this.authService.doLogout().subscribe(value => {
            this.user = this.authService.getUser();
            this.username = "";
            this.password = "";
            this.logged = value;
            this.router.navigate(['/login']);
        });
    }
}
