import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Component, OnInit}                  from '@angular/core';
import {Connection}                         from "../Model/Connection";
import {DataService}                        from "../data.service";
import {Client}                             from "../Model/Client";
import {Router}                             from "@angular/router";

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

  newConnection !: Connection;
  connections   !: Array<Connection>;
  nullAmount    !: number;
  operation     !: string;
  client        !: Client;
  amount        !: number;



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
    this.initNotYetConnected()
  }


  //==========================
  //=    business methods    =
  //==========================

  initNotYetConnected() : void
  {
    this.connections =   this.dataService.filterNotYetConnected();
  }

  getConnections() : Array<Connection>
  {
    this.connections.sort
    (
      function(x,y)
      {
        if (x.name.toLowerCase() > y.name.toLowerCase()) {
          return 1;
        }
        if (x.name.toLowerCase() < y.name.toLowerCase())
        {
          return  - 1
        }
        return 0;
      }
    );
    return this.connections;
  }


  navigateToTransfert()
  {
    this.router.navigateByUrl("home/transfert");
  }


  onSubmitConnectionForm() : void
  {
    if(this.newConnection.clientId != 0)
    {
      this.dataService.addClientConnection(this.newConnection);
      this.initNotYetConnected()
    }
  }

  onSubmitBalanceForm() : void
  {
    if(this.amount && this.amount > 0 && (this.operation === "Withdrawal" || this.operation === "Remittance"))
    {
      this.dataService.balanceOperation(this.amount, this.operation);
      this.amount = this.nullAmount;
      this.operation = "";
    }
  }


}
