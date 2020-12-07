import { Component } from '@angular/core';
import { NgModule, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { AddressService } from './../utilities/address.service';
import { Page } from '../../../../frame-core/src/page';

class PagesResponse {
    error: boolean;
    message: string;
    pages: Page[];
}

@Component({
  selector: 'admin_panel',
  templateUrl: './admin.component.html',
  styleUrls: ['./cms.component.css']
})
export class AdminComponent {
    @Input() text = '';

    pages: Page[];
    selectedPage: Page;

    constructor(private http: HttpClient, private addressService: AddressService) {
    }

    ngOnInit(): void {
        // Make the HTTP request:
        this.http.get<PagesResponse>(this.addressService.getRootUrl() + "/cms/pages").subscribe(data => {
            this.pages = data.pages;
        });
    }

    setSelected(page: Page): void {
        this.selectedPage = page;
    }

    commit(): void {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                //'Authorization': 'my-auth-token'
                //'Content-Type': 'application/json',
            }),
        };
        this.http.post(this.addressService.getRootUrl() + "/cms/save", this.selectedPage, httpOptions).subscribe(data => {

        });
    }

    addPage(): void {
        let page = new Page();
        page.name = "Uusi sivu";
        this.pages.push(page);
    }
}
