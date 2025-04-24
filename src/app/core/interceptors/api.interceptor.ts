import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpHandler
} from '@angular/common/http';

import { environment } from '../../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Skip if URL is already absolute
  if (req.url.startsWith('http')) {
    return next(req);
  }

  // Construct the full URL
  const fullUrl = `${environment.apiBaseUrl}/${req.url}`
    .replace(/([^:]\/)\/+/g, '$1'); // Remove duplicate slashes

  const apiReq = req.clone({ url: fullUrl });
  return next(apiReq);
};