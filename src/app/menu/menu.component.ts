import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {DataService}              from "../data.service";
import {AuthService}              from "../auth.service";


@Component
(
  {
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
  }
)
export class MenuComponent implements OnInit
{
  navigation  !: string

  constructor(
              private router      : Router,
              public  dataService : DataService,
              public  authService : AuthService
             ) { }

  ngOnInit(): void
  {
  }

  navigateToTransfert()
  {
    this.router.navigateByUrl("home/transfert");
    this.navigation = "Transfert";
  }

  navigateToAccount()
  {
    this.router.navigateByUrl("home/account");
    this.navigation = "Account";
  }

  logOff()
  {
    this.authService.isAuthenticated = false;
    this.router.navigateByUrl("login");
    this.navigation = "Login";
  }
}
