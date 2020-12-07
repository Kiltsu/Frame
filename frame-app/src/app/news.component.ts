import { Component } from '@angular/core';
import { NgModule, Input, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AddressService } from './utilities/address.service';
import { DomSanitizer } from '@angular/platform-browser';
import {Page} from "../../../frame-core/src/page";

class TextContent {
    id: number;
    header: string;
    content: string;
}

class Image {
    id: number;
    caption: string;
    fileName: string;
    width: number;
    height: number;
}

class News {
    contents: TextContent[];
    description: string;
    header: string;
    id: number;
    images: Image[];
    name: string;
}

@Component ({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

    page: Page;
    urlRoot: string;

    constructor(private http: HttpClient, private addressService: AddressService, private domSanitizer: DomSanitizer) {
        this.urlRoot = addressService.getRootUrl();
    }

    ngOnInit(): void {
        // Make the HTTP request:
        this.http.get<Page>(this.addressService.getRootUrl() + '/cms/page?id=1').subscribe(data => {
            this.page = data;
        });
    }

    makeImageUrl(file: string): string {
        return this.addressService.getRootUrl() + '/' + file;
    }
}
