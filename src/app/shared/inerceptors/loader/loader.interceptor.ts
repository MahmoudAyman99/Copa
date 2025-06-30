import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay, finalize, of } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  let spinner : NgxSpinnerService = inject (NgxSpinnerService)
  spinner.show();
   return next(req).pipe(finalize(()=>{
     of(null)
        .pipe(delay(1000))
        .subscribe(() => spinner.hide());
   }))
    
  
};
