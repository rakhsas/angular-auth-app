import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL: string
  constructor( private http: HttpClient ) {
    this.URL = environment.apiURL;
  }
  ngOnInit (){

  }
  login(form:User):Observable<any>{
    return this.http.post(this.URL + 'api/auth/login', form);
  }
  register(form:register):Observable<any> {
    return this.http.post(this.URL + 'api/auth/register', form );
  }
}
