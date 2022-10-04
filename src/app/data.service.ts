import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {Connection}  from "./Model/Connection";
import {Transaction} from "./Model/Transaction";
import {Client}      from "./Model/Client";
import {environment} from "../environments/environment";
import {map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Account} from "./Model/Account";
import {ConnectionOperation} from "./Model/ConnectionOperation";
import {ClientData} from "./Model/ClientData";

@Injectable
(
  {
    providedIn: 'root'
  }
)
export class DataService implements OnInit
{
  addConnectionResultEvent  = new EventEmitter<any>();
  connections               !: Array<Connection>;
  client                    !: Client;
  email                     !: string;

  constructor(private http: HttpClient)
  {

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

  createNewClient(clientData: ClientData) : Observable<string>
  {
    return this.http.post<string>(environment.restUrl + "/api/clients/new", clientData);
  }

  loadClient()
  {
    this.getClient().subscribe
    (next  => {
                      this.client = next;
                   }
    );
  }

  getClient() : Observable<Client>
  {
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
    return this.http.get<Array<Connection>>(environment.restUrl + "/api/connections/all").pipe
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

  isEmailAccountAlreadyExist(email: string): boolean
  {
    for(const connection of this.connections)
    {
      if(connection.email.toLowerCase() === email)
      {
        return  true;
      }
    }
    return false;
  }

  isNickNameAccountAlreadyExist(name: string): boolean
  {
    for(const connection of this.connections)
    {
      if(connection.name.toLowerCase() === name)
      {
        return  true;
      }
    }
    return false;
  }

}
