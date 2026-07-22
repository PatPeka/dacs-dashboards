import { HttpInterceptorFn } from '@angular/common/http';
export const bearerInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('dacs_access_token');
  return next(token ? req.clone({setHeaders:{Authorization:`Bearer ${token}`}}) : req);
};
