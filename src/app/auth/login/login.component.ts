import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import type { DismissOptions, DismissInterface } from "flowbite";
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Dismiss } from "flowbite";
import { Subscription } from 'rxjs';
import { TokenExpirationService } from 'src/app/services/token-expiration.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { localService } from 'src/app/services/localService';

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
	loginForm: FormGroup;
	loginValid:number = 0;
	loginStatus:String;
	isValid: boolean = true;
	constructor(
		private userSerive: UserService,
		private router:Router,
		private fb: FormBuilder,
		private local: localService
	) {}
	onSubmit(): void {
		if (!this.loginForm.valid) {
			this.isValid = false;
			setTimeout(() => {
				this.isValid = true;
			}, 3000);
			return;
		} else {
			this.form.username = this.loginForm.get('username')?.value;
			this.form.password = this.loginForm.get('password')?.value;
			this.userSerive.login(this.form).subscribe(
				successResponse=>{
					// localStorage.setItem("Token", successResponse.Token);
					this.local.saveData("Token", successResponse.Token);
					this.loginStatus = "Connected Successfully";
					this.loginValid = 1;
					setTimeout(() => {
						this.loginValid = 0
						this.router.navigate(["/profile"]);
					}, 3000);
				},
				(errorResponse: HttpErrorResponse) => {
					console.log('sdfd')
					this.loginStatus = "Invalid Credentials";
					this.loginValid = -1;
					setTimeout(() => {
						this.loginValid = 0
					}, 3000);
				}
			)
		}
	}

	ngOnInit():  void{
		this.initLoginForm();
	}

	private initLoginForm(): void {
		this.loginForm = this.fb.group({
		  username: ['', Validators.required],
		  password: ['', [Validators.required, Validators.minLength(8), this.passwordPatternValidator()]],
		});
	  }
	private passwordPatternValidator(): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } | null => {
		  	const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
		  	return pattern.test(control.value) ? null : { invalidPassword: true };
		};
	}

	getError() {
		if ( this. loginForm.get('username')?.hasError('required'))
			return ("Username is required");
		if ( this.loginForm.get('password')?.hasError('required'))
			return ("Password is required")
		else if (this.loginForm.get('password')?.hasError('minlength'))
			return ("Password must be at least 8 characters long")
		else if (this.loginForm.get('password')?.hasError('invalidPassword'))
			return ("Invalid password format");
		this.isValid = true;
		return ""
	}

}
