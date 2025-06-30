import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  let _ToastrService:ToastrService = inject(ToastrService)

  return next(req).pipe(catchError( (err)=>{
    if (err?.error?.message){
      _ToastrService.error(err.error.message)
    }
    
    return throwError(()=> err)
  }))
};
