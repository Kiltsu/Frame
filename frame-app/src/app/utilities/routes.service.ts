import { Injectable } from '@angular/core';

@Injectable()
export class RoutesService {

    private rootUrl: string = "http://localhost:8080";

    getRootUrl(): string {
        return this.rootUrl;
    }
}
