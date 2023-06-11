import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PasswordService {
  private password: string = '';

  setPassword(password: string) {
    this.password = password;
  }

  getPassword(): string {
    return this.password;
  }
}