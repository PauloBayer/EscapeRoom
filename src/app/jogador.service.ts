import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs';
import { Jogador } from './interfaces/jogador';

@Injectable({
  providedIn: 'root'
})
export class JogadorService {

  baseUrl = 'http://localhost/api'

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/listJogador`).pipe(
        map((res: any) => {
          console.log('Response', res)
          return res['data'];
      })
    );
  }

  store(jogador: Jogador) {
    return this.http.post(`${this.baseUrl}/storeJogador`, { data: jogador}).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  update(jogador: Jogador) {
    return this.http.put(`${this.baseUrl}/updateJogador`, { data: jogador});
  }

}
