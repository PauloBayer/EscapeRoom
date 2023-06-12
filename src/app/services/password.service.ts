import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private password: string = '';
  private passwordSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private passwordObservable: Observable<string> =
    this.passwordSubject.asObservable();

  setPassword(password: string): void {
    this.passwordSubject.next(password);
  }

  getPasswordObservable(): Observable<string> {
    return this.passwordObservable;
  }
}
