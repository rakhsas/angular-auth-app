import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import type { DismissOptions, DismissInterface } from "flowbite";
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Dismiss } from "flowbite";
import { Subscription } from 'rxjs';
import { TokenExpirationService } from 'src/app/services/token-expiration.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	form: User = {
		id: "",
		username: "",
		password: ""
	}
	expiredToken = false;
	private subscription: Subscription;
	loginValid:number = 0;
	constructor(
		private userSerive: UserService,
		private router:Router,
	) {}
	onSubmit(): void {
		this.userSerive.login(this.form).subscribe(
			successResponse=>{
				localStorage.setItem("Token", successResponse.Token);
				this.loginValid=1;
				setTimeout(() => {
					this.loginValid = 0
					this.router.navigate(["/profile"]);
				}, 4000);
			},
			(errorResponse: HttpErrorResponse) => {
				this.loginValid = -1;
				setTimeout(() => {
					this.loginValid = 0
				}, 4000);
			}
		)
	}

}
