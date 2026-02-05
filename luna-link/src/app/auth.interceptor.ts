import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const userData = localStorage.getItem('luna-user-data');
  
  let token = '';
  
  if (userData) {
    try {
      const parsedData = JSON.parse(userData);
      token = parsedData.token; 
    } catch (e) {
      console.error('Erro ao ler token', e);
    }
  }

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });
    return next(authReq);
  }

  return next(req);
};