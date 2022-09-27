import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {Connection}  from "./Model/Connection";
import {Transaction} from "./Model/Transaction";
import {Client}      from "./Model/Client";
import {environment} from "../environments/environment";
import {map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Account} from "./Model/Account";
import {ConnectionOperation} from "./Model/ConnectionOperation";

@Injectable
(
  {
    providedIn: 'root'
  }
)
export class DataService implements OnInit
{
  addConnectionResultEvent = new EventEmitter<any>();
  connections = new Array<Connection>();
  client        !: Client;
  email         !: string;

  constructor(private http: HttpClient)
  {
    /*
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
    */
  }

  ngOnInit(): void
  {

  }


  validateUser(email: string, password: string) : Observable<string>
  {
    const authData = btoa(`${email}:${password}`);

    const header = new HttpHeaders().append("Authorization", "Basic " + authData );

    return this.http.get<string>(environment.restUrl + "/api/basicAuth/validate", {headers: header});
  }

  loadClient()
  {
    this.getClient().subscribe
    (next  => {
                      this.client = next;
                      // this.loadingClient = false;
                      // this.client.connections = this.client.connections.map(obj => this.connections.find(o => o.clientId === obj.clientId) || obj);
                   }
    );
  }

  getClient() : Observable<Client>
  {
    console.log("****** getClient CALLED *****");

   return this.http.get<Client>(environment.restUrl + "/api/clients/" + this.email).pipe
    (
      map( data => {
                            let client : Client;

                            client = Client.fromHttp(data);

                            this.client = client;
                            this.client.connections = this.client.connections.map(obj => this.connections.find(o => o.clientId === obj.clientId) || obj);
                            return client;
                          }
         )
    )
  }


  getAllConnections() : Observable<Array<Connection>>
  {
    console.log("****** getAllConnections CALLED *****");

    return this.http.get<Array<Connection>>(environment.restUrl + "/api/connections").pipe
    (
      map(data => {
                            const connections = new Array<Connection>();

                            for (const connection of data)
                            {
                              connections.push(Connection.fromHttp(connection));
                            }

                            this.connections = connections;

                            return connections;
                         }
        )
    );
  }


  addTransaction(dtoTransaction : object) : Observable<Transaction[]>
  {
    return this.http.post<Account>(environment.restUrl + "/api/transactions", dtoTransaction).pipe
    (
      map(
        data => {
                        const transactions = new Array<Transaction>();

                        for(const httpTransaction of data.transactions)
                        {
                          transactions.push(Transaction.fromHttp(httpTransaction));
                        }
                        this.client.balance = data.balance;
                        this.client.transactions = transactions;

                        return transactions;
                      }
        )
    )
  }


  addClientConnection(connectionOperation : ConnectionOperation) : Observable<string>
  {
    console.log("dataService.addClientConnection CALLED");
    let connectionDto = {
                          clientId : this.client.id,
                          connectId : connectionOperation.connection.clientId
                        }


    let result  = this.http.post<string>(environment.restUrl + "/api/connections", connectionDto);

    this.addConnectionResultEvent.emit();

    return result;
  }


  filterNotYetConnected() : Array<Connection>
  {
    let tab = this.connections.filter(item => !this.client.connections.includes(item));
    this.sortConnectionArrayByEmail(tab);
    return tab;
  }


  sortConnectionArrayByEmail(tab: Array<Connection>)
  {
    tab.sort
    (
      function(x,y)
      {
        if (x.email.toLowerCase() > y.email.toLowerCase()) {
          return 1;
        }
        if (x.email.toLowerCase() < y.email.toLowerCase())
        {
          return  - 1
        }
        return 0;
      }
    );
  }

  sortConnectionArrayByName(tab: Array<Connection>)
  {
    tab.sort
    (
      function(x,y)
      {
        if (x.name.toLowerCase() > y.name.toLowerCase()) {
          return 1;
        }
        if (x.name.toLowerCase() < y.name.toLowerCase())
        {
          return  - 1
        }
        return 0;
      }
    );
  }

  getClientConnectionsSortedByName() : Array<Connection>
  {
    const cloned  = [...this.client.connections];
    this.sortConnectionArrayByName(cloned);
    return cloned;
  }
}
