import { Component }  from '@angular/core';
import { NgModule, Input }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AddressService } from './utilities/address.service';
import { DomSanitizer } from '@angular/platform-browser';

class Link {
    name: String;
    target: Number;
}

class Response {
    links: Link[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    urlRoot: string;
    links: Link[];

    constructor(private http: HttpClient, private addressService: AddressService, private domSanitizer: DomSanitizer) {
        this.urlRoot = addressService.getRootUrl();
    }

    ngOnInit(): void {
        // Make the HTTP request:
        this.http.get<Response>(this.addressService.getRootUrl() + "/cms/pages?name=Kiltsun sivu").subscribe(data => {
            this.links = data.links;
        });
    }
}
