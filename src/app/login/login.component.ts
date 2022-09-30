import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router}       from "@angular/router";
import {Subscription}                 from "rxjs";

import {DataService}                  from "../data.service";
import {AuthService}                  from "../auth.service";


@Component
(
  {
    selector    : 'app-login',
    templateUrl : './login.component.html',
    styleUrls   : ['./login.component.css']
  }
)
export class LoginComponent implements OnInit, OnDestroy
{
  subscription  !: Subscription;
  password      !: string;
  email         !: string;


  constructor(
                private ActivatedRoute: ActivatedRoute,
                private authService   : AuthService,
                private dataService   : DataService,
                private router        : Router
             )
  { }

  ngOnInit(): void
  {
    this.loadConnections();

    this.subscription = this.authService.authentificationResultEvent.subscribe
    (
      result => {
                        if(result)
                        {
                          this.dataService.email = this.email;
                          this.loadClient();

                          let url = this.ActivatedRoute.snapshot.queryParams["requested"];

                          console.log("url = " + url);

                          if(url)
                          {
                            this.router.navigateByUrl(url);
                          }
                          else
                          {
                            url = "/home/account"
                            this.router.navigateByUrl(url);
                          }
                        }
                        else
                        {
                          alert("Your username or password was not recognized - try again.")
                          this.email    = "";
                          this.password = "";
                        }
                    }
    )
  }

  ngOnDestroy(): void
  {
    this.subscription.unsubscribe();
  }

  onSubmit()
  {
    this.authService.authenticate(this.email, this.password)
  }


  loadConnections()
  {
    this.dataService.getAllConnections().subscribe();
  }


  loadClient()
  {
    this.dataService.loadClient();
  }

  navigateToRegister()
  {
    this.router.navigateByUrl("register");
  }
}
