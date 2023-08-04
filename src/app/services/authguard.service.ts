import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { TokenExpirationService } from './token-expiration.service';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(
    public auth:AuthService,
    public router:Router,
    public tokenExpirationService:TokenExpirationService
    ) { }


  canActivate(): boolean {
    const Token = localStorage.getItem("Token");
    if ( Token && !this.auth.isAuthenticated())
    {
      return true;
    }
    else
    {
      this.tokenExpirationService.setExpiredToken(true);
      this.router.navigate(['/login']);
      return true;
    }
  }
}
