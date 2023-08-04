import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenExpirationService } from '../services/token-expiration.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
	// subscription :Subscription;
	expiredToken: boolean = false;
	// constructor (
	// 	private router:Router,
	// 	private tokenExpirationService: TokenExpirationService)
	// {}
	ngOnInit() {
		// this.subscription = this.tokenExpirationService.expiredToken.subscribe( expired => {
		// 	this.expiredToken = expired;
		// })
		// if ( this.expiredToken )
		// {
		// 	setTimeout(() => {
		// 		this.router.navigate(['/login']);
		// 	}, 4000);
		// }
	}
	ngOnDestroy() {
		// this.subscription.unsubscribe();
	}
}
