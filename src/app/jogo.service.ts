import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs';
import { Jogo } from './interfaces/jogo';

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  baseUrl = 'http://localhost/api'

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/listJogo`).pipe(map((res: any) => {return res['data'];
      })
    );
  }

  store(jogo: Jogo) {
    return this.http.post(`${this.baseUrl}/storeJogo`, { data: jogo}).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  update(jogo: Jogo) {
    return this.http.put(`${this.baseUrl}/updateJogo`, { data: jogo});
  }
}
