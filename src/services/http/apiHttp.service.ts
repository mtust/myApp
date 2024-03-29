import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
  RequestOptionsArgs,
  ConnectionBackend,
  RequestOptions,
  Request,
  Response,
  XHRBackend,
  BrowserXhr,
  BaseRequestOptions,
  BaseResponseOptions,
  ResponseOptions
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiHttp extends Http {

  public baseUrl: string = 'http://localhost:8080';

  constructor(backend: ConnectionBackend, public http: Http,
              defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  public send(url: string | Request,
              options?: RequestOptionsArgs): Observable<Response> {
    return this.request(url, options);
  }

  public request(url: string | Request,
                 options?: RequestOptionsArgs): Observable<Response> {

    options = this.prepareOptions(options);

    return this.http.request(`${this.baseUrl}/${url}`, options);
  }

  /**
   * Performs a request with `getUnit` http method.
   */
  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {

    options = this.prepareOptions(options);

    return this.http.get(`${this.baseUrl}/${url}`, options);
  }

  /**
   * Performs a request with `post` http method.
   */
  public post(url: string, body,
              options?: RequestOptionsArgs): Observable<Response> {

    options = this.prepareOptions(options);

    return this.http.post(`${this.baseUrl}/${url}`, body, options);
  }

  /**
   * Performs a request with `put` http method.
   */
  public put(url: string, body: string,
             options?: RequestOptionsArgs): Observable<Response> {

    options = this.prepareOptions(options);

    return this.http.put(`${this.baseUrl}/${url}`, body, options);
  }
  /**
   * Performs a request with `delete` http method.
   */
  public delete(url: string,
                options?: RequestOptionsArgs): Observable<Response> {

    options = this.prepareOptions(options);

    return this.http.delete(`${this.baseUrl}/${url}`, options);
  }

  /**
   * Performs a request with `patch` http method.
   */
  public patch(url: string, body: string,
               options?: RequestOptionsArgs): Observable<Response> {

    options = this.prepareOptions(options);

    return this.http.patch(`${this.baseUrl}/${url}`, body, options);
  }

  /**
   * Performs a request with `head` http method.
   */
  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {

    options = this.prepareOptions(options);

    return this.http.head(`${this.baseUrl}/${url}`, options);
  }

  /**
   * Adding 0Auth authorization headers
   *
   * @param options
   * @returns {RequestOptionsArgs}
   */
  private prepareOptions(options?: RequestOptionsArgs) {

    let basicOptions: RequestOptionsArgs = {
      headers: new Headers({
        'Content-type': 'application/json',
        'Authorization': 'OAuth ' + localStorage.getItem('access_token')
        // 'X-Requested-With': 'XMLHttpRequest',
        //   'Authorization': 'Basic a2lkMT=='
      })
    };
    let reqOptions = new RequestOptions(basicOptions);
    // if (options)
    //   reqOptions = Object.assign({}, options);
    return reqOptions;
  }
}

export const API_HTTP_PROVIDERS: any[] = [
  { provide: ApiHttp,
    useFactory: (xhrBackend, http, requestOptions) =>
      new ApiHttp(xhrBackend, http, requestOptions),
    deps: [XHRBackend, Http, RequestOptions]
  },
  BrowserXhr,
  { provide: RequestOptions, useClass: BaseRequestOptions},
  { provide: ResponseOptions, useClass: BaseResponseOptions},
  XHRBackend
];
