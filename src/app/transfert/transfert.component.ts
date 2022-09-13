import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Component, OnInit}                  from '@angular/core';
import {Connection}                         from "../Model/Connection";
import {DataService}                        from "../data.service";
import {Client}                             from "../Model/Client";
import {Router}                             from "@angular/router";


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

  client            !: Client;
  connections       !: Array<Connection>
  transactionForm   !: FormGroup;

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
    this.client           = this.dataService.client;
    this.connections      = this.client.getClientConnections();
    // this.connections      = this.dataService.getClientConnections();


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
  }



  //==========================
  //=    business methods    =
  //==========================

  // getConnections() : Array<Connection>
  // {
  //   return this.dataService.getClientConnections();
  // }

  navigateToAccount()
  {
    this.router.navigateByUrl("home/account");
  }

  onSubmitForm()
  {
    this.dataService.addClientTransaction(this.transactionForm.value);
  }
}
