import { Routes } from '@angular/router';
import { authguardGuard } from './shared/guards/authguard.guard';


export const routes: Routes = [
    {path :'' , redirectTo : 'home' , pathMatch :'full'},
    {path :'login' , loadComponent : () => import ('./components/pages/login/login.component').then((c) => c.LoginComponent)},
    {path :'register' , loadComponent : () => import ('./components/pages/register/register.component').then((c) => c.RegisterComponent)},
    {path :'home' , loadComponent : () => import ('./components/pages/home/home.component').then((c) => c.HomeComponent)},
    {path :'successStories' , loadComponent : () => import ('./components/pages/success-stories/success-stories.component').then((c) => c.SuccessStoriesComponent)},
    {path :'subscribe' , loadComponent : () => import ('./components/pages/subscribe/subscribe.component').then((c) => c.SubscribeComponent) , canActivate:[authguardGuard] },
    {path :'contactUs' ,  loadComponent : () => import ('./components/pages/contact-us/contact-us.component').then((c) => c.ContactUsComponent)},
    {path :'players' , loadComponent : () => import ('./components/pages/players/players.component').then((c) => c.PlayersComponent)},
    {path :'playerDetails/:id' , loadComponent : () => import ('./components/additions/player-details/player-details.component').then((c) => c.PlayerDetailsComponent) , canActivate:[authguardGuard]},
    {path :'clubDetails/:id' , loadComponent : () => import ('./components/additions/club-details/club-details.component').then((c) => c.ClubDetailsComponent) , canActivate:[authguardGuard]},
    {path :'clubs' , loadComponent : () => import ('./components/pages/clubs/clubs.component').then((c) => c.ClubsComponent)},
    {path :'confirmEmail' , loadComponent : () => import ('./components/additions/confirm-email/confirm-email.component').then((c) => c.ConfirmEmailComponent) },
    {path :'forgetPassword' , loadComponent : () => import ('./components/additions/forget-password/forget-password.component').then((c) => c.ForgetPasswordComponent)},
    {path :'profile' , loadComponent : () => import ('./components/additions/profile/profile.component').then((c) => c.ProfileComponent) , canActivate:[authguardGuard]},
    {path :'settings' , loadComponent : () => import ('./components/additions/settings/settings.component').then((c) => c.SettingsComponent) , canActivate:[authguardGuard]},
    {path :'clubForm' , loadComponent : () => import ('./components/additions/club-form/club-form.component').then((c) => c.ClubFormComponent) , canActivate:[authguardGuard]},
    {path :'**' , loadComponent : () => import ('./components/additions/not-found/not-found.component').then((c) => c.NotFoundComponent)},
];
