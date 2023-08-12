import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'src/app/models/register';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent {
	registerForm = {
		username: "",
		password: "",
		confirmPassword: ""
	};
	form: register = {
		username: "",
		password: ""
	};
	isValid: boolean = true;
	registerValid: number = 0;
	registerStatus:String;
	loginForm: FormGroup;
	Error: string = "";
	constructor(private userService: UserService, private router: Router, private fb: FormBuilder) { }
	onSubmit(): void {
		console.log(this.loginForm.get('username')?.value);
		console.log(this.loginForm.get('password')?.value);
		console.log(this.loginForm.get('confirmPassword')?.value);
		if (!this.loginForm.valid) {
			// this.getError();
			this.isValid = false;
			setTimeout(() => {
				this.isValid = true;
			}, 3000);
			return;
		} else {
			this.form.username = this.loginForm.get('username')?.value;
			this.form.password = this.loginForm.get('password')?.value;
			this.userService.register(this.form).subscribe(
				successResponse => {
					console.log(successResponse)
					if (successResponse.Token) {
						this.registerStatus = "Account Created Successfully";
						this.registerValid = 1;
						setTimeout(() => {
							this.router.navigate(["/profile"]);
						}, 3000);
					}
				},
				(errorResponse) => {
					this.registerStatus = "Something went wrong!!";
					this.registerValid = -1;
					console.log(errorResponse);
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
		  confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
		}, { validators: this.confirmPasswordValidator });
	  }

	  // Custom validator for password pattern
	  private passwordPatternValidator(): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } | null => {
		  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
		  return pattern.test(control.value) ? null : { invalidPassword: true };
		};
	  }

	  // Custom validator for matching passwords
	  private confirmPasswordValidator(control: AbstractControl): { [key: string]: any } | null {
		const password = control.get('password');
		const confirmPassword = control.get('confirmPassword');

		if (!password || !confirmPassword) {
		  return null;
		}

		return password.value === confirmPassword.value ? null : { mustMatch: true };
	}
	getError() {
		if ( this.loginForm.get('password')?.hasError('required'))
			return ("Password is required")
		else if (this.loginForm.get('password')?.hasError('minlength'))
			return ("Password must be at least 8 characters long")
		else if (this.loginForm.get('password')?.hasError('invalidPassword'))
			return ("Invalid password format");
		else if (this.loginForm.get('confirmPassword')?.hasError('required'))
			return ("Confirm Password is required")
		else if (this.loginForm.hasError('mustMatch', ['confirmPassword']))
			return ("Passwords do not match")
		this.isValid = true;
		return ""
	}
}
