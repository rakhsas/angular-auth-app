import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'src/app/models/register';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

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
  form : register = {
	username: "",
	password: ""
  };
  isValid: boolean = true;
  registerValid:number = 0;
  constructor( private userService: UserService, private router:Router, private fb: FormBuilder) {}
 	loginForm = this.fb.group({
	username: ['', [
	  Validators.required,
	]],
	password  : ['', [
	  Validators.required,
	  Validators.minLength(8),
	  Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}')
	]],
	confirmPassword: ['', [
	  Validators.required,
	  Validators.minLength(8),
	  Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}')
	]],
  })
  ngOnInit(): void {
  }
  onSubmit(): void {
	if (this.loginForm.valid && this.loginForm.controls.password === this.loginForm.controls.confirmPassword)
	{
	  this.isValid = false;
	  setTimeout(() => {
		this.isValid = true;
	  }, 3000);
	  return ;
	}
	this.form.username = this.registerForm.username;
	this.form.password = this.registerForm.password;
	this.userService.register(this.form).subscribe(
		successResponse=>{
		  console.log(successResponse)
			if (successResponse.Token)
			{
			  this.registerValid = 1;
			  setTimeout(() => {
				  this.router.navigate(["/profile"]);
			  }, 4000);
			}
		},
		(errorResponse) => {
			this.registerValid = -1;
			console.log(errorResponse);
		}
	)
  }
}
