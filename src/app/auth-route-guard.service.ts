import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService}          from "./auth.service";
import {Injectable}           from '@angular/core';


@Injectable
(
  {
    providedIn: 'root'
  }
)
export class AuthRouteGuardService implements CanActivate
{
  //==========================
  //=      Attributes        =
  //==========================


  //==========================
  //=      Constructor       =
  //==========================

  constructor(
                private authService : AuthService,
                private router      : Router
             )
  {}

  //==========================
  //=    business methods    =
  //==========================


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
  {
    if(!this.authService.isAuthenticated)
    {
      this.router.navigate(["login"], {queryParams: {requested: state.url} } )
    }
    return this.authService.isAuthenticated;
  }
}
