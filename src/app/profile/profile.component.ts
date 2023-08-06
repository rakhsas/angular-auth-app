import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenExpirationService } from '../services/token-expiration.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
	Logged: boolean = false;
	expiredToken: boolean = false;
	constructor (
		private router:Router,
		private tokenExpirationService: TokenExpirationService,
		private authService: AuthService
		)
	{}
	ngOnInit() {
		this.Logged = !this.authService.isAuthenticated();
	}
	ngOnDestroy() {
	}
}
