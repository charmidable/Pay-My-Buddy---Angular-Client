import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Component, EventEmitter, OnInit}    from '@angular/core';
import {ConnectionOperation}                from "../Model/ConnectionOperation";
import {BalanceOperation}                   from "../Model/BalanceOperation";
import {DataService}                        from "../data.service";
import {Transaction}                        from "../Model/Transaction";
import {Connection}                         from "../Model/Connection";


@Component
(
  {
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
  }
)
export class AccountComponent implements OnInit
{
  //==========================
  //=      Attributes        =
  //==========================


  balanceOperationForm     !: FormGroup;
  connectionOperationForm  !: FormGroup;

  dataChangedEvent          = new EventEmitter();
  newConnectionEvent        = new EventEmitter();

  //==========================
  //=      Constructor       =
  //==========================

  constructor
  (
    private dataService : DataService,
    private formBuilder : FormBuilder
  )
  {}

  ngOnInit(): void
  {

    this.balanceOperationForm     = this.formBuilder.group
    (
      {
                amount     : [null, Validators.required],
                description: [null, Validators.required]
              },

      {
                updateOn : "change"
             }
    );

    this.connectionOperationForm  = this.formBuilder.group
    (
      {
                connection : [null, Validators.required],
                description: [null, Validators.required]
              },

      {
                updateOn : "change"
             }
    );
  }

  //==========================
  //=    business methods    =
  //==========================

  initNotYetConnected() : Array<Connection> | null
  {
    if(this.dataService.client)
    return  this.dataService.filterNotYetConnected();
    return null;
  }


  onSubmitBalanceForm()
  {
    this.addBalanceOperation(this.balanceOperationForm.value);
    this.balanceOperationForm.reset();
  }


  addBalanceOperation(formValue: {amount:number, description:string})
  {
      const operation: BalanceOperation =  { ...formValue };

      if (formValue.description === "Withdrawal")
      {
        if(this.dataService.client.balance < formValue.amount)
        {
          alert("You cannot withdrawal more than your balance account");
          return;
        }
        this.dataService.client.balance = this.dataService.client.balance - formValue.amount;
      }
      else
      {
        this.dataService.client.balance = this.dataService.client.balance + formValue.amount;
      }

      let transaction             = new Transaction();
      transaction.amount          = formValue.amount;
      transaction.description     = formValue.description;
      transaction.connectionName  = "";

      this.dataService.client.transactions.unshift(transaction);

      const dtoTransaction = {
                                recipientAccountId: this.dataService.client.accountId,
                                payerAccountId:     this.dataService.client.accountId,
                                description:        formValue.description,
                                amount:             transaction.amount
                             }

      this.dataService.addTransaction(dtoTransaction)
                      .subscribe(next =>  this.dataChangedEvent.emit());
  }


  onSubmitConnectionForm()
  {
    this.connectionOperation(this.connectionOperationForm.value);
    this.connectionOperationForm.reset();
  }

  connectionOperation(formValue: {description:string, connection:Connection})
  {
    const operation: ConnectionOperation =  { ...formValue };

    if(operation.connection.clientId != this.dataService.client.id)
    {
      this.dataService.addClientConnection(operation).subscribe(next => this.newConnectionEvent.emit());
    }
  }
}
