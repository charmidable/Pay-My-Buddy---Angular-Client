import { Injectable } from '@angular/core';
import {CanActivate} from "@angular/router";

@Injectable
(
  {
    providedIn: 'root'
  }
)
export class AuthService
{
  //==========================
  //=      Attributes        =
  //==========================

  isAuthenticated: boolean = false;


  //==========================
  //=      Constructor       =
  //==========================

  constructor()
  {

  }


  //==========================
  //=    business methods    =
  //==========================

  authenticate(email: string, password: string): boolean
  {
    if (email === "gg@gg.fr" && password === "root")
    {
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }




}
