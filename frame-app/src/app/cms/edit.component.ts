import { Component } from '@angular/core';
import { NgModule, Input }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModel } from '@angular/forms';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { AddressService } from './../utilities/address.service';
import { Page } from '../../../../frame-core/src/page';

class PagesResponse {
    error: boolean;
    message: string;
    pages: Page[];
}

@Component({
  selector: 'content_editor',
  templateUrl: './edit.component.html',
  styleUrls: ['./cms.component.css']
})
export class EditComponent {

    @Input() page: Page;

    constructor(private http: HttpClient, private addressService: AddressService) {
    }

    ngOnInit(): void {
        // Make the HTTP request:
       /* this.http.get<PagesResponse>(this.addressService.getRootUrl() + "/cms/pages").subscribe(data => {
            
        });*/
    }

    commit(): void {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                //'Authorization': 'my-auth-token'
                //'Content-Type': 'application/json',
            }),
        };
        this.http.post(this.addressService.getRootUrl() + "/cms/save", this.page, httpOptions).subscribe(data => {

        });
    }
}
