import { Component } from '@angular/core';
import { NavigationEnd, Router, NavigationStart } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  showBtn: boolean = true;
  Logged: boolean = false;
  constructor( private router: Router, private authService: AuthService ) {}
  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart || event instanceof NavigationEnd),
        map((event) => {
          if (event instanceof NavigationStart) {
            return event.url;
          } else if (event instanceof NavigationEnd) {
            return event.urlAfterRedirects;
          }
          return '';
        })
      )
      .subscribe((url: string | undefined) => {
        this.showBtn = url !== '/login' && url !== '/register';
      });
      this.Logged = !this.authService.isAuthenticated();
    }
}
