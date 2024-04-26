import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  baseurl: string = "http://localhost:3000/";

  headers: HttpHeaders = new HttpHeaders({
    'content-type': 'application/json'
  })

  getDataFromServer(endPoint: string, params: HttpParams = new HttpParams()) {
    const url = this.baseurl + endPoint;
    return this.http.get(url, { headers: this.headers, params: params });
  }

  postDataFromServer(endPoint: string, data: any) {
    const url = this.baseurl + endPoint;
    return this.http.post(url, data, { headers: this.headers });
  }
}
