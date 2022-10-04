import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }                     from './app.component';
import { TestComponent }                    from './test/test.component';
import { MenuComponent }                    from './menu/menu.component';
import { LoginComponent }                   from './login/login.component';
import { AccountComponent }                 from './account/account.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { RegisterComponent }                from './register/register.component';
import { TransfertComponent }               from './transfert/transfert.component';
import { NgxPaginationModule }              from "ngx-pagination";
import { RouterModule, Routes }             from "@angular/router";
import { AuthRouteGuardService }            from "./auth-route-guard.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


const routes: Routes =  [
                            {path : "home/transfert", component : TransfertComponent, canActivate : [AuthRouteGuardService]},
                            {path : "home/account",   component : AccountComponent,   canActivate : [AuthRouteGuardService]},
                            {path : "login",          component : LoginComponent},
                            {path : "register",       component : RegisterComponent}
                        ];

@NgModule
(
  {
    declarations: [
                    AppComponent,
                    TestComponent,
                    MenuComponent,
                    LoginComponent,
                    AccountComponent,
                    TransfertComponent,
                    RegisterComponent,
                  ],

    imports:      [
                    FormsModule,
                    BrowserModule,
                    HttpClientModule,
                    ReactiveFormsModule,
                    RouterModule.forRoot(routes),
                    NgxPaginationModule
                  ],

    exports:      [RouterModule],


    providers:    [],

    bootstrap:    [
                    AppComponent
                  ]
  }
)
export class AppModule { }
