import {Connection} from "./Connection";

export class Transaction
{
  // moment        !: Date;
  amount        !: number;
  description   !: string;
  connectionName!: string;

  constructor() {}

  static fromHttp(httpTransaction : Transaction) : Transaction
  {
    const transaction           = new Transaction();

    // transaction.moment          = httpTransaction.moment;
    transaction.amount          = httpTransaction.amount;
    transaction.description     = httpTransaction.description;
    transaction.connectionName  = httpTransaction.connectionName;

    return transaction;
  }
}
