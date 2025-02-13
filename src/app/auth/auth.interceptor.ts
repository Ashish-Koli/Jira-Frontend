import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const localToken = localStorage.getItem('token');
    this.loaderService.show(); 
    if(localToken){
      request = request.clone({
        headers: request.headers.set('Authorization','Bearer '+localToken)
      });
      return next.handle(request).pipe(
        finalize(() => this.loaderService.hide()) // Hide loader on request completion
      );
    }
    return next.handle(request).pipe(
      finalize(() => this.loaderService.hide()) // Hide loader on request completion
    );
    

  }
}
