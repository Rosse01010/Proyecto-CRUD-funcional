import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMsg = 'Ocurrió un error desconocido.';
            if (error.error instanceof ErrorEvent) {
                // Client-side or network error
                errorMsg = `Error: ${error.error.message}`;
            } else {
                // Backend returns an unsuccessful response code.
                // Support our new global payload from the API or string messages.
                if (error.error && error.error.message) {
                    errorMsg = error.error.message;
                } else {
                    errorMsg = `Error code: ${error.status}, Message: ${error.message}`;
                }
            }

            console.error('Intercepted API Error:', errorMsg);
            // In a real app we'd dispatch to a Toast Service or UI state here.

            return throwError(() => new Error(errorMsg));
        })
    );
};
