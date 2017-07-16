import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class UrlService {
    public static buildUrl(route: string): string {
        return environment.apiBaseUrl + '/' + route;
    }
}
