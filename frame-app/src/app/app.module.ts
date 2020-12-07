import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NewsComponent } from './news.component';
import { ContactComponent } from './contact.component';
import { FooterComponent } from './footer.component';
import { HeaderComponent } from './header.component';
import { CmsComponent } from './cms/cms.component';
import { AdminComponent } from './cms/admin.component';
import { EditComponent } from './cms/edit.component';
import { SlideShowComponent } from './gallery/slideshow.component';
import { AlbumsComponent } from './gallery/albums.component';
import { BillingComponent } from './billing/billing.component';
import { LoginComponent } from './authentication/login.component';
// services
import { AuthGuard } from './authentication/auth-guard.service';
import { AuthenticateService } from './authentication/authenticate.service';
import { AddressService } from './utilities/address.service';

const appRoutes: Routes = [
    {
        path: 'news',
        component: NewsComponent,
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'gallery',
        component: AlbumsComponent
    },
    {
        path: 'admin',
        component: CmsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    { path: '', redirectTo: '/news', pathMatch: 'full' }
];

@NgModule({
    declarations: [
        AppComponent,
        NewsComponent,
        ContactComponent,
        FooterComponent,
        CmsComponent,
        SlideShowComponent,
        AlbumsComponent,
        BillingComponent,
        LoginComponent,
        AdminComponent,
        EditComponent,
        HeaderComponent
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
        ),
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
    ],
    providers: [
        AuthGuard,
        AuthenticateService,
        AddressService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
