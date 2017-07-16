import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { UrlService } from './url.service';
import { Observable } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Line } from './line.interface';

@Injectable()
export class LogService {
    public constructor(private http: Http) {};

    public readFile(forwardReader: boolean, file: string, block: number): Observable<Array<Line>> {
        let url: string = UrlService.buildUrl('logs/readings/' + (forwardReader ? 'forwards' : 'backwards'));

        return this.http
            .post(url, { file : file, block: block })
            .distinctUntilChanged()
            .map(res => res.json())
            .catch(res => this.handleError(res))
        ;
    }

    public handleError(error: Response | any): ErrorObservable {
        if (!(error instanceof Response)) {
            return Observable.throw('Error in the connection');
        }

        return Observable.throw(error.json());
    }
}
