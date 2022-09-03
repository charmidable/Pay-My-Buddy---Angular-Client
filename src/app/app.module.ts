import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionTableComponent } from './transaction-table/transaction-table.component';
import { LoginComponent } from './login/login.component';

@NgModule
(
  {
    declarations: [AppComponent, MenuComponent, TransactionComponent, TransactionTableComponent, LoginComponent],
    imports: [BrowserModule],
    providers: [],
    bootstrap: [AppComponent]
  }
)
export class AppModule { }
