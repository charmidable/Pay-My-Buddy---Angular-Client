export class Connection
{
  name      !: string;
  email     !: string;
  clientId  !: number;
  accountId !: number;

  constructor() {}

  static fromHttp(httpConnection : Connection) : Connection
  {
    const connection      = new Connection();

    connection.name       = httpConnection.name;
    connection.email      = httpConnection.email;
    connection.clientId   = httpConnection.clientId;
    connection.accountId  = httpConnection.accountId;

    return connection;
  }
}
