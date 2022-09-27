import { Component, OnInit } from '@angular/core';
import {Connection} from "../Model/Connection";
import {Observable} from "rxjs";
import {HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit
{
  clientConnections !: Array<Connection>
  connections       !: Array<Connection>

  constructor()
  {
    const c1      = new Connection();
    c1.name       = "Haley";
    c1.email      = "Haley@gmeil.com";
    c1.accountId  = 1;
    c1.clientId  = 1;

    const c2  = new Connection();
    c2.name      = "Clara";
    c2.email     = "Clara@gmeil.com";
    c2.accountId = 2;
    c2.clientId  = 2;

    const c3  = new Connection();
    c3.name       = "Smith";
    c3.email       = "Smith@gmeil.com";
    c3.accountId  = 3;
    c3.clientId  = 3;

    const c4  = new Connection();
    c4.name       = "Desmond";
    c4.email       = "Desmond@gmeil.com";
    c4.accountId  = 4;
    c4.clientId  = 4;

    const c5  = new Connection();
    c5.name       = "Molly";
    c5.email       = "Molly@gmeil.com";
    c5.accountId  = 5;
    c5.clientId  = 5;



    const cc3  = new Connection();
    cc3.name       = "SmithClient";
    cc3.email       = "Smith@gmeil.com";
    cc3.accountId  = 3;
    cc3.clientId  = 3;

    const cc4  = new Connection();
    cc4.name       = "DesmondClient";
    cc4.email       = "Desmond@gmeil.com";
    cc4.accountId  = 4;
    cc4.clientId  = 4;

    this.clientConnections = [cc3, cc4];

    this.connections =  [c1, c2, c3, c4, c5];

    // const difference = filterNotYetConnected();
  }

  ngOnInit(): void
  {
    console.log("** connections: **")
    this.showConnectionTab(this.connections);
    console.log("********************")

    console.log("** clientConnections: **")
    this.showConnectionTab(this.clientConnections);

    console.log("** NotYetConnected: **")
    this.showConnectionTab(this.replace(this.connections, this.clientConnections));
  }

  showConnectionTab(tab: Array<Connection>) : void
  {
    for (const connection of tab)
    {
      console.log(connection.name);
    }
  }

  // filterNotYetConnected() : Array<Connection>
  // {
  //   // return this.connections.filter(item => !this.clientConnections.includes(item));
  //
  //   return this.connections.filter(item => !this.clientConnections.includes(item));
  // }


  replace(connections: Array<Connection>, clientConnections: Array<Connection>) : Array<Connection>
  {
    return  clientConnections.map(obj => connections.find(o => o.clientId === obj.clientId) || obj);
  }

}
