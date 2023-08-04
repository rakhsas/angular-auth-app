import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

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
  }
  form: User = {
    id : "",
    username: "",
    password: ""
  }
  registerValid:number = 0;
  constructor( private userService: UserService, private router:Router) {}
  onSubmit(): void {
    this.form.username = this.registerForm.username;
    this.form.password = this.registerForm.password;
    this.userService.register(this.form).subscribe(
        successResponse=>{
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
