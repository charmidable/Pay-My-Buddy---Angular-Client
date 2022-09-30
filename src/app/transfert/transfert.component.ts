import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Component, EventEmitter, OnInit}    from '@angular/core';
import {Router}                             from "@angular/router";

import {Transaction}                        from "../Model/Transaction";
import {DataService}                        from "../data.service";
import {Connection}                         from "../Model/Connection";
import {Client}                             from "../Model/Client";
import {Subscription}                       from "rxjs";




@Component
(
  {
    selector    : 'app-transaction',
    templateUrl : './transfert.component.html',
    styleUrls   : ['./transfert.component.css']
  }
)
export class TransfertComponent implements OnInit
{
  //==========================
  //=      Attributes        =
  //==========================

  pages              : number = 1;
  client            !: Client;
  message           !: string;
  subscription      !: Subscription;
  loadingClient      : boolean = true;
  transactionForm   !: FormGroup;
  dataChangedEvent   = new EventEmitter();
  clientConnections !: Array<Connection>;


  //==========================
  //=      Constructor       =
  //==========================

  constructor(
                private dataService : DataService,
                private formBuilder : FormBuilder,
                private router      : Router
             )
  {}


  ngOnInit(): void
  {
    this.loadData();

    this.transactionForm  = this.formBuilder.group
    (
{
         connection : [null, Validators.required],
         amount     : [null, Validators.required],
         description: [null, Validators.required]
       },
{
        updateOn : "change"
      }
    );

    this.subscription = this.dataService.addConnectionResultEvent.subscribe
    (
      result => {
                        this.clientConnections = this.getClientConnections();

        for (const connection of this.clientConnections)
        {
          console.log("*** " + connection.name + " ***");
        }
        this.ngOnInit()
      }
    );
  }

  //==========================
  //=   business methods     =
  //==========================

  loadData()
  {
    this.dataService.getClient().subscribe
    (
      next  => {
                      this.client = next;
                      this.clientConnections = this.getClientConnections();
                      this.loadingClient = false;
                    }
    );
  }

  navigateToAccount()
  {
    this.router.navigateByUrl("home/account");
  }


  onSubmitForm()
  {
    this.addClientTransaction(this.transactionForm.value);
    this.transactionForm.reset();
  }


  addClientTransaction(formValue: {amount:number, description:string, connection: Connection})
  {
    const transaction: Transaction = {
                                        ...formValue,
                                        connectionName: formValue.connection.name
                                     };

    if(formValue.amount > this.client.balance)
    {
      alert("You cannot transfert more than your balance account");
      return;
    }

    transaction.amount *= -1;
    this.client.balance = this.client.balance + transaction.amount * 1.005;
    this.client.transactions.unshift(transaction);

    const dtoTransaction = {
                              recipientAccountId: formValue.connection.accountId,
                              payerAccountId:     this.client.accountId,
                              description:        formValue.description,
                              amount:             formValue.amount
                           }

      this.dataService.addTransaction(dtoTransaction)
                      .subscribe(next => this.dataChangedEvent.emit());
  }

  getClientConnections(): Array<Connection>
  {
    return  this.dataService.getClientConnectionsSortedByName();
  }
}
