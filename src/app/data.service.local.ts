import { Injectable }   from '@angular/core';
import {Connection}  from "./Model/Connection";
import {Transaction} from "./Model/Transaction";
import {Client}      from "./Model/Client";
import {environment} from "../environments/environment";

@Injectable
(
  {
    providedIn: 'root'
  }
)
export class DataService
{
  connections  = new Array<Connection>();
  client       !: Client;

  constructor()
  {
    console.log(environment.restUrl);

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

    const c6  = new Connection();
    c6.name       = "George";
    c6.email       = "George@gmeil.com";
    c6.accountId  = 6;
    c6.clientId  = 6;

    const c7  = new Connection();
    c7.name       = "Harry";
    c7.email       = "Harry@gmeil.com";
    c7.accountId  = 7;
    c7.clientId  = 7;

    const c8  = new Connection();
    c8.name       = "Mark";
    c8.email       = "Mark@gmeil.com";
    c8.accountId  = 8;
    c8.clientId  = 8;

    const c9  = new Connection();
    c9.name       = "William";
    c9.email       = "William@gmeil.com";
    c9.accountId  = 9;
    c9.clientId  = 9;

    const c10 = new Connection();
    c10.name       = "Claris";
    c10.email       = "Claris@gmeil.com";
    c10.accountId  = 10;
    c10.clientId  = 10;

    const t3 = new Transaction();
    t3.amount = 25;
    t3.description = "Restaurant bill share"
    t3.moment = new Date();
    t3.connectionName = "Haley";

    const t2 = new Transaction();
    t2.amount = 25;
    t2.description = "Trip Money"
    t2.moment = new Date();
    t2.connectionName = "Clara";

    const t1 = new Transaction();
    t1.amount = 8;
    t1.description = "Movie tickets"
    t1.moment = new Date();
    t1.connectionName = "Smith";

    const t5 = new Transaction();
    t5.amount = -39;
    t5.description = "Motorway tolls"
    t5.moment = new Date();
    t5.connectionName = "Claris";


    this.connections.push(c1, c2, c3, c4, c5, c6, c7, c8, c9, c10);
    const clientConnections = [c1, c2, c3, c4, c5];
    const clientTransaction = [t3, t2, t1, t5];

    this.client = new Client();
    this.client.id = 1;
    this.client.accountId = 1;
    this.client.name = "Paul";
    this.client.balance = 500;
    this.client.accountId = 99;
    this.client.transactions = clientTransaction;
    this.client.connections = clientConnections;
  }


  filterNotYetConnected() : Array<Connection>
  {
    return this.connections.filter(item => !this.client.connections.includes(item));
  }


  addClientTransaction(formValue: {amount:number, description:string, connection: Connection}) : void
  {
    const transaction : Transaction = {
                                        ...formValue,
                                        moment        : new Date(),
                                        connectionName: formValue.connection.name
                                      };

    if(transaction.amount > 0)
    {
      this.client.balance = this.client.balance - transaction.amount * 1.005;

      this.client.transactions.unshift(transaction);
    }
  }


  balanceOperation(amount : number, description : string)
  {
    const transaction : Transaction = new Transaction();

    transaction.connectionName ="";
    transaction.description = description;

    console.log("balance before " + description + " : " + this.client.balance);

    if (description === "Withdrawal")
    {
      this.client.balance = this.client.balance + amount// * (- 1.005);
      transaction.amount = amount * -1;
    }
    else
    {
      this.client.balance = this.client.balance + amount// * (0.995);
      transaction.amount = amount;
    }

    console.log("balance after " + description + " : " + this.client.balance);
    this.client.transactions.unshift(transaction);
  }


  addClientConnection(newConnection : Connection) : void
  {
    this.client.connections.push(newConnection);
  }
}
