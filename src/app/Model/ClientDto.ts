import {TransactionDto} from "./TransactionDto";
import {ConnectionDto} from "./ConnectionDto";

export class ClientDto
{
  name          !: String;
  accountId     !: number;
  transactions  !: Array<TransactionDto>;
  connections   !: Array<ConnectionDto>;
}
