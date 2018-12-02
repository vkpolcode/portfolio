import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
  ) {
    this.baseUrl = environment.api_url;
  }

  public delete(path: string, options?: any): Observable<any> {
    return this.request(path, 'delete', options);
  }

  public get(path: string, options?: any): Observable<any> {
    return this.request(path, 'get', options);
  }

  public post(path: string, options?: any, cognito?: boolean): Observable<any> {
    return this.request(path, 'post', options, cognito);
  }

  public put(path: string, options: any): Observable<any> {
    return this.request(path, 'put', options);
  }

  public patch(path: string, options: any): Observable<any> {
    return this.request(path, 'patch', options);
  }

  private request(path: string, method: string, options?: any, cognito?: boolean): Observable<any> {
    options = options || {};
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    const requestOptions = Object.assign(options, {
      headers: headers,
      observe: 'response'
    });
    return this.http.request(method, `${this.baseUrl}${path}`, requestOptions);
  }
}
