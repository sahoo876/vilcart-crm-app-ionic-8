import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppStorageService } from '../services/app-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(AppStorageService);

  return from(storageService.getSecure('authToken')).pipe(
    switchMap((token) => {
      if (token) {
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next(cloned);
      }

      return next(req);
    })
  );
};
