export class TransactionDto
{
  id                  !: number;
  amount              !: number;
  payerAccountId      !: number;
  payerName           !: string;
  recipientAccountId  !: number;
  recipientName       !: string;
  description         !: string;
}
