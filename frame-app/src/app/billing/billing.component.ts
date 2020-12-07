import { Component } from '@angular/core';
import { NgModule, Input, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AddressService } from '../utilities/address.service';

export class Biller {
    id: number;
    name: string;
    vatNumber: string;
    address: string;
    state: string;
    country: string;
    postNumber: number;
}

export class Bill {
    id: number;
    product: string;
    price: number;
    vatNumber: string;
    buyerName: string;
    buyerAddress: string;
}

interface Result {
    company: Biller;
    error: boolean;
    message: string;
}

@Component ({
  selector: 'billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

    @Input() biller: Biller = new Biller();
    @Input() bill: Bill = new Bill();
    private date: Date = new Date();

    constructor(private http: HttpClient, private addressService: AddressService) {
    }

    ngOnInit(): void {
        // Make the HTTP request:
        this.http.get<Result>(this.addressService.getRootUrl() + '/billing/company', {
            withCredentials: true,
        }).subscribe(data => {
            if (!data.error) {
                this.biller = data.company;
            }
        });
    }
}
