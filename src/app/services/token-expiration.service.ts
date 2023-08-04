import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenExpirationService {
  private expirationTokenSubject = new BehaviorSubject<boolean>(false);
  expiredToken = this.expirationTokenSubject.asObservable();

  constructor() { }
  setExpiredToken( expired: boolean )
  {
    this.expirationTokenSubject.next(expired);
  }
}
