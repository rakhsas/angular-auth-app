import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { ProfileComponent } from './profile/profile.component';
import { AuthguardService } from './services/authguard.service';

const routes: Routes = [
  { path: '', loadChildren: () => AuthModule},
  { path: 'profile', component: ProfileComponent , canActivate: [AuthguardService]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
