import { Component } from '@angular/core';
import { NgModule, Input, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AddressService } from '../utilities/address.service';

export class Album {
    id: number;
    name: string;
}

interface ItemResults {
    items: Album[];
}

@Component ({
  selector: 'app-image-gallery',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

    albums: Album[];
    selectedAlbum: Album = new Album();

    constructor(private http: HttpClient, private addressService: AddressService) {
    }

    ngOnInit(): void {
        // Make the HTTP request:
        this.http.get<ItemResults>(this.addressService.getRootUrl() + '/gallery/albums').subscribe(data => {
            this.albums = data.items;
        });
    }

    doSelectAlbum(album): void {
        this.selectedAlbum = album;
    }
}

