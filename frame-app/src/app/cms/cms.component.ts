import { Component } from '@angular/core';
import { NgModule, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule, HttpClient } from '@angular/common/http';
// services
import { AuthGuard } from '../authentication/auth-guard.service';
import { AuthenticateService } from '../authentication/authenticate.service';
import { AddressService } from '../utilities/address.service';

@Component({
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css']
})
export class CmsComponent {

    constructor() {
    }
}
