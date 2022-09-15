import { Injectable } from '@angular/core';
import {CanActivate} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthRouteGuardService implements CanActivate
{
  //==========================
  //=      Attributes        =
  //==========================


  //==========================
  //=      Constructor       =
  //==========================

  constructor(private authService: AuthService)
  {

  }

  //==========================
  //=    business methods    =
  //==========================



  canActivate(): boolean
  {
    return this.authService.isAuthenticated;
  }

}
