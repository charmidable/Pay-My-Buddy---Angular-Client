import {Transaction} from "./Transaction";
import {Connection}  from "./Connection";

export class Client
{
  //==========================
  //=      Attributes        =
  //==========================
  id            !: number;
  name          !: string;
  balance       !: number;
  accountId     !: number;
  transactions  !: Array<Transaction>;
  connections   !: Array<Connection>;


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


  // filterNotYetConnected(allConnections : Array<Connection>) : Array<Connection>
  // {
  //   return allConnections.filter(item => !this.connections.includes(item));
  // }
}
