import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class UploadFileService {

    constructor(private http: HttpClient) {}

    pushFileToStorage(file: File, endPoint: string): Observable<HttpEvent<{}>> {
        const formdata: FormData = new FormData();
        formdata.append('file', file);
        const req = new HttpRequest('POST', endPoint, formdata, {
                reportProgress: true,
                responseType: 'text'
            }
        );
        return this.http.request(req);
    }

}