import {Transaction} from "./Transaction";

export class Account
{
  //==========================
  //=      Attributes        =
  //==========================
  balance       !: number;
  transactions  !: Array<Transaction>;

  //==========================
  //=      Constructor       =
  //==========================
  constructor() {}


  //==========================
  //=    business methods    =
  //==========================


  static fromHttp(httpAccount : Account) : Account
  {
    const account      = new Account();
    account.balance      = httpAccount.balance;
    account.transactions = new Array<Transaction>();

    for(const httpTransaction of httpAccount.transactions)
    {
      account.transactions.push(Transaction.fromHttp(httpTransaction));
    }

    return account;
  }
}
