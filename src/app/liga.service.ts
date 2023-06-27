import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs';
import { Liga } from './interfaces/liga';

@Injectable({
  providedIn: 'root'
})
export class LigaService {

  baseUrl = 'http://localhost/api'

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/listLiga`).pipe(map((res: any) => {return res['data'];
      })
    );
  }

  store(liga: Liga) {
    return this.http.post(`${this.baseUrl}/storeLiga`, { data: liga}).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  update(liga: Liga) {
    return this.http.put(`${this.baseUrl}/updateLiga`, { data: liga});
  }
}
