import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { first } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // URL = 'https://419a-34-236-68-37.ngrok-free.app/api/v1/';
  URL = 'https://needpedia.org/api/v1/';


  private dataObserved = new BehaviorSubject<any>('');
  currentEvent = this.dataObserved.asObservable();

  constructor(public http: HttpClient) { }

  publish(param: { name: any; email: any; }) {
    this.dataObserved.next(param);
  }

  private tagObserved = new BehaviorSubject<any>('');
  tagEvent = this.tagObserved.asObservable();

  PushlishTag(param: any) {
    this.tagObserved.next(param);
  }

  getData(subUrl?: string, params?: object) {
    console.log('Params:-', params, ' Sub Url:-', subUrl);
    console.log('URL:-', this.URL + subUrl);
    // console.log('Token:-', + this.token);
    return this.http
    .get(this.URL + subUrl, this.getHeader())
    .pipe(
      map((response: any) => response),
      catchError((error: any) => throwError(error))
    );
  }


  deleteData(subUrl?: string, params?: object) {
    console.log('Params:-', params, ' Sub Url:-', subUrl);
    console.log('URL:-', this.URL + subUrl);
    // console.log('Token:-', + this.token);
    return this.http
    .delete(this.URL + subUrl, this.getHeader())
    .pipe(
      map((response: any) => response),
      catchError((error: any) => throwError(error))
    );
  }

  login(resource:any, subUrl: string = 'sign_in') {
    const params = 'grant_type=password&username=' + resource.email + '&password=' + resource.password + '&device_token=' + resource.device_token;
    return this.http
      .post(this.URL + subUrl, params,
        { headers: { 'content-type': 'application/x-www-form-urlencoded' }})
        .pipe(
          map((response: any) => response),
          catchError((error: any) => throwError(error))
        );
  }

  signUp_signIn(resource:any, subUrl: string = '') {
    console.log('Resource:-', resource, ' SubUrl:-', subUrl);
    console.log('URL:-', this.URL + subUrl);
    return this.http
      .post(this.URL + subUrl, resource,
        { headers: { 'content-type': 'application/json' }})
        .pipe(
          map((response: any) => response),
          catchError((error: any) => throwError(error))
        );
  }


  postData(resource: any, subUrl: string = '') {
    const url = this.URL + subUrl;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);
  
    return this.http.post(url, resource, { headers, observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        const body = response.body;
        const headers = response.headers;
  
        return { body, headers };
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  updateData(subUrl: string = '', resource:any) {
    console.log('Resource:-', resource, 'Sub Url:-', subUrl);
    console.log('URL:-', this.URL + subUrl);
    return this.http
    .patch(this.URL + subUrl, resource, this.getHeader())
    .pipe(
      map((response: any) => response),
      catchError((error: any) => throwError(error))
    );
  }

  logOut(resource:any, subUrl: string = '') {
    console.log('Resource:-', resource, ' SubUrl:-', subUrl);
    console.log('URL:-', this.URL + subUrl);
    return this.http
      .post(this.URL + subUrl, resource)
      .pipe(
        map((response: any) => response),
        catchError((error: any) => throwError(error))
      );
  }

  getHeader() {
    console.log('Token:-', localStorage.getItem('auth_token'));
    return { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('auth_token')}};
  }
}

