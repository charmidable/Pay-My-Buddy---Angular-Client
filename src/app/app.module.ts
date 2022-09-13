import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }                   from './app.component';
import { MenuComponent }                  from './menu/menu.component';
import { TransfertComponent }             from './transfert/transfert.component';
import { LoginComponent }                 from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AccountComponent }               from './account/account.component';
import {RouterModule, Routes}             from "@angular/router";


const routes: Routes =  [
                            {path : "home/transfert", component : TransfertComponent},
                            {path : "home/account",   component : AccountComponent}
                        ];

@NgModule
(
  {
    declarations: [
                    AppComponent,
                    MenuComponent,
                    LoginComponent,
                    AccountComponent,
                    TransfertComponent
                  ],

    imports:      [
                    FormsModule,
                    BrowserModule,
                    ReactiveFormsModule,
                    RouterModule.forRoot(routes)
                  ],

    providers:    [],

    bootstrap:    [
                    AppComponent
                  ]
  }
)
export class AppModule { }
