import {Connection} from "./Connection";

export class Transaction
{
  moment        !: Date;
  amount        !: number;
  description   !: string;
  connectionName!: string;

  constructor() {}
}
