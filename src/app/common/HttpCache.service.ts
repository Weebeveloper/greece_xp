import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpCacheService {
  public store = new Map<string, HttpResponse<any>>();
}

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') {
    return next(req);
  }

  const cache = inject(HttpCacheService);
  const cacheKey = req.urlWithParams;
  const cachedResponse = cache.store.get(cacheKey);

  if (cachedResponse) {
    return of(cachedResponse.clone());
  }

  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        cache.store.set(cacheKey, event);
      }
    }),
  );
};

export function createAngularFetchBridge() {
  const http = inject(HttpClient);

  return async (url: RequestInfo | URL, options?: RequestInit): Promise<Response> => {
    const urlStr = url.toString();
    const method = options?.method || 'GET';

    // Convert fetch Headers map to Angular HttpHeaders
    let ngHeaders = new HttpHeaders();

    if (options?.headers) {
      // Standardize the headers format from Supabase (handles both object and Headers instances)
      const fetchHeaders = new Headers(options.headers);

      fetchHeaders.forEach((value, key) => {
        ngHeaders = ngHeaders.set(key, value);
      });
    }

    // Direct stream execution through Angular's HttpClient pipeline
    const response$ = http.request(method, urlStr, {
      headers: ngHeaders,
      body: options?.body,
      observe: 'response',
      responseType: 'blob', // Safely handles JSON, Text, or binary data
    });

    const ngRes = await firstValueFrom(response$);

    // Format Angular's response metadata back into standard fetch Response format
    return new Response(ngRes.body, {
      status: ngRes.status,
      statusText: ngRes.statusText,
      headers: new Headers(
        ngRes.headers.keys().reduce(
          (acc, key) => {
            acc[key] = ngRes.headers.get(key) || '';
            return acc;
          },
          {} as Record<string, string>,
        ),
      ),
    });
  };
}
