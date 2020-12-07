import { Component } from '@angular/core';
import { NgModule, Input } from '@angular/core';

@Component({
  selector: 'app-site-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    @Input() logo: String = '';
}
