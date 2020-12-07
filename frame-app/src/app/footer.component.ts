import { Component } from '@angular/core';
import { NgModule, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    @Input() rightsHolder = '';
    @Input() year = '';
}
