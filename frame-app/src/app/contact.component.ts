import { Component } from '@angular/core';
import { NgModule, Input }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { AddressService } from './utilities/address.service';
import { Company } from '../../../frame-core/src/company';

/*class About {
    name: string;
    vatNumber: string;
    address: string;
    state: string;
    phone: string;
    country: string;
    postNumber: number;
}*/

class AboutResponse {
    page: Company;
    error: boolean;
    message: string;
}

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./app.component.css']
})
export class ContactComponent {

    info: Company;

    constructor(private http: HttpClient, private addressService: AddressService) { }

    ngOnInit(): void {
        // Make the HTTP request:
        this.http.get<AboutResponse>(this.addressService.getRootUrl() + "/cms/about").subscribe(data => {
            this.info = data.page;
        });
    }
}
