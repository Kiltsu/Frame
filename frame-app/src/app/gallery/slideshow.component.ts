import { Component } from '@angular/core';
import { NgModule, Input, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { Album } from './albums.component';
import { AddressService } from '../utilities/address.service';

class Image {
    file: string;
    name: string;
}

interface ItemResults {
    items: Image[];
}

@Component ({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideShowComponent implements OnInit {

    results: Image[];
    visible: Boolean = false;
    album: Album;
    selectedImage: Image;
    @Input() title: string;
    @Input()
    set selectedAlbum(selectedAlbum: Album) {
        if (selectedAlbum) {
            this.album = selectedAlbum;
            this.visible = true;
            this.getPics();
            this.selectedImage = null;
        } else {
            this.visible = false;
        }
    }

    constructor(private http: HttpClient, private addressService: AddressService) {

    }

    ngOnInit(): void {
    }

    getPics(): void {
        if (this.album.id) {
            this.http.get<ItemResults>(this.addressService.getRootUrl() + '/gallery/pics', {
                params: new HttpParams({
                    fromString: 'album=' + this.album.id
                })
            }).subscribe(data => {
                this.results = data.items;
            });
        }
    }

    doSelectImage(image: Image) {
        this.selectedImage = image;
    }
}
