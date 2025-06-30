import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  
  if(typeof localStorage !== "undefined"){
    if(localStorage.getItem('userToken') !== null){

      req = req.clone({
    
        setHeaders: { 'Authorization': `Bearer ${localStorage.getItem('userToken')}` }

      })

    }
   
  }
 
  return next(req);
};
