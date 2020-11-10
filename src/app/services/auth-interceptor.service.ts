import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../account/account.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const token: string = localStorage.getItem('token');
    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }
    console.log(req)
    return next.handle(request);
  }
  
  constructor() { }
}
