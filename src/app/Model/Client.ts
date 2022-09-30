import {Transaction} from "./Transaction";
import {Connection}  from "./Connection";

export class Client
{
  //==========================
  //=      Attributes        =
  //==========================
  id            !: number;
  name          !: string;
  email         !: string;
  balance       !: number;
  accountId     !: number;
  connections   !: Array<Connection>;
  transactions  !: Array<Transaction>;

  //==========================
  //=      Constructor       =
  //==========================
  constructor() {}


  //==========================
  //=    business methods    =
  //==========================


  // addClientTransaction(formValue: {amount:number, description:string, connection: Connection}) : void
  // {
  //   const transaction : Transaction = {
  //                                       ...formValue,
  //                                       moment        : new Date(),
  //                                       connectionName: formValue.connection.name
  //                                     };
  //
  //   this.transactions.unshift(transaction);
  // }


  getClientConnections() : Array<Connection>
  {
    this.connections.sort
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
    return this.connections;
  }


  static fromHttp(httpCllient : Client) : Client
  {
    const client      = new Client();

    client.id           = httpCllient.id;
    client.name         = httpCllient.name;
    client.email        = httpCllient.email;
    client.balance      = httpCllient.balance;
    client.accountId    = httpCllient.accountId;
    client.connections  = new Array<Connection>();
    client.transactions = new Array<Transaction>();

    for(const httpConnection of httpCllient.connections)
    {
      client.connections.push(Connection.fromHttp(httpConnection));
    }

    for(const httpTransaction of httpCllient.transactions)
    {
      client.transactions.push(Transaction.fromHttp(httpTransaction));
    }

    return client;
  }





  // filterNotYetConnected(allConnections : Array<Connection>) : Array<Connection>
  // {
  //   return allConnections.filter(item => !this.connections.includes(item));
  // }
}
