import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators}         from "@angular/forms";
import {Router}                                     from "@angular/router";

import {Connection}                                 from "../Model/Connection";
import {DataService}                                from "../data.service";
import {Transaction}                                from "../Model/Transaction";
import {BalanceOperation}                           from "../Model/BalanceOperation";
import {ConnectionOperation}                        from "../Model/ConnectionOperation";

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

  // reloadAttemps  : number  = 0;
  // newConnection !: Connection;
  // connections   !: Array<Connection>;
  // notYetConnect !: Array<Connection>;
  // nullAmount    !: number;
  // operation     !: string;
  // message       !: string;
  // loading        : boolean = true;
  // client        !: Client;
  // amount        !: number;

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
    private formBuilder : FormBuilder,
    private router      : Router
  )
  {}

  ngOnInit(): void
  {
    // this.loadData();
    // this.connections = this.dataService.connections;
    // this.dataService.initClientConnections()
    // this.initNotYetConnected();

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

  // private loadData()
  // {
  //   this.dataService.getAllConnections().subscribe
  //   (
  //     next  => {
  //                     this.connections = next;
  //                     this.loading = false;
  //                   },
  //
  //     error => {
  //                     if(error.status === 402)
  //                     {
  //                       this.message = "Sorry, we cannnot load connections";
  //                     }
  //                     else
  //                     {
  //                       this.reloadAttemps ++;
  //                       if(this.reloadAttemps <= 10)
  //                       {
  //                         this.message = "Sorry, something went wrong, trying again.... please wait";
  //                         this.loadData();
  //                       }
  //                       else
  //                       {
  //                         this.message = "Sorry, something went wrong, please contact support";
  //                       }
  //                     }
  //                     console.log("this.reloadAttemps = " + this.reloadAttemps)
  //                   }
  //   );
  // }
  //==========================
  //=    business methods    =
  //==========================

  initNotYetConnected() : Array<Connection> | null
  {
    if(this.dataService.client)
    return  this.dataService.filterNotYetConnected();
    return null;
  }

  // getConnections() : Array<Connection>
  // {
  //   this.connections.sort
  //   (
  //     function(x,y)
  //     {
  //       if (x.name.toLowerCase() > y.name.toLowerCase()) {
  //         return 1;
  //       }
  //       if (x.name.toLowerCase() < y.name.toLowerCase())
  //       {
  //         return  - 1
  //       }
  //       return 0;
  //     }
  //   );
  //   return this.connections;
  // }


  navigateToTransfert()
  {
    this.router.navigateByUrl("home/transfert");
  }


  // onSubmitConnectionForm() : void
  // {
  //   if(this.newConnection.clientId != 0)
  //   {
  //     this.dataService.addClientConnection(this.newConnection);
  //     // this.initNotYetConnected()
  //   }
  // }


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






  // onSubmitConnectionForm()
  // {
  //   let connectionDto = {
  //                         clientId : this.dataService.client.id,
  //                         connectionId : this.connectionOperationForm.value.
  //                       }
  //   this.dataService.addClientConnection({ ...this.connectionOperationForm.value })
  //   this.connectionOperationForm.reset();
  // }

  onSubmitConnectionForm()
  {
    console.log("AccountComponent.onSubmitConnectionForm CALLED");
    this.connectionOperation(this.connectionOperationForm.value);
    this.connectionOperationForm.reset();
  }

  connectionOperation(formValue: {description:string, connection:Connection})
  {
    console.log("connectionOperation.onSubmitConnectionForm CALLED");
    const operation: ConnectionOperation =  { ...formValue };
    this.dataService.addClientConnection(operation).subscribe(next => this.newConnectionEvent.emit());
  }
}
